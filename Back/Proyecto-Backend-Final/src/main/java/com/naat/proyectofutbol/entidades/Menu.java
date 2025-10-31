package com.naat.proyectofutbol.entidades;

import javax.persistence.*;

@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @Column(name = "mu_id", length = 4)
    private String id;

    @Column(name = "mu_categoria", length = 50)
    private String categoria;

    @Column(name = "mu_codigo", length = 50)
    private String codigo;

    @Column(name = "mu_icono", length = 50)
    private String icono;

    @Column(name = "mu_nivel")
    private Integer nivel;

    @Column(name = "mu_nombre", length = 255)
    private String nombre;

    @Column(name = "mu_tipo", length = 1)
    private String tipo;

    @Column(name = "mu_ruta", length = 255)
    private String ruta;

    @Column(name = "mu_activar")
    private Integer activar = 1;  // Default value 1

    @ManyToOne
    @JoinColumn(name = "mu_rol", referencedColumnName = "tr_codigo")
    private Rol rol;

    public Menu(String id, String categoria, String codigo, String icono, Integer nivel, String nombre, String tipo, String ruta, Integer activar, Rol rol) {
        this.id = id;
        this.categoria = categoria;
        this.codigo = codigo;
        this.icono = icono;
        this.nivel = nivel;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ruta = ruta;
        this.activar = activar;
        this.rol = rol;
    }

    public Menu() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public Integer getActivar() {
        return activar;
    }

    public void setActivar(Integer activar) {
        this.activar = activar;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
