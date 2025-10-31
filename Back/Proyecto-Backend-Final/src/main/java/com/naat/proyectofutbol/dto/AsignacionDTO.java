package com.naat.proyectofutbol.dto;

import java.util.List;

public class AsignacionDTO {
    private List<AsignacionDTO> asignaciones;
    private String codigo;
    private String profesor;
    private String estudiante;

    @Override
    public String toString() {
        return "{" +
                "codigo='" + codigo + '\'' +
                ", profesor='" + profesor + '\'' +
                ", estudiante='" + estudiante + '\'' +
                '}';
    }

    public List<AsignacionDTO> getAsignaciones() {
        return asignaciones;
    }

    public void setAsignaciones(List<AsignacionDTO> asignaciones) {
        this.asignaciones = asignaciones;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
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
}
