package com.naat.proyectofutbol.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {

    private String codigoUsuario;
    private String codigoAdmin;
    private String primerNombre;
    private String segundoNombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String correo;
    private String telefono;
    private String dni;
    private String direccion;
    private int edad;
    private LocalDate fechaNacimiento;
    private String nacionalidad;
    private String perfil;
    private String username;
    private String password;
    private String usuarioCreacion;
    private String usuarioActualizacion;

}
