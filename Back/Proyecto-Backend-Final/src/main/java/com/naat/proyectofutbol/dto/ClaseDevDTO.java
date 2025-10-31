package com.naat.proyectofutbol.dto;

public class ClaseDevDTO {
    private String codigo;
    private String titulo;
    private  String descripcion;
    private String dia;
    private String clase;
    private String objetivo;
    private String usuarioCreacion;
    private String usuarioActualizacion;

    @Override
    public String toString() {
        return "ClaseDevDTO{" +
                "codigo='" + codigo + '\'' +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", dia='" + dia + '\'' +
                ", clase='" + clase + '\'' +
                ", objetivo='" + objetivo + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getClase() {
        return clase;
    }

    public void setClase(String clase) {
        this.clase = clase;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
