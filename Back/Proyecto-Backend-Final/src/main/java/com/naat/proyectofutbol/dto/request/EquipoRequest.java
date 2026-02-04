package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipoRequest {

    private String codigo;
    @NotBlank(message = "El nombre del equipo es obligatorio")
    private String nombre;

    @NotBlank(message = "La categoría es obligatoria")
    private String categoria;

    @NotBlank(message = "La sede es obligatoria")
    private String sede;

    @NotBlank(message = "El género es obligatorio")
    private String genero;

    @NotBlank(message = "El usuario de registro es obligatorio")
    private String usuarioRegistro;

    private String usuarioActualizacion;

    private String equipoDev;


}
