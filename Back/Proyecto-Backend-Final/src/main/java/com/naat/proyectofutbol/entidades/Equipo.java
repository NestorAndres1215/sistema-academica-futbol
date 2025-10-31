package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Equipo")
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



    public Equipo() {
    }

    public Equipo(String codigo, String nombre, String categoria, String sede, String genero, boolean estado, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, String usuarioRegistro, String usuarioActualizacion) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.sede = sede;
        this.genero = genero;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.usuarioRegistro = usuarioRegistro;
        this.usuarioActualizacion = usuarioActualizacion;

    }

    @Override
    public String toString() {
        return "Equipo{" +
                "codigo='" + codigo + '\'' +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + categoria + '\'' +
                ", sede='" + sede + '\'' +
                ", genero='" + genero + '\'' +
                ", estado=" + estado +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion +

                '}';
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getSede() {
        return sede;
    }

    public void setSede(String sede) {
        this.sede = sede;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
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

    public String getUsuarioRegistro() {
        return usuarioRegistro;
    }

    public void setUsuarioRegistro(String usuarioRegistro) {
        this.usuarioRegistro = usuarioRegistro;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }


}
