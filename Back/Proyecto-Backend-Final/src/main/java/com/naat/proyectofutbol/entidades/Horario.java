package com.naat.proyectofutbol.entidades;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Horario")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

}
