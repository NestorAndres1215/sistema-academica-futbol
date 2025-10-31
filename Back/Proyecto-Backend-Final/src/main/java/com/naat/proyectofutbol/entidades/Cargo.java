package com.naat.proyectofutbol.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "cargo")
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

    public Cargo(String codigo, String nombre, boolean estado, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, String usuarioCreacion, String usuarioActualizacion, String descripcion) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.usuarioCreacion = usuarioCreacion;
        this.usuarioActualizacion = usuarioActualizacion;
        this.descripcion = descripcion;
    }

    public Cargo() {
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }


    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalTime getHoraCreacion() {
        return horaCreacion;
    }

    public void setHoraCreacion(LocalTime horaCreacion) {
        this.horaCreacion = horaCreacion;
    }

    public LocalDate getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDate fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public LocalTime getHoraActualizacion() {
        return horaActualizacion;
    }

    public void setHoraActualizacion(LocalTime horaActualizacion) {
        this.horaActualizacion = horaActualizacion;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }


    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}