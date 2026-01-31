package com.naat.proyectofutbol.model;


import lombok.*;
import javax.persistence.*;

@Entity
@Table(name = "evaluacion")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Evaluacion {

    @Id
    @Column(name = "ev_codigo")
    private String codigo;

    @Column(name = "ev_nota_final")
    private Integer notaFinal;

    @Column(name = "ev_comentarios")
    private String comentarios;

    @ManyToOne
    @JoinColumn(name = "ev_estudiante", referencedColumnName = "es_codigo")
    private Estudiante estudiante;

}
