package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Equipo")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Equipo {

    @Id
    @Column(name = "eq_codigo", length = 4, nullable = false)
    private String codigo;
    @Column(name = "eq_nombre")
    private String nombre;
    @Column(name = "eq_categoria")
    private String categoria;
    @Column(name = "eq_sede")
    private String sede;
    @Column(name = "eq_genero")
    private String genero;
    @Column(name = "eq_estado")
    private boolean estado;
    @Column(name = "eq_fecha_creacion")
    private LocalDate fechaCreacion;
    @Column(name = "eq_hora_creacion")
    private LocalTime horaCreacion;
    @Column(name = "eq_fecha_actualizacion")
    private LocalDate fechaActualizacion;
    @Column(name = "eq_hora_actualizacion")
    private LocalTime horaActualizacion;
    @Column(name = "eq_usuario_registro")
    private String usuarioRegistro;
    @Column(name = "eq_usuario_actualizacion", length = 255)
    private String usuarioActualizacion;


}
