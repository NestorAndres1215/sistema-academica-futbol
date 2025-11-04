package com.naat.proyectofutbol.dto;

import com.naat.proyectofutbol.entidades.Estudiante;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LesionesDTO {

    private String codigo;
    private String tipoLesion;
    private LocalDate fechaLesion;
    private String gravedad;
    private Integer tiempoRecuperacion;
    private String comentarios;
    private String usuarioRegistro;
    private String usuarioActualizacion;
    private LocalDate fechaRecuperacion;
    private String descripcion;
    private String estudiante;
    private String equipo;

}
