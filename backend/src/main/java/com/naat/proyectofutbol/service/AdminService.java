package com.naat.proyectofutbol.service;


import com.naat.proyectofutbol.dto.request.AdminRequest;
import com.naat.proyectofutbol.model.Admin;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;


public interface AdminService {
    String ObtenerUltimoCodigoAdmin();

    String obtenerUltimoCodigoUsuario();

    List<Admin> listarUsuarioCodigo(String usuarioCodigo);

    List<Admin> listarAdmin();

    Admin guardarAdmin(AdminRequest admin);

    Admin actualizarAdmin(AdminRequest admin);

    List<Admin> findAdminsByEstadoTrue();

    List<Admin> findAdminsByEstadoFalse();

    Admin actualizarImagen(String codigoUsuario, String codigoAdmin, String contra, String username, String primerNombre, String segundoNombre,
                           String apellidoPaterno, String apellidoMaterno, String telefono, String email, String dni,
                           String direccion, LocalDate nacimiento, String nacionalidad, int edad, MultipartFile archivo);


    Admin buscarPorCorreo(String correo);

    Admin buscarPorDni(String dni);

    Admin buscarPorTelefono(String telefono);

    List<Admin> buscarPorPrimerNombre(String primerNombre);

    List<Admin> buscarPorApellidoPaterno(String apellidoPaterno);

    Admin desactivarUsuario(String usuarioCodigo);

    Admin activarUsuario(String usuarioCodigo);
}
