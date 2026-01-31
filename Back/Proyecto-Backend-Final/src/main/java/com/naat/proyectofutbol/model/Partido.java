package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "partido")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Partido {

    @Id
    @Column(name = "pat_codigo")
    private String codigo;

    @Column(name = "pat_marcadorlocal")
    private String marcadorLocal;

    @Column(name = "pat_equiporival")
    private String equipoRival;

    @Column(name = "pat_fecha")
    private LocalDate fecha;

    @Column(name = "pat_hora")
    private LocalTime hora;

    @Column(name = "pat_lugar")
    private String lugar;

    @Column(name = "pat_tipo_partido")
    private String tipoPartido;

    @Column(name = "pat_comentarios")
    private String comentarios;

    @Column(name = "pat_estado")
    private Boolean estado;

    @Column(name = "pat_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "pat_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "pat_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "pat_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "pat_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "pat_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "pat_derrota")
    private String derrota;

    @Column(name = "pat_victoria")
    private String victoria;

    @Column(name = "pat_marcadorvisita")
    private String marcadorVisita;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pat_equipo", referencedColumnName = "eq_codigo")
    private Equipo equipo;

}
