package com.naat.proyectofutbol.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @Column(name = "tr_codigo", length = 255, nullable = false, unique = true)
    private String codigo;
    @Column(name = "tr_rol", length = 255, nullable = false)
    private String rol;

    @Column(name = "tr_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "tr_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "tr_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "tr_horaactualizacion")
    private LocalTime horaActualizacion;



    public Rol(String codigo, String rol, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion) {
        this.codigo = codigo;
        this.rol = rol;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
    }

    public Rol() {
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
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

    @Override
    public String toString() {
        return "Rol{" +
                "codigo='" + codigo + '\'' +
                ", rol='" + rol + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                '}';
    }
}
