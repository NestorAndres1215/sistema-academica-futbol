package com.naat.proyectofutbol.constrainst;

public enum Numeracion {

    REGISTRO_NUMERACION("SE REGISTRO NUMERACION CORRECTAMENTE"),

    ERROR_REGISTRO("HUBO UN ERROR AL REGISTRAR NUMERACION ");




    private final String mensaje;

    Numeracion(String mensaje)
    {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}

