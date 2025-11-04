package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class EjercicioDTO {

    private String codigo;
    private String nombre;
    private String descripcion;
    private String tipo;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private String intensidad;
    private String clase;
    private  String duracion;


}
