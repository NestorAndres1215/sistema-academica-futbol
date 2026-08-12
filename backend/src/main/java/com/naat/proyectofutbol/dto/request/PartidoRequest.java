package com.naat.proyectofutbol.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartidoRequest{

    private String codigo;

    private String marcadorLocal;

    @NotBlank(message = "El equipo rival es obligatorio")
    private String equipoRival;

    @NotNull(message = "La fecha del partido es obligatoria")
    private LocalDate fecha;

    @NotNull(message = "La hora del partido es obligatoria")
    private LocalTime hora;

    @NotBlank(message = "El lugar del partido es obligatorio")
    private String lugar;

    @NotBlank(message = "El tipo de partido es obligatorio")
    private String tipoPartido;

    @Size(max = 500, message = "Los comentarios no deben exceder 500 caracteres")
    private String comentarios;

    @NotBlank(message = "El usuario de creación es obligatorio")
    private String usuarioCreacion;

    private String usuarioActualizacion;

    private String derrota;

    private String victoria;


    private String marcadorVisita;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;


}
