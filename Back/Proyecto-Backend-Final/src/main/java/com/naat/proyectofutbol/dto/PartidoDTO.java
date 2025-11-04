package com.naat.proyectofutbol.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartidoDTO {

    private String codigo;
    private String marcadorLocal;
    private String equipoRival;
    private LocalDate fecha;
    private LocalTime hora;
    private String lugar;
    private String tipoPartido;
    private String comentarios;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private String derrota;
    private String victoria;
    private String marcadorVisita;
    private String equipo;


}
