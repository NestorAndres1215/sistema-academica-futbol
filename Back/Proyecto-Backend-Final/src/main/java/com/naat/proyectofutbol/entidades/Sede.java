package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sede")
@AllArgsConstructor
@NoArgsConstructor
public class Sede {

    @Id
    @Column(name = "se_codigo")
    private String codigo;  // Código de la sede

    @Column(name = "se_nombre")
    private String nombre;  // Nombre de la sede

    @Column(name = "se_direccion")
    private String direccion;  // Dirección de la sede

    @Column(name = "se_telefono")
    private String telefono;  // Teléfono de la sede

    @Column(name = "se_estado")
    private boolean estado;  // Estado de la sede (activo/inactivo)

    @Column(name = "se_usuario_creacion")
    private String usuarioCreacion;  // Usuario que creó el registro

    @Column(name = "se_fecha_creacion")
    private LocalDate fechaCreacion;  // Fecha y hora de creación

    @Column(name = "se_usuario_actualizacion")
    private String usuarioActualizacion;  // Usuario que actualizó el registro

    @Column(name = "se_fecha_actualizacion")
    private LocalDate fechaActualizacion;  // Fecha y hora de la última actualización

    @Column(name = "se_hora_creacion")
    private LocalTime horaCreacion;  // Hora de la creación

    @Column(name = "se_hora_actualizacion")
    private LocalTime horaActualizacion;  // Hora de la última actualización

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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
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

    public LocalTime getHoraCreacion() {
        return horaCreacion;
    }

    public void setHoraCreacion(LocalTime horaCreacion) {
        this.horaCreacion = horaCreacion;
    }

    public LocalTime getHoraActualizacion() {
        return horaActualizacion;
    }

    public void setHoraActualizacion(LocalTime horaActualizacion) {
        this.horaActualizacion = horaActualizacion;
    }
}
