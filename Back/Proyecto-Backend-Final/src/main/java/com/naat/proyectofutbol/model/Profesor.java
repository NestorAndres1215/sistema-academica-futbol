package com.naat.proyectofutbol.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.*;

@Entity
@Table(name = "profesor")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Profesor {

    @Id
    @Column(name = "pr_codigo")
    private String codigo;

    @Column(name = "pr_primernombre")
    private String primerNombre;

    @Column(name = "pr_segundonombre")
    private String segundoNombre;

    @Column(name = "pr_apellidopaterno")
    private String apellidoPaterno;

    @Column(name = "pr_apellidomaterno")
    private String apellidoMaterno;

    @Column(name = "pr_telefono")
    private String telefono;

    @Column(name = "pr_genero")
    private String genero;

    @Column(name = "pr_dni")
    private String dni;

    @Column(name = "pr_tipodoc")
    private String tipo;

    @Column(name = "pr_direccion")
    private String direccion;

    @Column(name = "pr_correo")
    private String correo;

    @Column(name = "pr_edad")
    private int edad;

    @Column(name = "pr_fechanacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "pr_nacionalidad")
    private String nacionalidad;

    @Column(name = "pr_estado")
    private boolean estado;

    @Column(name = "pr_perfil")
    @Lob
    private byte[] perfil;

    @Column(name = "pr_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "pr_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "pr_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "pr_horaactualizacion")
    private LocalTime horaActualizacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pr_cargo", referencedColumnName = "cg_codigo")
    private Cargo cargo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pr_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pr_sede", referencedColumnName = "se_codigo")
    private Sede sede;

    @Column(name = "pr_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "pr_usuarioactualizacion")
    private String usuarioActualizacion;

}
