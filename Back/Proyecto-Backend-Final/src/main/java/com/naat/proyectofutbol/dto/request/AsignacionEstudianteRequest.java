package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionEstudianteRequest {
    private String codigo;

    @NotNull(message = "El número de camiseta es obligatorio")
    @Min(value = 1, message = "El número de camiseta debe ser mayor a 0")
    @Max(value = 99, message = "El número de camiseta no puede ser mayor a 99")
    private Integer numeroCamiseta;


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

    @NotBlank(message = "El profesor es obligatorio")
    private String profesor;

    @NotBlank(message = "El estudiante es obligatorio")
    private String estudiante;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;
}