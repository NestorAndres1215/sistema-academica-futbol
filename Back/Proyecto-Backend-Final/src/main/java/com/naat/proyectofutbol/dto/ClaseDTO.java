package com.naat.proyectofutbol.dto;


import java.time.LocalDate;


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

    @Override
    public String toString() {
        return "ClaseDTO{" +
                "codigo='" + codigo + '\'' +
                ", nombre='" + nombre + '\'' +
                ", equipo='" + equipo + '\'' +
                ", horario='" + horario + '\'' +
                ", dia='" + dia + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", inicio=" + inicio +
                ", fin=" + fin +
                ", descripcion='" + descripcion + '\'' +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public LocalDate getInicio() {
        return inicio;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public LocalDate getFin() {
        return fin;
    }

    public void setFin(LocalDate fin) {
        this.fin = fin;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
