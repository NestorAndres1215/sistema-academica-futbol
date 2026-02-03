package com.naat.proyectofutbol.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.*;

@Entity
@Table(name = "lesiones")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Lesiones {

    @Id
    @Column(name = "le_codigo", length = 4)
    private String codigo;


    @Column(name = "le_tipo_lesion")
    private String tipoLesion;

    @Column(name = "le_fecha_lesion")
    private LocalDate fechaLesion;

    @Column(name = "le_gravedad")
    private String gravedad;

    @Column(name = "le_estado")
    private Boolean estado;

    @Column(name = "le_tiempo_recuperacion")
    private Integer tiempoRecuperacion;

    @Column(name = "le_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "le_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "le_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "le_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "le_comentarios")
    private String comentarios;

    @Column(name = "le_usuario_registro")
    private String usuarioRegistro;

    @Column(name = "le_usuario_actualizacion")
    private String usuarioActualizacion;

    @Column(name = "le_fecha_recuperacion")
    private LocalDate fechaRecuperacion;

    @Column(name = "le_descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "le_estudiante", referencedColumnName = "es_codigo")
    private Estudiante estudiante;

}
