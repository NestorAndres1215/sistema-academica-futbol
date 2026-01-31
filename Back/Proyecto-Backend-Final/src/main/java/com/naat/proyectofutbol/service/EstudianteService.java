package com.naat.proyectofutbol.service;


import com.naat.proyectofutbol.dto.request.EstudianteRequest;
import com.naat.proyectofutbol.model.Estudiante;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EstudianteService {

    List<Estudiante> listar();

    List<Estudiante> findByTelefono(String telefono);

    List<Estudiante> findByDni(String dni);

    List<Estudiante> findByCorreo(String correo);

    List<Estudiante> findByNacionalidad(String nacionalidad);

    List<Estudiante> findByEdad(String edad);

    List<Estudiante> findByApellidoPaterno(String apellidoPaterno);

    List<Estudiante> findByPrimerNombre(String primerNombre);

    List<Estudiante> getAdminsByUsuarioCodigo(String usuarioCodigo);

    List<Estudiante> findProfesorByEstadoTrue();

    List<Estudiante> findProfesorByEstadoFalse();

    Estudiante guardarEstudiante(EstudianteRequest estudianteDTO);

    Estudiante actualizarEstudiante(EstudianteRequest estudianteDTO);

    List<Estudiante> reEstudiantes(List<EstudianteRequest> estudianteDTOS);

    Estudiante actualizarImagen(String codigoUsuario, String codigoAdmin, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String direccion, MultipartFile archivo);

    Estudiante desactivar(String usuarioCodigo);

    Estudiante activar(String usuarioCodigo);
}
