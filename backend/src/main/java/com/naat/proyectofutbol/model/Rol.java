package com.naat.proyectofutbol.model;


import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rol")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Rol {

    @Id
    @Column(name = "tr_codigo", length = 255, nullable = false, unique = true)
    private String codigo;

    @Column(name = "tr_rol", length = 255, nullable = false)
    private String rol;

    @Column(name = "tr_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "tr_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "tr_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "tr_horaactualizacion")
    private LocalTime horaActualizacion;



}
