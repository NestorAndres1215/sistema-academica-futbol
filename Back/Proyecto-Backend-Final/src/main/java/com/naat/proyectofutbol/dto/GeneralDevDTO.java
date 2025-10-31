package com.naat.proyectofutbol.dto;

public class GeneralDevDTO {
    private  String codigo;
    private String clave;
    private String descripcionPrimero;
    private String descripcionSegundo;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private String general;

    @Override
    public String toString() {
        return "GeneralDevDTO{" +
                "codigo='" + codigo + '\'' +
                ", clave='" + clave + '\'' +
                ", descripcionPrimero='" + descripcionPrimero + '\'' +
                ", descripcionSegundo='" + descripcionSegundo + '\'' +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", general='" + general + '\'' +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getDescripcionPrimero() {
        return descripcionPrimero;
    }

    public void setDescripcionPrimero(String descripcionPrimero) {
        this.descripcionPrimero = descripcionPrimero;
    }

    public String getDescripcionSegundo() {
        return descripcionSegundo;
    }

    public void setDescripcionSegundo(String descripcionSegundo) {
        this.descripcionSegundo = descripcionSegundo;
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

    public String getGeneral() {
        return general;
    }

    public void setGeneral(String general) {
        this.general = general;
    }
}
