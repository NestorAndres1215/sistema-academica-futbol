package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "clase")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Clase {

    @Id
    @Column(name = "cl_codigo")
    private String codigo;

    @Column(name = "cl_nombre")
    private String nombre;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cl_equipo", referencedColumnName = "eq_codigo")
    private Equipo equipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cl_horario", referencedColumnName = "hor_codigo")
    private Horario horario;

    @Column(name = "cl_estado")
    private Boolean estado;

    @Column(name = "cl_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "cl_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "cl_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "cl_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "cl_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "cl_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "cl_inicio")
    private LocalDate inicio;
    
    @Column(name = "cl_dia")
    private String dia;

    @Column(name = "cl_fin")
    private LocalDate fin;

    @Column(name = "cl_descripcion")
    private String descripcion;




}
