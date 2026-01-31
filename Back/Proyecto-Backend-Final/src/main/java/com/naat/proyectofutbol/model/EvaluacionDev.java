package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "evaluaciondev")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
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
    
}
