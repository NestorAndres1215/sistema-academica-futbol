package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "partido")
public class Partido {
    @Id
    @Column(name = "pat_codigo")
    private String codigo;



    @Column(name = "pat_marcadorlocal")
    private String marcadorLocal;

    @Column(name = "pat_equiporival")
    private String equipoRival;

    @Column(name = "pat_fecha")
    private LocalDate fecha;

    @Column(name = "pat_hora")
    private LocalTime hora;

    @Column(name = "pat_lugar")
    private String lugar;

    @Column(name = "pat_tipo_partido")
    private String tipoPartido;

    @Column(name = "pat_comentarios")
    private String comentarios;

    @Column(name = "pat_estado")
    private Boolean estado;

    @Column(name = "pat_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "pat_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "pat_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "pat_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "pat_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "pat_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "pat_derrota")
    private String derrota;

    @Column(name = "pat_victoria")
    private String victoria;

    @Column(name = "pat_marcadorvisita")
    private String marcadorVisita;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pat_equipo", referencedColumnName = "eq_codigo")
    private Equipo equipo;


    @Override
    public String toString() {
        return "Partido{" +
                "codigo='" + codigo + '\'' +
                ", marcadorLocal='" + marcadorLocal + '\'' +
                ", equipoRival='" + equipoRival + '\'' +
                ", fecha=" + fecha +
                ", hora=" + hora +
                ", lugar='" + lugar + '\'' +
                ", tipoPartido='" + tipoPartido + '\'' +
                ", comentarios='" + comentarios + '\'' +
                ", estado=" + estado +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", derrota='" + derrota + '\'' +
                ", victoria='" + victoria + '\'' +
                ", marcadorVisita='" + marcadorVisita + '\'' +
                ", equipo=" + equipo +
                '}';
    }

    public Partido() {
    }


    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getMarcadorLocal() {
        return marcadorLocal;
    }

    public void setMarcadorLocal(String marcadorLocal) {
        this.marcadorLocal = marcadorLocal;
    }

    public String getEquipoRival() {
        return equipoRival;
    }

    public void setEquipoRival(String equipoRival) {
        this.equipoRival = equipoRival;
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

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public String getTipoPartido() {
        return tipoPartido;
    }

    public void setTipoPartido(String tipoPartido) {
        this.tipoPartido = tipoPartido;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
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

    public String getDerrota() {
        return derrota;
    }

    public void setDerrota(String derrota) {
        this.derrota = derrota;
    }

    public String getVictoria() {
        return victoria;
    }

    public void setVictoria(String victoria) {
        this.victoria = victoria;
    }

    public String getMarcadorVisita() {
        return marcadorVisita;
    }

    public void setMarcadorVisita(String marcadorVisita) {
        this.marcadorVisita = marcadorVisita;
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(String codigo) {
        if (codigo != null) {
            Equipo equipo1 = new Equipo();
            equipo1.setCodigo(codigo);
            this.equipo = equipo1;

        }
    }
}
