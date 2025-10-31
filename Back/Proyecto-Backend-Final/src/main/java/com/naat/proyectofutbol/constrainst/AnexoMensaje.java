package com.naat.proyectofutbol.constrainst;

public enum AnexoMensaje {
    TELEFONO_EXISTENTE("TELEFONO YA EXISTE"),
    NOMBRE_COMPLETO("NOMBRE YA EXISTE"),
    NUMERO_DOCUMENTO_EXISTE("NUMERO DE DOCUMENTO YA EXISTE"),
    CORREO_EXISTENTE("CORREO YA EXISTE "),
    TELEFONO_INVALIDO("TELEFONO DEBE CONTENER 9 DIGITOS"),
    CODIGO_TIPO_EXISTENTE("CODIGO DE ANEXO Y TIPO DE ANEXO  YA EXISTE")
    ;
    private final String mensaje;

    AnexoMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}
