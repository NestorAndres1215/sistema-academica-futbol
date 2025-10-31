package com.naat.proyectofutbol.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.naat.proyectofutbol.entidades.Cargo;

import java.util.List;

public interface CargoRepository extends JpaRepository<Cargo,String> {
    @Query(value = "SELECT MAX(cg_codigo) FROM Cargo", nativeQuery = true)
    String obtenerUltimoCodigo();
    List<Cargo> findByEstadoTrue();
    List<Cargo> findByEstadoFalse();
    boolean existsByNombre(String nombre);
}