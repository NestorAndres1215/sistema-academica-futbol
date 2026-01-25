package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
@Entity
@Table(name = "lesiondev")
@AllArgsConstructor
@NoArgsConstructor
public class LesionesDev {
    @Id
    @Column(name = "dl_codigo")
    private String codigo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dl_lesiones", referencedColumnName = "le_codigo")
    private Lesiones lesiones;

    @Column(name = "dl_fecha")
    private LocalDate fecha;

    @Column(name = "dl_hora")
    private LocalTime hora;

    @Column(name = "dl_tipo_evento")
    private String tipoEvento;

    @Column(name = "dl_descripcion")
    private String descripcion;

    @Column(name = "dl_responsable")
    private String responsable;

    @Column(name = "dl_observaciones")
    private String observaciones;

    @Column(name = "dl_usuario_registro")
    private String usuarioRegistro;

    @Column(name = "dl_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "dl_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "dl_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "dl_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "dl_usuario_actualizacion")
    private String usuarioActualizacion;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Lesiones getLesiones() {
        return lesiones;
    }


    public void setLesiones(String codigoUsuario) {
        if (codigoUsuario != null) {
            Lesiones usuario = new Lesiones();  // Crear un objeto Usuario
            usuario.setCodigo(codigoUsuario); // Asignar el código al usuario
            this.lesiones = usuario;           // Asignarlo al administrador
        }
    }
    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public String getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getUsuarioRegistro() {
        return usuarioRegistro;
    }

    public void setUsuarioRegistro(String usuarioRegistro) {
        this.usuarioRegistro = usuarioRegistro;
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

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }
}
