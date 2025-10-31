package com.naat.proyectofutbol.entidades;

import javax.persistence.*;

@Entity
@Table(name = "evaluaciondev")
public class EvaluacionDev {
    @Id
    @Column(name = "de_codigo", length = 6)
    private String codigo;

    @ManyToOne
    @JoinColumn(name = "de_evaluacion", referencedColumnName = "ev_codigo")
    private Evaluacion evaluacion;

    @Column(name = "de_pases")
    private Integer pases;

    @Column(name = "de_tiros")
    private Integer tiros;

    @Column(name = "de_posicionamiento")
    private Integer posicionamiento;

    @Column(name = "de_vision_juego")
    private Integer visionJuego;

    @Column(name = "de_resistencia")
    private Integer resistencia;

    @Column(name = "de_velocidad")
    private Integer velocidad;

    @Column(name = "de_fuerza")
    private Integer fuerza;

    @Column(name = "de_concentracion")
    private Integer concentracion;

    @Column(name = "de_toma_decisiones")
    private Integer tomaDecisiones;

    @Column(name = "de_nota_final")
    private Double notaFinal;

    @Column(name = "de_comentarios")
    private String comentarios;

    @Column(name = "de_conteo")
    private String conteo;
    @Column(name = "de_estado")
    private boolean estado;
    @Column(name = "de_equipo")
    private String equipo;
    public EvaluacionDev() {
    }

    @Override
    public String toString() {
        return "EvaluacionDev{" +
                "codigo='" + codigo + '\'' +
                ", evaluacion=" + evaluacion +
                ", pases=" + pases +
                ", tiros=" + tiros +
                ", posicionamiento=" + posicionamiento +
                ", visionJuego=" + visionJuego +
                ", resistencia=" + resistencia +
                ", velocidad=" + velocidad +
                ", fuerza=" + fuerza +
                ", concentracion=" + concentracion +
                ", tomaDecisiones=" + tomaDecisiones +
                ", notaFinal=" + notaFinal +
                ", comentarios='" + comentarios + '\'' +
                ", conteo='" + conteo + '\'' +
                ", estado=" + estado +
                '}';
    }

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }

    public String getConteo() {
        return conteo;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public void setConteo(String conteo) {
        this.conteo = conteo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }


    public Evaluacion getEvaluacion() {
        return evaluacion;
    }

    public void setEvaluacion(Evaluacion evaluacion) {
        this.evaluacion = evaluacion;
    }

    public void setEvaluacion(String codigo) {
        if (codigo != null) {
            Evaluacion evaluacion = new Evaluacion();
            evaluacion.setCodigo(codigo);
            this.evaluacion = evaluacion;

        }
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
