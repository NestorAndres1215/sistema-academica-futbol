package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.JwtRequest;
import com.naat.proyectofutbol.dto.response.JwtResponse;

public interface AuthService {

   JwtResponse generarToken(JwtRequest jwtRequest);

}
