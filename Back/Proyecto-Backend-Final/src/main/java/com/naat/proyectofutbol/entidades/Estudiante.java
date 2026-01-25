package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

@Entity
@Table(name = "estudiante")
@AllArgsConstructor
@NoArgsConstructor
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


    public void setUsuario(String codigoUsuario) {
        if (codigoUsuario != null) {
            Usuario usuario = new Usuario();  // Crear un objeto Usuario
            usuario.setCodigo(codigoUsuario); // Asignar el código al usuario
            this.usuario = usuario;           // Asignarlo al administrador
        }
    }





}
