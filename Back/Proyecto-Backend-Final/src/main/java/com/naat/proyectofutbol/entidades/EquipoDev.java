package com.naat.proyectofutbol.entidades;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "equipodev")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EquipoDev {

    @Id
    @Column(name = "ed_codigo")
    private String codigo;
    @Column(name = "ed_numero_camiseta")
    private int numeroCamiseta;

    @Column(name = "ed_posicion")
    private String posicion;

    @Column(name = "ed_capitan")
    private boolean esCapitan;

    @Column(name = "ed_comentarios")
    private String comentarios;

    @Column(name = "ed_estado")
    private boolean estado;

    @Column(name = "ed_fecha_creacion")
    private LocalDate fechaCreacion;

    @Column(name = "ed_hora_creacion")
    private LocalTime horaCreacion;

    @Column(name = "ed_fecha_actualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "ed_hora_actualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "ed_usuario_registro")
    private String usuarioRegistro;

    @Column(name = "ed_usuario_actualizacion", length = 255)
    private String usuarioActualizacion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ed_entrenador", referencedColumnName = "pr_codigo")
    private Profesor profesor; // Relación con la tabla Profesor

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ed_estudiante", referencedColumnName = "es_codigo")
    private Estudiante estudiante; // Relación con la tabla Estudiante

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ed_equipo", referencedColumnName = "eq_codigo")
    private Equipo equipo; // Relación con la tabla Estudiante

    public void setProfesor(String codigo) {
        if (codigo != null) {
            Profesor profesor = new Profesor();
            profesor.setCodigo(codigo);
            this.profesor = profesor;

        }
    }

    public void setEstudiante(String codigo) {
        if (codigo != null) {
            Estudiante estudiante = new Estudiante();
            estudiante.setCodigo(codigo);
            this.estudiante = estudiante;

        }
    }

    public void setEquipo(String codigo) {
        if (codigo != null) {
            Equipo equipo1 = new Equipo();
            equipo1.setCodigo(codigo);
            this.equipo = equipo1;

        }
    }
}
