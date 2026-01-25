package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "cargo")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cargo {
    @Id
    @Column(name = "cg_codigo")
    private String codigo;  // Código del cargo

    @Column(name = "cg_nombre")
    private String nombre;  // Nombre del cargo

    @Column(name = "cg_estado")
    private boolean estado; // Estado del cargo (activo o inactivo)

    // Fecha y hora de creación
    @Column(name = "cg_fecha_creacion")
    private LocalDate fechaCreacion;

    @Column(name = "cg_hora_creacion")
    private LocalTime horaCreacion;

    // Fecha y hora de actualización
    @Column(name = "cg_fecha_actualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "cg_hora_actualizacion")
    private LocalTime horaActualizacion;

    // Usuarios de creación y actualización
    @Column(name = "cg_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "cg_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "cg_descripcion")
    private String descripcion;


}