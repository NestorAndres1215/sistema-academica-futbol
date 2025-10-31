package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.EstudianteDTO;
import com.naat.proyectofutbol.entidades.Estudiante;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface EstudianteService {
    List<Estudiante> findProfesorByEstadoTrue();
    List<Estudiante> findProfesorByEstadoFalse();
    Estudiante guardarEstudianter(EstudianteDTO estudianteDTO) throws Exception;
    Estudiante actualizarEstudiante(EstudianteDTO estudianteDTO) throws Exception;
    String obtenerUltimoCodigoEstudiante();
    String ObtenerUltimoCodigoUsuario ();
    boolean telefonoEsValido(String telefono);
    boolean correoEsValido(String correo);
    boolean dniEsValido(String dni);
    boolean ExistePorEmail(String email);
    boolean ExistePorTelefono(String telefono);
    boolean ExistePorDNI(String dni);
    Estudiante desactivar(String usuarioCodigo);
    Estudiante activar(String usuarioCodigo);
    List<Estudiante> reEstudiantes(List<EstudianteDTO> estudianteDTOS) throws Exception;
    List<Estudiante> listar();
    List<Estudiante> getAdminsByUsuarioCodigo(String usuarioCodigo);

    Estudiante actualizarImagen(String codigoUsuario,
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
