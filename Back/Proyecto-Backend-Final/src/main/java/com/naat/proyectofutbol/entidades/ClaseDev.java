package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "clasedev")
public class ClaseDev {

    @Id
    @Column(name = "cd_codigo")
    private String codigo;
    @Column(name = "cd_descripcion")
    private String descripcion;
    @Column(name = "cd_objetivo")
    private String objetivo;
    @Column(name = "cd_dia")
    private String dia;
    @Column(name = "cd_titulo")
    private String titulo;
    @Column(name = "cd_usuariocreacion")
    private String usuarioCreacion;
    @Column(name = "cd_usuarioactualizacion")
    private String usuarioActualizacion;
    @Column(name = "cd_fechacreacion")
    private LocalDate fechaCreacion;
    @Column(name = "cd_horacreacion")
    private LocalTime horaCreacion;
    @Column(name = "cd_fechaactualizacion")
    private LocalDate fechaActualizacion;
    @Column(name = "cd_horaactualizacion")
    private LocalTime horaActualizacion;
    @Column(name = "cd_estado")
    private boolean estado;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cd_clase", referencedColumnName = "cl_codigo")
    private Clase clase;

    @Override
    public String toString() {
        return "ClaseDev{" +
                "codigo='" + codigo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", objetivo='" + objetivo + '\'' +
                ", dia='" + dia + '\'' +
                ", titulo='" + titulo + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", estado=" + estado +
                ", clase=" + clase +
                '}';
    }

    public ClaseDev() {
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }


    public Clase getClase() {
        return clase;
    }

    public void setClase(String codigo) {
        if (codigo != null) {
            Clase clase = new Clase();
            clase.setCodigo(codigo);
            this.clase = clase;

        }
    }
}
