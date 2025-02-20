package org.example.bookingphoto.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.bookingphoto.dto.RatingCreateDTO;
import org.example.bookingphoto.dto.RatingShowDTO;
import org.example.bookingphoto.model.Rating;
import org.example.bookingphoto.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
@CrossOrigin("*")
public class RatingController {
    @Autowired
    private IRatingService ratingService;

    @GetMapping("/show")
    public ResponseEntity<List<RatingShowDTO>> showRatings () {
        List<RatingShowDTO> ratingShowDTOList = ratingService.showRatings();
        return new ResponseEntity<>(ratingShowDTOList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRating(@RequestBody RatingCreateDTO ratingCreateDTO, HttpServletRequest request) {
        String ipUser = getClientIp(request);
        ratingService.create(ratingCreateDTO, ipUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    private String getClientIp(HttpServletRequest request) {
        // Kiểm tra header "X-Forwarded-For" nếu ứng dụng chạy sau proxy hay load balancer
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty()) {
            return request.getRemoteAddr();
        }
        // Nếu có nhiều IP, lấy IP đầu tiên (IP thực của client)
        return xfHeader.split(",")[0].trim();
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Rating> delete (@PathVariable("id") Integer id) {
        Rating rating = ratingService.delete(id);
        return new ResponseEntity<>(rating, HttpStatus.OK);
    }
}
