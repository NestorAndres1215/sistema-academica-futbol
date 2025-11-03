package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.AdminDTO;


import com.naat.proyectofutbol.entidades.Admin;

import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface AdminService {
    List<Admin> getAdminsByUsuarioCodigo(String usuarioCodigo);

    List<Admin> listarAdmin();

    Admin guardarAdmin(AdminDTO admin) throws Exception;

    Admin actualizarAdmin(AdminDTO admin);

    String obtenerUltimoCodigoUsuario();

    String ObtenerUltimoCodigoAdmin();

    boolean ExistePorEmail(String email);

    boolean ExistePorTelefono(String telefono);

    boolean ExistePorDNI(String dni);

    boolean telefonoEsValido(String telefono);

    boolean correoEsValido(String correo);

    boolean dniEsValido(String dni);

    Admin actualizarImagen(String codigoUsuario, String codigoAdmin, String contra,
                           String username, String primerNombre, String segundoNombre,
                           String apellidoPaterno, String apellidoMaterno,
                           String telefono, String email,
                           String dni, String direccion, LocalDate nacimiento,
                           String nacionalidad, int edad, MultipartFile archivo) throws IOException;

    List<Admin> findAdminsByEstadoTrue();

    List<Admin> findAdminsByEstadoFalse();

    List<Admin> findByCorreo(String correo);

    List<Admin> findByDni(String dni);

    List<Admin> findByApellidoPaterno(String apellidoPaterno);

    List<Admin> findByPrimerNombre(String primerNombre);

    List<Admin> findByTelefono(String telefono);

    Admin desactivarUsuario(String usuarioCodigo);

    Admin activarUsuario(String usuarioCodigo);
}
