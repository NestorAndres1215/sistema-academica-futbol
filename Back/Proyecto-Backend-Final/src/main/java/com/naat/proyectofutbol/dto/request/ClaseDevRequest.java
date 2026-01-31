package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseDevRequest {

    private String codigo;

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @Size(max = 255, message = "La descripción no debe exceder 255 caracteres")
    private String descripcion;

    @NotBlank(message = "El día es obligatorio")
    private String dia;

    @NotBlank(message = "La clase es obligatoria")
    private String clase;

    @NotBlank(message = "El objetivo es obligatorio")
    private String objetivo;

    @NotBlank(message = "El usuario de creación es obligatorio")
    private String usuarioCreacion;

    private String usuarioActualizacion;

}
