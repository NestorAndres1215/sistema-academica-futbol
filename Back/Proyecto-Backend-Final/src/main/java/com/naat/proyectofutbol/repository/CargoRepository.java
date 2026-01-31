package com.naat.proyectofutbol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.naat.proyectofutbol.model.Cargo;

import java.util.List;
import java.util.Optional;

public interface CargoRepository extends JpaRepository<Cargo, String> {

    @Query(value = "SELECT MAX(cg_codigo) FROM Cargo", nativeQuery = true)
    String obtenerUltimoCodigo();

    List<Cargo> findByEstadoTrue();

    List<Cargo> findByEstadoFalse();

    Optional<Cargo> findByNombre(String nombre);
}