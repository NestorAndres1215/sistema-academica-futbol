package com.naat.proyectofutbol.response;

import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.modelo.Login;

public class AdminResponse {
    private Usuario usuario;
    private Login login;
    private Admin admin;

    public AdminResponse(Usuario usuario, Login login, Admin admin) {
        this.usuario = usuario;
        this.login = login;
        this.admin = admin;
    }
}
