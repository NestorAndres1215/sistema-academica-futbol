package com.naat.proyectofutbol.dto;

import com.naat.proyectofutbol.entidades.Estudiante;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

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

    public String getEquipo() {
        return equipo;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getTipoLesion() {
        return tipoLesion;
    }

    public LocalDate getFechaLesion() {
        return fechaLesion;
    }

    public String getGravedad() {
        return gravedad;
    }

    public Integer getTiempoRecuperacion() {
        return tiempoRecuperacion;
    }

    public String getComentarios() {
        return comentarios;
    }

    public String getUsuarioRegistro() {
        return usuarioRegistro;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public LocalDate getFechaRecuperacion() {
        return fechaRecuperacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getEstudiante() {
        return estudiante;
    }
}
