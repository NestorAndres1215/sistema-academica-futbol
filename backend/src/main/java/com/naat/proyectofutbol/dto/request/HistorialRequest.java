package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialRequest {
    @NotBlank(message = "El usuario no puede estar vacío")
    private String usuario;

    @NotBlank(message = "El detalle no puede estar vacío")
    private String detalle;
}
