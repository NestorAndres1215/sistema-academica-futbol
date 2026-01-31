package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.Lesiones;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LesionesRepository extends JpaRepository<Lesiones, String> {

    @Query(value = "SELECT MAX(le_codigo) FROM lesiones", nativeQuery = true)
    String obtenerUltimoCodigo();

    List<Lesiones> findByEstadoTrue();

    List<Lesiones> findByEstadoFalse();

}
