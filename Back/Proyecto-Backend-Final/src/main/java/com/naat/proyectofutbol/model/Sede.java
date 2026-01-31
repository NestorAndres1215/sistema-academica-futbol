package com.naat.proyectofutbol.model;

import lombok.*;

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
@Builder
@Getter
@Setter
public class Sede {

    @Id
    @Column(name = "se_codigo")
    private String codigo; 

    @Column(name = "se_nombre")
    private String nombre; 

    @Column(name = "se_direccion")
    private String direccion; 

    @Column(name = "se_telefono")
    private String telefono;  

    @Column(name = "se_estado")
    private boolean estado; 

    @Column(name = "se_usuario_creacion")
    private String usuarioCreacion;  

    @Column(name = "se_fecha_creacion")
    private LocalDate fechaCreacion;  

    @Column(name = "se_usuario_actualizacion")
    private String usuarioActualizacion;  

    @Column(name = "se_fecha_actualizacion")
    private LocalDate fechaActualizacion; 

    @Column(name = "se_hora_creacion")
    private LocalTime horaCreacion;  

    @Column(name = "se_hora_actualizacion")
    private LocalTime horaActualizacion;  

}
