package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.poi.hpsf.Decimal;

import javax.persistence.*;

@Entity
@Table(name = "evaluacion")
@AllArgsConstructor
@NoArgsConstructor
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

    public void setEstudiante(String codigo) {
        if (codigo != null) {
            Estudiante estudiante = new Estudiante();
            estudiante.setCodigo(codigo);
            this.estudiante = estudiante;

        }
    }
}
