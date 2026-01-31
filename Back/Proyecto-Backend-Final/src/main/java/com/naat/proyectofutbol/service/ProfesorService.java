package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.ProfesorRequest;
import com.naat.proyectofutbol.model.Profesor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProfesorService {

    List<Profesor> listar();

    List<Profesor> findByTelefono(String telefono);

    List<Profesor> findByDni(String dni);

    List<Profesor> findByCorreo(String correo);

    List<Profesor> findByNacionalidad(String nacionalidad);

    List<Profesor> findByEdad(String edad);

    List<Profesor> findByApellidoPaterno(String apellidoPaterno);

    List<Profesor> findByPrimerNombre(String primerNombre);

    List<Profesor> getAdminsByUsuarioCodigo(String usuarioCodigo);

    List<Profesor> findAdminsByEstadoTrue();

    List<Profesor> getAdminsByEstadoFalse();

    Profesor guardarProfesor(ProfesorRequest profesorDTO);

    Profesor actualizarProfesor(ProfesorRequest profesorDTO);

    Profesor desactivar(String usuarioCodigo);

    Profesor activar(String usuarioCodigo);

    List<Profesor> registrarProfesores(List<ProfesorRequest> profesorDTOs);

    Profesor actualizarImagen(String codigoUsuario, String codigoAdmin, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String direccion, MultipartFile archivo);

}
