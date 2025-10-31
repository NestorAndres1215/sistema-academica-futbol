package com.naat.proyectofutbol.constrainst;

public enum UsuarioError {

    USUARIO_NO_AUTORIZADO("Usuario no autorizado"),
    USUARIO_NO_ENCONTRADO("Usuario no encontrado "),
    ERROR_USUARIO("Credenciales Invalidas");


    private final String mensaje;

    UsuarioError(String mensaje)
    {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}
