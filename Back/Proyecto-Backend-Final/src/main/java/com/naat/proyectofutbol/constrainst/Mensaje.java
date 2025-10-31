package com.naat.proyectofutbol.constrainst;

public enum Mensaje {

    ERROR_INTERNO("Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde"),
    REGISTRO("SE REGISTRO CORRECTAMENTE"),
    RUC_DIGITOS("Numero de telefono debe tener solo 11 digitos"),
    TOKEN_INVALIDO("Token Invalido"),
    CORREO_ENVIADO ("CORREO ENVIADO CORRECTAMENTE ")
    ;

    private final String mensaje;

    Mensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}
