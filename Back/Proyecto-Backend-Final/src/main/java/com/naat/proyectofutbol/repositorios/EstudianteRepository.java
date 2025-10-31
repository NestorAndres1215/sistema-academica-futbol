package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante,String> {
    @Query(value = "SELECT MAX(es_codigo) FROM Estudiante", nativeQuery = true)
    String obtenerUltimoCodigoEstudiante();
    @Query(value = "SELECT MAX(us_codigo) FROM Usuario", nativeQuery = true)
    String obtenerUltimoCodigoUsuario();
    boolean existsByCorreo(String correo);
    List<Estudiante> findByUsuario_Codigo(String usuarioCodigo);
    boolean existsByTelefono(String telefono);
    boolean existsByDni(String dni);
    List<Estudiante> findByEstadoTrue();
    List<Estudiante> findByEstadoFalse();
    Optional<Estudiante> findByPrimerNombreAndApellidoPaternoAndApellidoMaterno(String nombre, String apellidoPaterno,String apellidoMaterno);
}
