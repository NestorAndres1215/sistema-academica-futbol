package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionRequest{


    private String codigo;

    @NotBlank(message = "El profesor es obligatorio")
    private String profesor;

    @NotBlank(message = "El estudiante es obligatorio")
    private String estudiante;

}
