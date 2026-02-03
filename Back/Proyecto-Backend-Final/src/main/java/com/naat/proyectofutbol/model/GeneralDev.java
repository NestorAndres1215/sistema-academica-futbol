package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "gendev")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class GeneralDev {

    @Id
    @Column(name = "tl_codigo")
    private String codigo;

    @Column(name = "tl_clave")
    private String clave;

    @Column(name = "tl_descri1")
    private String descripcion1;

    @Column(name = "tl_descri2")
    private String descripcion2;
    
    @Column(name = "tl_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "tl_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "tl_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "tl_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "tl_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "tl_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "tl_estado")
    private Boolean estado;

    @ManyToOne
    @JoinColumn(name = "tl_gen", referencedColumnName = "tl_codigo")
    private General general;

  
}
