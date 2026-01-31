package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.Lesiones;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


public interface LesionesRepository extends JpaRepository<Lesiones, String> {

    @Query(value = "SELECT MAX(le_codigo) FROM lesiones", nativeQuery = true)
    String obtenerUltimoCodigo();

    List<Lesiones> findByEstadoTrue();

    List<Lesiones> findByEstadoFalse();

    List<Lesiones> findByGravedad(String gravedad);

    List<Lesiones> findByGravedadAndEstadoTrue(String gravedad);

    List<Lesiones> findByGravedadAndEstadoFalse(String gravedad);

    List<Lesiones> findByEstudiante_Codigo(String codigoEstudiante);

    List<Lesiones> findByFechaRecuperacion(LocalDate fechaRecuperacion);

    List<Lesiones> findByFechaRecuperacionAfter(LocalDate fecha);

    List<Lesiones> findByFechaRecuperacionBefore(LocalDate fecha);

    List<Lesiones> findByFechaRecuperacionBetween(LocalDate inicio, LocalDate fin);


}
