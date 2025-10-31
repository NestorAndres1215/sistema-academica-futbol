package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.naat.proyectofutbol.entidades.Profesor;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, String> {

    List<Profesor> findByUsuario_Codigo(String usuarioCodigo);
    @Query(value = "SELECT MAX(pr_codigo) FROM Profesor", nativeQuery = true)
    String obtenerUltimoCodigoProfesor();
    @Query(value = "SELECT MAX(us_codigo) FROM Usuario", nativeQuery = true)
    String obtenerUltimoCodigoUsuario();
    boolean existsByCorreo(String correo);
    boolean existsByTelefono(String telefono);
    boolean existsByDni(String dni);
    List<Profesor> findByEstadoTrue();
    List<Profesor> findByEstadoFalse();
    Optional<Profesor> findByPrimerNombreAndApellidoPaternoAndApellidoMaterno(String nombre, String apellidoPaterno, String apellidoMaterno);
}
