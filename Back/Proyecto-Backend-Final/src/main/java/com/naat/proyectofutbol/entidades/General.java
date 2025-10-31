package com.naat.proyectofutbol.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "general")
public class General {


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
    private boolean estado;

    public General() {
    }

    public General(String codigo, String clave, String descripcion1, String descripcion2, String usuarioCreacion, LocalDate fechaCreacion, LocalTime horaCreacion, String usuarioActualizacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, boolean estado) {
        this.codigo = codigo;
        this.clave = clave;
        this.descripcion1 = descripcion1;
        this.descripcion2 = descripcion2;
        this.usuarioCreacion = usuarioCreacion;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.usuarioActualizacion = usuarioActualizacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "General{" +
                "codigo='" + codigo + '\'' +
                ", clave='" + clave + '\'' +
                ", descripcion1='" + descripcion1 + '\'' +
                ", descripcion2='" + descripcion2 + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", estado=" + estado +
                '}';
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getDescripcion1() {
        return descripcion1;
    }

    public void setDescripcion1(String descripcion1) {
        this.descripcion1 = descripcion1;
    }

    public String getDescripcion2() {
        return descripcion2;
    }

    public void setDescripcion2(String descripcion2) {
        this.descripcion2 = descripcion2;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
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

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
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
}
