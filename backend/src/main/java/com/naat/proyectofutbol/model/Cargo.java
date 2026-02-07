package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "cargo")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Cargo {
    @Id
    @Column(name = "cg_codigo")
    private String codigo; 
    
    @Column(name = "cg_nombre")
    private String nombre; 

    @Column(name = "cg_estado")
    private Boolean estado;

    @Column(name = "cg_fecha_creacion")
    private LocalDate fechaCreacion;

    @Column(name = "cg_hora_creacion")
    private LocalTime horaCreacion;

    @Column(name = "cg_fecha_actualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "cg_hora_actualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "cg_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "cg_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "cg_descripcion")
    private String descripcion;


}