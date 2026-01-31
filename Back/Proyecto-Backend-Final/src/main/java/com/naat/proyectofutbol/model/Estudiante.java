package com.naat.proyectofutbol.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "estudiante")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Estudiante {

    @Id
    @Column(name = "es_codigo")
    private String codigo;

    @Column(name="es_primernombre")
    private String primerNombre;

    @Column(name="es_segundonombre")
    private  String segundoNombre;

    @Column(name = "es_apellidopaterno")
    private  String apellidoPaterno;

    @Column(name = "es_apellidomaterno")
    private  String apellidoMaterno;

    @Column(name = "es_telefono")
    private  String telefono;

    @Column(name = "es_genero")
    private  String genero;

    @Column(name = "es_dni")
    private  String dni;

    @Column(name = "es_direccion")
    private  String direccion;

    @Column(name = "es_correo")
    private  String correo;

    @Column(name = "es_edad")
    private  int edad;

    @Column(name = "es_tipodocumento")
    private String tipo;

    @Column(name = "es_fechanacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "es_nacionalidad")
    private String nacionalidad;

    @Column(name = "es_estado")
    private boolean estado;

    @Column(name = "es_perfil")
    @Lob
    private byte[] perfil;

    @Column(name = "es_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "es_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "es_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "es_horaactualizacion")
    private LocalTime horaActualizacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "es_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "es_sede", referencedColumnName = "se_codigo")
    private Sede sede;

    @Column(name = "es_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "es_usuarioactualizacion")
    private String usuarioActualizacion;


}
