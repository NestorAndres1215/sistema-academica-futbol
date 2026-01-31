package com.naat.proyectofutbol.model;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
@Entity
@Table(name = "historialusuario")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Historial {

    @Id
    @Column(name = "hu_codigo", length = 4, nullable = false)
    private String codigo; 

    @Column(name = "hu_fecha", nullable = false)
    private LocalDate fecha; 

    @Column(name = "hu_hora", nullable = false)
    private LocalTime hora; 
    
    @ManyToOne
    @JoinColumn(name = "hu_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario; 

    @Column(name = "hu_detalle", columnDefinition = "TEXT")
    private String detalle;

   
}
