package com.naat.proyectofutbol.entidades;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Horario")
public class Horario {
    @Id
    @Column(name = "hor_codigo", length = 4, nullable = false)
    private String codigo;
    @Column(name = "hor_hora_inicio")
    private LocalTime inicioHora;
    @Column(name = "hor_hora_fin")
    private LocalTime finHora;
    @Column(name = "hor_fecha_creacion")
    private LocalDate fechaCreacion;
    @Column(name = "hor_hora_creacion")
    private LocalTime horaCreacion;
    @Column(name = "hor_fecha_actualizacion")
    private LocalDate fechaActualizacion;
    @Column(name = "hor_hora_actualizacion")
    private LocalTime horaActualizacion;
    @Column(name = "hor_usuario_registro")
    private String usuarioRegistro;
    @Column(name = "hor_usuario_actualizacion", length = 255)
    private String usuarioActualizacion;
    @Column(name = "hor_estado")
    private boolean estado;

    public Horario() {
    }

    public Horario(String codigo, LocalTime inicioHora, LocalTime finHora, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, String usuarioRegistro, String usuarioActualizacion, boolean estado) {
        this.codigo = codigo;
        this.inicioHora = inicioHora;
        this.finHora = finHora;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.usuarioRegistro = usuarioRegistro;
        this.usuarioActualizacion = usuarioActualizacion;
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Horario{" +
                "codigo='" + codigo + '\'' +
                ", inicioHora=" + inicioHora +
                ", finHora=" + finHora +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", estado=" + estado +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalTime getInicioHora() {
        return inicioHora;
    }

    public void setInicioHora(LocalTime inicioHora) {
        this.inicioHora = inicioHora;
    }

    public LocalTime getFinHora() {
        return finHora;
    }

    public void setFinHora(LocalTime finHora) {
        this.finHora = finHora;
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

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
