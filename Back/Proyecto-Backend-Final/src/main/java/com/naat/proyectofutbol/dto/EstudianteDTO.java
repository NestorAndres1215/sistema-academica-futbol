package com.naat.proyectofutbol.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstudianteDTO {
    private String codigoProfesor;
    private String codigoUsuario;
    private String primerNombre;
    private String segundoNombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String telefono;
    private String dni;
    private String direccion;
    private String correo;
    private int edad;
    private LocalDate nacimiento;
    private String nacionalidad;
    private String perfil; // Puede ser null, según tu lógica
    private String username;
    private String password;
    private String usuarioCreacion;
    private String usuarioActualizacion;
    private String sede;
    private String genero;
    private String tipoDoc;

}
