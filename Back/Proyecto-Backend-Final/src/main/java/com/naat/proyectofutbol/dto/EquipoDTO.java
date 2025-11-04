package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipoDTO {
    private String codigo;
    private String nombre;
    private String categoria;
    private String sede;
    private String genero;
    private boolean estado;
    private String usuarioRegistro;
    private String usuarioActualizacion;
    private String equipoDev;


}
