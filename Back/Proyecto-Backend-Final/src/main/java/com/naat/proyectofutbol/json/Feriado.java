package com.naat.proyectofutbol.json;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Feriado {
    @JsonProperty("codigo")
    private String codigo;

    @JsonProperty("fecha")
    private String fecha;

    @JsonProperty("nombre")
    private String nombre;

    // Getters y setters
    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
