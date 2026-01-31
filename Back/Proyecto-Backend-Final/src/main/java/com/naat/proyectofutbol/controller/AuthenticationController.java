package com.naat.proyectofutbol.controller;

import java.security.Principal;

import com.naat.proyectofutbol.dto.request.JwtRequest;
import com.naat.proyectofutbol.security.AuthoryConfigService;
import com.naat.proyectofutbol.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import com.naat.proyectofutbol.dto.response.JwtResponse;
import com.naat.proyectofutbol.model.Login;


@RestController
@RequiredArgsConstructor
public class AuthenticationController {


    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final AuthoryConfigService userDetailsService;


    @PostMapping("/generate-token")
    public ResponseEntity<JwtResponse> generarToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return ResponseEntity.ok(authService.generarToken(jwtRequest));
    }

    @GetMapping("/actual-usuario")
    public Login obtenerUsuarioActual(Principal principal) {
        return (Login) this.userDetailsService.loadUserByUsername(principal.getName());
    }

}
