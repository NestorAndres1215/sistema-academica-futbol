package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionEstudiante {
    private String codigo;
    private int numeroCamiseta;
    private String posicion;
    private boolean esCapitan;
    private String comentarios;
    private boolean estado;
    private LocalDate fechaCreacion;
    private LocalTime horaCreacion;
    private LocalDate fechaActualizacion;
    private LocalTime horaActualizacion;
    private String usuarioRegistro;
    private String usuarioActualizacion;
    private String profesor;
    private String estudiante;
    private String equipo;
}