package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Login;
import com.naat.proyectofutbol.model.Usuario;


public interface LoginService {
    Login registrar(String codigo, String username, String contrasena, String Roles);

    Login actualizar(String codigo, String username, String contrasena, String roles);

    Login activarUsuario(String codigo);

    Login desactivarUsuario(String codigo);
}
