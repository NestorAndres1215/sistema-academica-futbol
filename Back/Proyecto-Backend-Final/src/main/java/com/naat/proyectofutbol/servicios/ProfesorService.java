package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.AdminDTO;
import com.naat.proyectofutbol.dto.ProfesorDTO;
import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.Estudiante;
import com.naat.proyectofutbol.entidades.Profesor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProfesorService {
    List<Profesor> findAdminsByEstadoTrue();
    List<Profesor> findAdminsByEstadoFalse();
    Profesor desactivar(String usuarioCodigo);
    Profesor activar(String usuarioCodigo);
    Profesor guardarProfesor(ProfesorDTO profesorDTO) throws Exception;
    Profesor actualizarProfesor(ProfesorDTO profesorDTO) throws Exception;
    String obtenerUltimoCodigoProfesor();
    String ObtenerUltimoCodigoUsuario ();
    boolean telefonoEsValido(String telefono);
    boolean correoEsValido(String correo);
    boolean dniEsValido(String dni);
    boolean ExistePorEmail(String email);
    boolean ExistePorTelefono(String telefono);
    boolean ExistePorDNI(String dni);
    List<Profesor> registrarProfesores(List<ProfesorDTO> profesorDTOs) throws Exception;
    List<Profesor> listar();
    List<Profesor> getAdminsByUsuarioCodigo(String usuarioCodigo);
    Profesor actualizarImagen(String codigoUsuario,
                           String codigoAdmin,
                           String username,
                           String primerNombre,
                           String segundoNombre,
                           String apellidoPaterno,
                           String apellidoMaterno,
                           String telefono,
                           String email,
                           String direccion,
                           MultipartFile archivo) throws IOException;
}
