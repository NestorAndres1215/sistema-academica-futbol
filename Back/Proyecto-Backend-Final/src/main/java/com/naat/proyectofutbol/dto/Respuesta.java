package com.naat.proyectofutbol.dto;

public class Respuesta<T> {
    private String mensaje;
    private T data; // Aquí puedes enviar datos adicionales (como el Admin)

    public Respuesta(String mensaje, T data) {
        this.mensaje = mensaje;
        this.data = data;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
