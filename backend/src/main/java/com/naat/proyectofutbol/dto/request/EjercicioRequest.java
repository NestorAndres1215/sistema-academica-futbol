package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class EjercicioRequest {

    private String codigo;

    @NotBlank(message = "El nombre del ejercicio es obligatorio")
    private String nombre;

    private String descripcion;

    @NotBlank(message = "El tipo de ejercicio es obligatorio")
    private String tipo;

    @NotBlank(message = "El usuario de creación es obligatorio")
    private String usuarioCreacion;

    private String usuarioActualizacion;

    @NotBlank(message = "La intensidad es obligatoria")
    private String intensidad;

    @NotBlank(message = "La clase es obligatoria")
    private String clase;

    @NotBlank(message = "La duración es obligatoria")
    private String duracion;


}
