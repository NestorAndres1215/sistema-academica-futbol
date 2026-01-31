package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.dto.request.JwtRequest;
import com.naat.proyectofutbol.dto.response.JwtResponse;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Usuario;
import com.naat.proyectofutbol.security.JwtUtils;
import com.naat.proyectofutbol.service.AuthService;
import com.naat.proyectofutbol.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;


    @Override
    public JwtResponse generarToken(JwtRequest jwtRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = jwtUtils.generateToken(userDetails);

        return new JwtResponse(token);
    }
}
