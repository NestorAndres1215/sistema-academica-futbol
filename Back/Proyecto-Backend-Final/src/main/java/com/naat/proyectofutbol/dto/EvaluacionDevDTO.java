package com.naat.proyectofutbol.dto;


public class EvaluacionDevDTO {
    private String codigo;
    private String evaluacion;
    private Integer pases;
    private Integer tiros;
    private Integer posicionamiento;
    private Integer visionJuego;
    private Integer resistencia;
    private Integer velocidad;
    private Integer fuerza;
    private Integer concentracion;
    private Integer tomaDecisiones;
    private Double notaFinal;
    private String comentarios;
private String equipo;
    private String conteo;

    public String getConteo() {
        return conteo;
    }

    public void setConteo(String conteo) {
        this.conteo = conteo;
    }

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    // Getters y Setters
    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getEvaluacion() {
        return evaluacion;
    }

    public void setEvaluacion(String evaluacion) {
        this.evaluacion = evaluacion;
    }

    public Integer getPases() {
        return pases;
    }

    public void setPases(Integer pases) {
        this.pases = pases;
    }

    public Integer getTiros() {
        return tiros;
    }

    public void setTiros(Integer tiros) {
        this.tiros = tiros;
    }

    public Integer getPosicionamiento() {
        return posicionamiento;
    }

    public void setPosicionamiento(Integer posicionamiento) {
        this.posicionamiento = posicionamiento;
    }

    public Integer getVisionJuego() {
        return visionJuego;
    }

    public void setVisionJuego(Integer visionJuego) {
        this.visionJuego = visionJuego;
    }

    public Integer getResistencia() {
        return resistencia;
    }

    public void setResistencia(Integer resistencia) {
        this.resistencia = resistencia;
    }

    public Integer getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(Integer velocidad) {
        this.velocidad = velocidad;
    }

    public Integer getFuerza() {
        return fuerza;
    }

    public void setFuerza(Integer fuerza) {
        this.fuerza = fuerza;
    }

    public Integer getConcentracion() {
        return concentracion;
    }

    public void setConcentracion(Integer concentracion) {
        this.concentracion = concentracion;
    }

    public Integer getTomaDecisiones() {
        return tomaDecisiones;
    }

    public void setTomaDecisiones(Integer tomaDecisiones) {
        this.tomaDecisiones = tomaDecisiones;
    }

    public Double getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Double notaFinal) {
        this.notaFinal = notaFinal;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }
}

