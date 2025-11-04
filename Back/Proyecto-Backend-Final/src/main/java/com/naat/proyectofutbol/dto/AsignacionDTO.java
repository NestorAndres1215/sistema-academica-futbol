package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionDTO {
    private List<AsignacionDTO> asignaciones;
    private String codigo;
    private String profesor;
    private String estudiante;

}
