package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "lesiones")
public class Lesiones {
    @Id
    @Column(name = "le_codigo", length = 4)
    private String codigo;


    @Column(name = "le_tipo_lesion")
    private String tipoLesion;

    @Column(name = "le_fecha_lesion")
    private LocalDate fechaLesion;

    @Column(name = "le_gravedad")
    private String gravedad;

    @Column(name = "le_estado")
    private boolean estado;

    @Column(name = "le_tiempo_recuperacion")
    private Integer tiempoRecuperacion;

    @Column(name = "le_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "le_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "le_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "le_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "le_comentarios")
    private String comentarios;

    @Column(name = "le_usuario_registro")
    private String usuarioRegistro;

    @Column(name = "le_usuario_actualizacion")
    private String usuarioActualizacion;

    @Column(name = "le_fecha_recuperacion")
    private LocalDate fechaRecuperacion;

    @Column(name = "le_descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "le_estudiante", referencedColumnName = "es_codigo")
    private Estudiante estudiante;

    public Lesiones(String codigo, String tipoLesion, LocalDate fechaLesion, String gravedad, boolean estado, Integer tiempoRecuperacion, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, String comentarios, String usuarioRegistro, String usuarioActualizacion, LocalDate fechaRecuperacion, String descripcion, Estudiante estudiante) {
        this.codigo = codigo;
        this.tipoLesion = tipoLesion;
        this.fechaLesion = fechaLesion;
        this.gravedad = gravedad;
        this.estado = estado;
        this.tiempoRecuperacion = tiempoRecuperacion;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.comentarios = comentarios;
        this.usuarioRegistro = usuarioRegistro;
        this.usuarioActualizacion = usuarioActualizacion;
        this.fechaRecuperacion = fechaRecuperacion;
        this.descripcion = descripcion;
        this.estudiante = estudiante;
    }

    public Lesiones() {
    }

    @Override
    public String toString() {
        return "Lesiones{" +
                "codigo='" + codigo + '\'' +
                ", tipoLesion='" + tipoLesion + '\'' +
                ", fechaLesion=" + fechaLesion +
                ", gravedad='" + gravedad + '\'' +
                ", estado=" + estado +
                ", tiempoRecuperacion=" + tiempoRecuperacion +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", comentarios='" + comentarios + '\'' +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", fechaRecuperacion=" + fechaRecuperacion +
                ", descripcion='" + descripcion + '\'' +
                ", estudiante=" + estudiante +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipoLesion() {
        return tipoLesion;
    }

    public void setTipoLesion(String tipoLesion) {
        this.tipoLesion = tipoLesion;
    }

    public LocalDate getFechaLesion() {
        return fechaLesion;
    }

    public void setFechaLesion(LocalDate fechaLesion) {
        this.fechaLesion = fechaLesion;
    }

    public String getGravedad() {
        return gravedad;
    }

    public void setGravedad(String gravedad) {
        this.gravedad = gravedad;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public Integer getTiempoRecuperacion() {
        return tiempoRecuperacion;
    }

    public void setTiempoRecuperacion(Integer tiempoRecuperacion) {
        this.tiempoRecuperacion = tiempoRecuperacion;
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

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
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

    public LocalDate getFechaRecuperacion() {
        return fechaRecuperacion;
    }

    public void setFechaRecuperacion(LocalDate fechaRecuperacion) {
        this.fechaRecuperacion = fechaRecuperacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(String codigo) {
        if (codigo != null) {
            Estudiante equipo1 = new Estudiante();
            equipo1.setCodigo(codigo);
            this.estudiante = equipo1;

        }
    }
}
