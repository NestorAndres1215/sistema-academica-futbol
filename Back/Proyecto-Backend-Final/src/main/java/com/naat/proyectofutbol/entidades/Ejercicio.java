package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "ejercicios")

public class Ejercicio {

    @Id
    @Column(name = "ej_codigo")
    private String codigo;

    @Column(name = "ej_nombre")
    private String nombre;
    @Column(name = "ej_duracion")
    private String duracion;
    @Column(name = "ej_descripcion")
    private String descripcion;

    @Column(name = "ej_tipo")
    private String tipo;

    @Column(name = "ej_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "ej_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "ej_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "ej_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "ej_usuarioregistro")
    private String usuarioRegistro;

    @Column(name = "ej_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "ej_intensidad")
    private String intensidad;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ej_clase", referencedColumnName = "cd_codigo")
    private ClaseDev claseDev;


    public Ejercicio() {
    }

    public String getCodigo() {
        return codigo;
    }

    @Override
    public String toString() {
        return "Ejercicio{" +
                "codigo='" + codigo + '\'' +
                ", nombre='" + nombre + '\'' +
                ", duracion='" + duracion + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", tipo='" + tipo + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", intensidad='" + intensidad + '\'' +
                ", claseDev=" + claseDev +
                '}';
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public String getIntensidad() {
        return intensidad;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public void setIntensidad(String intensidad) {
        this.intensidad = intensidad;
    }

    public ClaseDev getClase() {
        return claseDev;
    }


    public void setClase(String codigo) {
        if (codigo != null) {
            ClaseDev clase = new ClaseDev();
            clase.setCodigo(codigo);
            this.claseDev = clase;

        }
    }
}
