package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleLesionDTO {

    private String lesiones;

    private String tipoEvento;
    private String descripcion;
    private String responsable;
    private String observaciones;


}
