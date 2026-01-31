package com.naat.proyectofutbol.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "lesiondev")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class LesionesDev {

    @Id
    @Column(name = "dl_codigo")
    private String codigo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dl_lesiones", referencedColumnName = "le_codigo")
    private Lesiones lesiones;

    @Column(name = "dl_fecha")
    private LocalDate fecha;

    @Column(name = "dl_hora")
    private LocalTime hora;

    @Column(name = "dl_tipo_evento")
    private String tipoEvento;

    @Column(name = "dl_descripcion")
    private String descripcion;

    @Column(name = "dl_responsable")
    private String responsable;

    @Column(name = "dl_observaciones")
    private String observaciones;

    @Column(name = "dl_usuario_registro")
    private String usuarioRegistro;

    @Column(name = "dl_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "dl_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "dl_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "dl_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "dl_usuario_actualizacion")
    private String usuarioActualizacion;

}
