package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "clasedev")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ClaseDev {

    @Id
    @Column(name = "cd_codigo")
    private String codigo;

    @Column(name = "cd_descripcion")
    private String descripcion;

    @Column(name = "cd_objetivo")
    private String objetivo;

    @Column(name = "cd_dia")
    private String dia;

    @Column(name = "cd_titulo")
    private String titulo;

    @Column(name = "cd_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "cd_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "cd_fechacreacion")
    private LocalDate fechaCreacion;
    
    @Column(name = "cd_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "cd_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "cd_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "cd_estado")
    private boolean estado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cd_clase", referencedColumnName = "cl_codigo")
    private Clase clase;

}
