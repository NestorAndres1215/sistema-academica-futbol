package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "gendev")
public class GeneralDev {
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

    @ManyToOne
    @JoinColumn(name = "tl_gen", referencedColumnName = "tl_codigo")
    private General general;

    public GeneralDev() {
    }

    public GeneralDev(General general, boolean estado, LocalTime horaActualizacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalDate fechaCreacion, String usuarioActualizacion, String usuarioCreacion, String descripcion2, String descripcion1, String clave, String codigo) {
        this.general = general;
        this.estado = estado;
        this.horaActualizacion = horaActualizacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.fechaCreacion = fechaCreacion;
        this.usuarioActualizacion = usuarioActualizacion;
        this.usuarioCreacion = usuarioCreacion;
        this.descripcion2 = descripcion2;
        this.descripcion1 = descripcion1;
        this.clave = clave;
        this.codigo = codigo;
    }

    @Override
    public String toString() {
        return "GeneralDev{" +
                "codigo='" + codigo + '\'' +
                ", clave=" + clave +
                ", descripcion1='" + descripcion1 + '\'' +
                ", descripcion2='" + descripcion2 + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaCreacion=" + horaCreacion +
                ", horaActualizacion=" + horaActualizacion +
                ", estado=" + estado +
                ", general=" + general +
                '}';
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public LocalTime getHoraActualizacion() {
        return horaActualizacion;
    }

    public void setHoraActualizacion(LocalTime horaActualizacion) {
        this.horaActualizacion = horaActualizacion;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
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

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public String getDescripcion2() {
        return descripcion2;
    }

    public void setDescripcion2(String descripcion2) {
        this.descripcion2 = descripcion2;
    }

    public String getDescripcion1() {
        return descripcion1;
    }

    public void setDescripcion1(String descripcion1) {
        this.descripcion1 = descripcion1;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public General getGeneral() {
        return general;
    }

    public void setGeneral(General general) {
        this.general = general;
    }
}
