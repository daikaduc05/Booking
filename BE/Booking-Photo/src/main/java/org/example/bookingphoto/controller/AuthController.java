package org.example.bookingphoto.controller;

import com.nimbusds.jose.JOSEException;
import org.example.bookingphoto.authentication.AuthenticationRequest;
import org.example.bookingphoto.authentication.AuthenticationResponse;
import org.example.bookingphoto.authentication.IntrospectRequest;
import org.example.bookingphoto.authentication.IntrospectResponse;
import org.example.bookingphoto.service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
//
@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private IAuthService authService;

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate (@RequestBody AuthenticationRequest authenticationRequest) {
        return authService.authenticate(authenticationRequest);
    }
    @PostMapping("/introspect")
    public IntrospectResponse authenticate (@RequestBody IntrospectRequest introspectRequest) throws ParseException, JOSEException {
        return authService.introspect(introspectRequest);
    }
}
