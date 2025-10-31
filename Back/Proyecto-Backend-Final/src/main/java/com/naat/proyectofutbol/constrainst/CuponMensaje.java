package com.naat.proyectofutbol.constrainst;

public enum CuponMensaje {
    REGISTRO_CUPON("SE REGISTRO CUPON CORRECTAMENTE"),
    CUPON_EXISTENTE("CODIGO DE CUPO YA EXISTE"),
    FECHA_MAYOR("LA FECHA DE INCIO NO PUEDE SER MAYOR  QUE LA FECHA FINAL"),
    FECHA_MENOR("LA FECHA DE FIN NO 'PUEDE SER MENOR Q LA FECHA INICIAL"),
    ACTUALIZACION_CUPON("SE ACTUALIZO CORRECTAMENTE EL CUPON"),
    ERROR_ACTUALIZACION("HUBO UN ERROR AL ACTUALIZAR CUPON"),
    ERROR_REGISTRO("HUBO UN ERROR AL REGISTRAR CUPON ");

    private final String mensaje;

    CuponMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getMensaje() {
        return mensaje;
    }
}
