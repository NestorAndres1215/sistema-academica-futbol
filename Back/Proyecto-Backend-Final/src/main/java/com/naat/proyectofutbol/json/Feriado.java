package com.naat.proyectofutbol.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Feriado {

    @JsonProperty("codigo")
    private String codigo;

    @JsonProperty("fecha")
    private String fecha;

    @JsonProperty("nombre")
    private String nombre;

}
