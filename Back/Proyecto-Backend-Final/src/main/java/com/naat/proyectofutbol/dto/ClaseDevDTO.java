package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseDevDTO {
    private String codigo;
    private String titulo;
    private  String descripcion;
    private String dia;
    private String clase;
    private String objetivo;
    private String usuarioCreacion;
    private String usuarioActualizacion;

}
