package org.example.bookingphoto.service;

import com.nimbusds.jose.JOSEException;
import org.example.bookingphoto.authentication.AuthenticationRequest;
import org.example.bookingphoto.authentication.AuthenticationResponse;
import org.example.bookingphoto.authentication.IntrospectRequest;
import org.example.bookingphoto.authentication.IntrospectResponse;
import org.example.bookingphoto.model.User;

import java.text.ParseException;

public interface IAuthService {
    User findByUsername (String username);
    AuthenticationResponse authenticate (AuthenticationRequest authenticationRequest);
    IntrospectResponse introspect(IntrospectRequest introspectRequest) throws ParseException, JOSEException;

}
