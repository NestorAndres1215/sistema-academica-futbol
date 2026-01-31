package com.naat.proyectofutbol.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseRequest {

    private String codigo;
    @NotBlank(message = "El nombre de la clase es obligatorio")
    private String nombre;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;

    @NotBlank(message = "El horario es obligatorio")
    private String horario;

    @NotBlank(message = "El día es obligatorio")
    private String dia;

    @NotBlank(message = "El usuario de creación es obligatorio")
    private String usuarioCreacion;

    private String usuarioActualizacion;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate inicio;

    @NotNull(message = "La fecha de fin es obligatoria")
    private LocalDate fin;

    @Size(max = 255, message = "La descripción no debe exceder 255 caracteres")
    private String descripcion;


}
