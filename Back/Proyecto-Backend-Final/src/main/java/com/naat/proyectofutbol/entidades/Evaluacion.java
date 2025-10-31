package com.naat.proyectofutbol.entidades;

import org.apache.poi.hpsf.Decimal;

import javax.persistence.*;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {
    @Id
    @Column(name = "ev_codigo")
    private String codigo;

    @Column(name = "ev_nota_final")
    private Integer notaFinal;

    @Column(name = "ev_comentarios")
    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "ev_estudiante", referencedColumnName = "es_codigo")
    private Estudiante estudiante;

    public Evaluacion() {
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Integer notaFinal) {
        this.notaFinal = notaFinal;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(String codigo) {
        if (codigo != null) {
            Estudiante estudiante = new Estudiante();
            estudiante.setCodigo(codigo);
            this.estudiante = estudiante;

        }
    }
}
