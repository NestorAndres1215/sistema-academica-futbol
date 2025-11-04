package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneralDevDTO {
    private  String codigo;
    private String clave;
    private String descripcionPrimero;
    private String descripcionSegundo;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private String general;


}
