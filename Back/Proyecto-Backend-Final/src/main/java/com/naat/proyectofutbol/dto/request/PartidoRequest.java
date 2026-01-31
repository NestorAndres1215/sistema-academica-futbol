package com.naat.proyectofutbol.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartidoRequest{

    private String codigo;
    @NotBlank(message = "El marcador local es obligatorio")
    private String marcadorLocal;

    @NotBlank(message = "El equipo rival es obligatorio")
    private String equipoRival;

    @NotNull(message = "La fecha del partido es obligatoria")
    @PastOrPresent(message = "La fecha del partido no puede ser futura")
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

    @NotBlank(message = "El marcador de visita es obligatorio")
    private String marcadorVisita;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;


}
