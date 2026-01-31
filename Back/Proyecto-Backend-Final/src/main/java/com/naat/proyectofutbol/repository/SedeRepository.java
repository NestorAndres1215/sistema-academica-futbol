package com.naat.proyectofutbol.repository;


import com.naat.proyectofutbol.model.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface SedeRepository extends JpaRepository<Sede, String> {

    List<Sede> findByEstadoTrue();

    List<Sede> findByEstadoFalse();

    Optional<Sede> findByNombre(String nombre);

    @Query(value = "SELECT MAX(se_codigo) FROM Sede", nativeQuery = true)
    String obtenerUltimoCodigo();

    Optional<Sede> findByTelefono(String telefono);
}
