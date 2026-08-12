package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneralDevRequest {

    private  String codigo;

    private String clave;

    @NotBlank(message = "La primera descripción es obligatoria")
    private String descripcionPrimero;

    private String descripcionSegundo;

    private String usuarioCreacion;

    private String usuarioActualizacion;

    private String general;
}
