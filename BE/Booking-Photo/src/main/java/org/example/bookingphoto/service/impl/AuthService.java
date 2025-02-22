package org.example.bookingphoto.service.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.example.bookingphoto.authentication.AuthenticationRequest;
import org.example.bookingphoto.authentication.AuthenticationResponse;
import org.example.bookingphoto.authentication.IntrospectRequest;
import org.example.bookingphoto.authentication.IntrospectResponse;
import org.example.bookingphoto.exception.ApiException;
import org.example.bookingphoto.exception.ErrorCode;
import org.example.bookingphoto.model.User;
import org.example.bookingphoto.repository.IUserRepository;
import org.example.bookingphoto.security.UserDetailService;
import org.example.bookingphoto.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Service
public class AuthService implements IAuthService {
    private String SIGNER_KEY = "xJTUVPssT2uOmsKKn7dmwi/ZuUg1b8ECkPuoSBYziE4ldzMBtSNkaftz1U372J/e";
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private UserDetailService userDetailService;
    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        // Kiểm tra nếu database không có người dùng nào
        if (userRepository.count() == 0) {
            throw new ApiException(ErrorCode.UNAUTHENTICATION); // Bạn cần định nghĩa ErrorCode.DATABASE_EMPTY
        }
        User user = userRepository.findByUsername(authenticationRequest.getUsername());
        UserDetails userDetails = userDetailService.loadUserByUsername(authenticationRequest.getUsername());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (user == null || !passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            throw new ApiException(ErrorCode.UNAUTHENTICATION);
        }
        return AuthenticationResponse.builder()
                .username(user.getUsername())
                .roleList(userDetails.getAuthorities())
                .token(generateToken(user))
                .build();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest introspectRequest) throws ParseException, JOSEException {
        return IntrospectResponse.builder()
                .invalid(verifyJWT(introspectRequest.getToken()))
                .build();
    }

    private String generateToken(User user) {
        // Tạo phần header cho JWT, sử dụng thuật toán ký là HS512 (HMAC SHA-512)
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        // Tạo phần claims (payload) cho JWT, chứa các thông tin về người dùng
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername()) // Đặt chủ thể (subject) của JWT là tên đăng nhập của người dùng
                .issuer("vhh.com") // Đặt người phát hành JWT là "sqc.com"
                .issueTime(new Date()) // Đặt thời gian phát hành JWT là thời điểm hiện tại
                .expirationTime(new Date( // Đặt thời gian hết hạn cho JWT là 1 giờ kể từ lúc phát hành
                        Instant.now().plus(100000, ChronoUnit.HOURS).toEpochMilli()
                ))
                // Thêm một custom claim (thông tin tùy chỉnh) vào JWT, chứa thông tin về đối tượng Student
                .claim("scope", getScope(user))
                .build(); // Xây dựng đối tượng JWTClaimsSet

        // Tạo payload từ claims đã tạo, chuyển đối tượng claims thành định dạng JSON
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        // Tạo JWSObject từ header và payload, kết hợp chúng lại thành đối tượng JWS
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            // Ký JWT bằng thuật toán HMAC SHA-512, sử dụng khóa bí mật (SIGNER_KEY)
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));

            // Chuyển đối tượng JWS thành chuỗi JWT hoàn chỉnh (header.payload.signature) và trả về
            return jwsObject.serialize();
        } catch (JOSEException e) {
            // Nếu có lỗi xảy ra trong quá trình ký JWT, ném ra ngoại lệ RuntimeException
            throw new RuntimeException(e);
        }
    }

    private Object getScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        user.getRoleSet().forEach(role -> stringJoiner.add(role.getName()));
        return stringJoiner.toString();
    }

    public boolean verifyJWT(String token)
            throws JOSEException, ParseException {
        // Tạo một đối tượng JWSVerifier với thuật toán HMAC SHA-512 để xác minh chữ ký của JWT
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        // Phân tích cú pháp (parse) chuỗi JWT thành đối tượng SignedJWT
        SignedJWT signedJWT = SignedJWT.parse(token);

        // Lấy thời gian hết hạn của JWT từ phần claims (payload)
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        // Xác minh chữ ký của JWT, kiểm tra xem chữ ký có hợp lệ không
        var verified = signedJWT.verify(verifier);

        // Trả về kết quả xác thực:

        return verified && expiryTime.after(new Date());
    }
}
