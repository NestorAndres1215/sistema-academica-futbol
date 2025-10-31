package com.naat.proyectofutbol.response;

import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.modelo.Login;

public class UsuarioLoginAdminResponse {
    private Usuario usuario;
    private Login login;
    private Admin admin;

    public UsuarioLoginAdminResponse(Usuario usuario, Login login, Admin admin) {
        this.usuario = usuario;
        this.login = login;
        this.admin = admin;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }
}