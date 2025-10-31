package com.naat.proyectofutbol.dto;

public class DetalleLesionDTO {

    private String lesiones;

    private String tipoEvento;
    private String descripcion;
    private String responsable;
    private String observaciones;


    public String getLesiones() {
        return lesiones;
    }

    public void setLesiones(String lesiones) {
        this.lesiones = lesiones;
    }


    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    // Método toString()
    @Override
    public String toString() {
        return "DetalleLesionDTO{" +
                ", lesiones='" + lesiones + '\'' +

                ", tipoEvento='" + tipoEvento + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", responsable='" + responsable + '\'' +
                ", observaciones='" + observaciones + '\'' +
                '}';
    }
}
