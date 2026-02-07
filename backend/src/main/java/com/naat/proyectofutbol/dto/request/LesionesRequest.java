package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LesionesRequest {

    private String codigo;


    @NotBlank(message = "El tipo de lesión es obligatorio")
    private String tipoLesion;

    @NotNull(message = "La fecha de la lesión es obligatoria")
    @PastOrPresent(message = "La fecha de la lesión no puede ser futura")
    private LocalDate fechaLesion;

    @NotBlank(message = "La gravedad es obligatoria")
    private String gravedad;

    @Min(value = 1, message = "El tiempo de recuperación debe ser mayor a 0")
    private Integer tiempoRecuperacion; // en días

    @Size(max = 500, message = "Los comentarios no deben exceder 500 caracteres")
    private String comentarios;

    @NotBlank(message = "El usuario de registro es obligatorio")
    private String usuarioRegistro;

    private String usuarioActualizacion;

    @FutureOrPresent(message = "La fecha de recuperación no puede ser pasada")
    private LocalDate fechaRecuperacion;

    @Size(max = 255, message = "La descripción no debe exceder 255 caracteres")
    private String descripcion;

    @NotBlank(message = "El estudiante es obligatorio")
    private String estudiante;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;

}
