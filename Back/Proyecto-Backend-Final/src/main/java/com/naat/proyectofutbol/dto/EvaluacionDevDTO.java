package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionDevDTO {
    private String codigo;
    private String evaluacion;
    private Integer pases;
    private Integer tiros;
    private Integer posicionamiento;
    private Integer visionJuego;
    private Integer resistencia;
    private Integer velocidad;
    private Integer fuerza;
    private Integer concentracion;
    private Integer tomaDecisiones;
    private Double notaFinal;
    private String comentarios;
    private String equipo;
    private String conteo;

}

