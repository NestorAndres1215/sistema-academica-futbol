package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionDevRequest {

    private String codigo;

    @NotBlank(message = "La evaluación es obligatoria")
    private String evaluacion;

    @NotNull(message = "El número de pases es obligatorio")
    @Min(value = 0, message = "Los pases no pueden ser negativos")
    @Max(value = 100, message = "Los pases no pueden superar 100")
    private Integer pases;

    @NotNull(message = "Los tiros son obligatorios")
    @Min(value = 0)
    @Max(value = 100)
    private Integer tiros;

    @NotNull(message = "El posicionamiento es obligatorio")
    @Min(value = 0)
    @Max(value = 100)
    private Integer posicionamiento;

    @NotNull(message = "La visión de juego es obligatoria")
    @Min(value = 0)
    @Max(value = 100)
    private Integer visionJuego;

    @NotNull(message = "La resistencia es obligatoria")
    @Min(value = 0)
    @Max(value = 100)
    private Integer resistencia;

    @NotNull(message = "La velocidad es obligatoria")
    @Min(value = 0)
    @Max(value = 100)
    private Integer velocidad;

    @NotNull(message = "La fuerza es obligatoria")
    @Min(value = 0)
    @Max(value = 100)
    private Integer fuerza;

    @NotNull(message = "La concentración es obligatoria")
    @Min(value = 0)
    @Max(value = 100)
    private Integer concentracion;

    @NotNull(message = "La toma de decisiones es obligatoria")
    @Min(value = 0)
    @Max(value = 100)
    private Integer tomaDecisiones;

    @DecimalMin(value = "0.0", message = "La nota final no puede ser negativa")
    @DecimalMax(value = "100.0", message = "La nota final no puede superar 100")
    private Double notaFinal;

    @Size(max = 500, message = "Los comentarios no deben exceder 500 caracteres")
    private String comentarios;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;

    private String conteo;

}

