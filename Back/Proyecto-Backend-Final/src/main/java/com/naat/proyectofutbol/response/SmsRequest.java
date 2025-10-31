package com.naat.proyectofutbol.response;

public class SmsRequest {
    private String to;
    private String message;

    // Getters y Setters
    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
