package com.naat.proyectofutbol.dto;


import java.time.LocalDate;
import java.time.LocalTime;

public class PartidoDTO {

    private String codigo;
    private String marcadorLocal;
    private String equipoRival;
    private LocalDate fecha;
    private LocalTime hora;
    private String lugar;
    private String tipoPartido;
    private String comentarios;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private String derrota;
    private String victoria;
    private String marcadorVisita;
    private String equipo;

    @Override
    public String toString() {
        return "PartidoDTO{" +
                "codigo='" + codigo + '\'' +
                ", marcadorLocal='" + marcadorLocal + '\'' +
                ", equipoRival='" + equipoRival + '\'' +
                ", fecha=" + fecha +
                ", hora=" + hora +
                ", lugar='" + lugar + '\'' +
                ", tipoPartido='" + tipoPartido + '\'' +
                ", comentarios='" + comentarios + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", derrota='" + derrota + '\'' +
                ", victoria='" + victoria + '\'' +
                ", marcadorVisita='" + marcadorVisita + '\'' +
                ", equipo='" + equipo + '\'' +
                '}';
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

    public String getEquipo() {
        return equipo;
    }

    public void setEquipo(String equipo) {
        this.equipo = equipo;
    }
}
