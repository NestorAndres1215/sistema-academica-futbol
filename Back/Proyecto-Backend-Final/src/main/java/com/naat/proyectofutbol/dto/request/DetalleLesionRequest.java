package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleLesionRequest {

    @NotBlank(message = "La lesión es obligatoria")
    private String lesiones;

    @NotBlank(message = "El tipo de evento es obligatorio")
    private String tipoEvento;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 255, message = "La descripción no debe exceder 255 caracteres")
    private String descripcion;

    @NotBlank(message = "El responsable es obligatorio")
    private String responsable;

    @Size(max = 500, message = "Las observaciones no deben exceder 500 caracteres")
    private String observaciones;


}
