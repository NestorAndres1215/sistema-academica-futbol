package com.naat.proyectofutbol.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfesorRequest {

    private String codigoProfesor;

    private String codigoUsuario;

    @NotBlank(message = "El primer nombre es obligatorio")
    private String primerNombre;

    private String segundoNombre;

    @NotBlank(message = "El apellido paterno es obligatorio")
    private String apellidoPaterno;

    private String apellidoMaterno;

    @Pattern(regexp = "\\d{9}", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    private String dni;

    private String direccion;

    @Email(message = "El correo debe tener un formato válido")
    @NotBlank(message = "El correo es obligatorio")
    private String correo;

    @Min(value = 18, message = "La edad mínima es 18 años")
    @Max(value = 99, message = "La edad máxima es 99 años")
    private int edad;

    @Past(message = "La fecha de nacimiento debe ser anterior a hoy")
    private LocalDate nacimiento;

    @NotBlank(message = "La nacionalidad es obligatoria")
    private String nacionalidad;

    private String perfil;

    @NotBlank(message = "El username es obligatorio")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener mínimo 6 caracteres")
    private String password;

    @NotBlank(message = "El usuario de creación es obligatorio")
    private String usuarioCreacion;

    private String usuarioActualizacion;

    @NotBlank(message = "La sede es obligatoria")
    private String sede;

    @NotBlank(message = "El cargo es obligatorio")
    private String cargo;

    @NotBlank(message = "El género es obligatorio")
    private String genero;

    @NotBlank(message = "El tipo de documento es obligatorio")
    private String tipoDoc;


}
