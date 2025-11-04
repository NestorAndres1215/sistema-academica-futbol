package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompaniaDTO {
    private String nombre;
    private String telefono;
    private String direccion;
    private String correo;
    private String pais;
    private String sector;
    private String descripcion;
    private String ruc;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date fecha;

    private MultipartFile archivo;


}