package com.naat.proyectofutbol.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.*;

@Entity
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Usuario {

    @Id
    @Column(name = "us_codigo")
    private String codigo;  
    
    @Column(name = "us_usuario", nullable = false)
    private String username;  

    @Column(name = "us_contra", nullable = false)
    private String password; 

    @Column(name = "us_estado", nullable = false)
    private Boolean estado;

    @Column(name = "us_fechacreacion")
    private LocalDate fechaCreacion;  

    @Column(name = "us_horacreacion")
    private LocalTime horaCreacion;  

    @Column(name = "us_fechaactualizacion")
    private LocalDate fechaActualizacion;  

    @Column(name = "us_horaactualizacion")
    private LocalTime horaActualizacion; 

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "us_rol", referencedColumnName = "tr_codigo") 
    private Rol rol;

    @Column(name = "us_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "us_usuarioactualizacion")
    private String usuarioActualizacion;

}
