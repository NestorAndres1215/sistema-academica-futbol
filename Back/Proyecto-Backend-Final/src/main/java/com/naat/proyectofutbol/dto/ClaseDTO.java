package com.naat.proyectofutbol.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseDTO {

    private String codigo;
    private String nombre;
    private String equipo;
    private String horario;
    private String dia;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private LocalDate inicio;
    private LocalDate fin;
    private String descripcion ;


}
