package com.naat.proyectofutbol.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import lombok.*;
@Entity
@Table(name = "menu")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
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
    private Integer activar;  

    @ManyToOne
    @JoinColumn(name = "mu_rol", referencedColumnName = "tr_codigo")
    private Rol rol;


}
