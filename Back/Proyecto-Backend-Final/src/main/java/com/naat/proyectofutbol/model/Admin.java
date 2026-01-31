package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "admin")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Admin {
    @Id
    @Column(name = "ad_codigo")
    private String codigo;

    @Column(name = "ad_primernombre")
    private String primerNombre;

    @Column(name = "ad_segundonombre")
    private String segundoNombre;

    @Column(name = "ad_apellidopaterno")
    private String apellidoPaterno;

    @Column(name = "ad_apellidomaterno")
    private String apellidoMaterno;

    @Column(name = "ad_correo")
    private String correo;

    @Column(name = "ad_telefono")
    private String telefono;

    @Column(name = "ad_dni")
    private String dni;

    @Column(name = "ad_direccion")
    private String direccion;

    @Column(name = "ad_edad")
    private int edad;

    @Column(name = "ad_fechanacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "ad_nacionalidad")
    private String nacionalidad;

    @Column(name = "ad_estado")
    private boolean estado;

    @Lob
    @Column(name = "ad_perfil")
    private byte[] perfil;

    @Column(name = "ad_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "ad_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "ad_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "ad_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "ad_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "ad_horaactualizacion")
    private LocalTime horaActualizacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ad_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario;


}
