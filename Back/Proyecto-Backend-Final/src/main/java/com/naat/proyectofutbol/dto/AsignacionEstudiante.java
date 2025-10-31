package com.naat.proyectofutbol.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AsignacionEstudiante {
    private String codigo;
    private int numeroCamiseta;
    private String posicion;
    private boolean esCapitan;
    private String comentarios;
    private boolean estado;
    private LocalDate fechaCreacion;
    private LocalTime horaCreacion;
    private LocalDate fechaActualizacion;
    private LocalTime horaActualizacion;
    private String usuarioRegistro;
    private String usuarioActualizacion;
    private String profesor;
    private String estudiante;
    private String equipo;

    public String getEquipo() {
        return equipo;
    }

    public boolean isEstado() {
        return estado;
    }

    public String getProfesor() {
        return profesor;
    }

    public void setProfesor(String profesor) {
        this.profesor = profesor;
    }

    public String getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(String estudiante) {
        this.estudiante = estudiante;
    }

    // Getters y Setters
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public int getNumeroCamiseta() { return numeroCamiseta; }
    public void setNumeroCamiseta(int numeroCamiseta) { this.numeroCamiseta = numeroCamiseta; }

    public String getPosicion() { return posicion; }
    public void setPosicion(String posicion) { this.posicion = posicion; }

    public boolean isEsCapitan() { return esCapitan; }
    public void setEsCapitan(boolean esCapitan) { this.esCapitan = esCapitan; }

    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }

    public boolean getEstado() { return estado; }
    public void setEstado(boolean estado) { this.estado = estado; }

    public LocalDate getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDate fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalTime getHoraCreacion() { return horaCreacion; }
    public void setHoraCreacion(LocalTime horaCreacion) { this.horaCreacion = horaCreacion; }

    public LocalDate getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(LocalDate fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }

    public LocalTime getHoraActualizacion() { return horaActualizacion; }
    public void setHoraActualizacion(LocalTime horaActualizacion) { this.horaActualizacion = horaActualizacion; }

    public String getUsuarioRegistro() { return usuarioRegistro; }
    public void setUsuarioRegistro(String usuarioRegistro) { this.usuarioRegistro = usuarioRegistro; }

    public String getUsuarioActualizacion() { return usuarioActualizacion; }
    public void setUsuarioActualizacion(String usuarioActualizacion) { this.usuarioActualizacion = usuarioActualizacion; }


    @Override
    public String toString() {
        return "AsignacionEstudiante{" +
                "codigo='" + codigo + '\'' +
                ", numeroCamiseta=" + numeroCamiseta +
                ", posicion='" + posicion + '\'' +
                ", esCapitan=" + esCapitan +
                ", comentarios='" + comentarios + '\'' +
                ", estado='" + estado + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                '}';
    }
}
