package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "ejercicios")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Ejercicio {

    @Id
    @Column(name = "ej_codigo")
    private String codigo;

    @Column(name = "ej_nombre")
    private String nombre;

    @Column(name = "ej_duracion")
    private String duracion;

    @Column(name = "ej_descripcion")
    private String descripcion;

    @Column(name = "ej_tipo")
    private String tipo;

    @Column(name = "ej_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "ej_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "ej_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "ej_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "ej_usuarioregistro")
    private String usuarioRegistro;

    @Column(name = "ej_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "ej_intensidad")
    private String intensidad;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ej_clase", referencedColumnName = "cd_codigo")
    private ClaseDev claseDev;

}
