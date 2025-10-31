package com.naat.proyectofutbol.dto;


public class EquipoDTO{
private String codigo;
    private String nombre;
    private String categoria;
    private String sede;
    private String genero;
    private boolean estado;
    private String usuarioRegistro;
    private String usuarioActualizacion;
    private String equipoDev;

    @Override
    public String toString() {
        return "EquipoDTO{" +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + categoria + '\'' +
                ", sede='" + sede + '\'' +
                ", genero='" + genero + '\'' +
                ", estado=" + estado +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", equipoDev='" + equipoDev + '\'' +
                '}';
    }

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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getSede() {
        return sede;
    }

    public void setSede(String sede) {
        this.sede = sede;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
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

    public String getEquipoDev() {
        return equipoDev;
    }

    public void setEquipoDev(String equipoDev) {
        this.equipoDev = equipoDev;
    }
}
