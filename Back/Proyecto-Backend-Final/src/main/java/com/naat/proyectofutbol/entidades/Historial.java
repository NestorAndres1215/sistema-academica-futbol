package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
@Entity
@Table(name = "historialusuario")
public class Historial {

    @Id
    @Column(name = "hu_codigo", length = 4, nullable = false)
    private String codigo; // Identificador único del historial

    @Column(name = "hu_fecha", nullable = false)
    private LocalDate fecha; // Fecha del cambio

    @Column(name = "hu_hora", nullable = false)
    private LocalTime hora; // Hora del cambio

    @ManyToOne
    @JoinColumn(name = "hu_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario; // Relación con la tabla Usuario (clave foránea)

    @Column(name = "hu_detalle", columnDefinition = "TEXT")
    private String detalle; // Descripción o detalles del cambio

    public Historial(String codigo, LocalDate fecha, LocalTime hora, Usuario usuario, String detalle) {
        this.codigo = codigo;
        this.fecha = fecha;
        this.hora = hora;
        this.usuario = usuario;
        this.detalle = detalle;
    }

    public Historial() {
    }

    @Override
    public String toString() {
        return "Historial{" +
                "codigo='" + codigo + '\'' +
                ", fecha=" + fecha +
                ", hora=" + hora +
                ", usuario=" + usuario +
                ", detalle='" + detalle + '\'' +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(String codigoUsuario) {
        if (codigoUsuario != null) {
            Usuario usuario = new Usuario();  // Crear un objeto Usuario
            usuario.setCodigo(codigoUsuario); // Asignar el código al usuario
            this.usuario = usuario;           // Asignarlo al administrador
        }
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }
}
