package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.Clase;
import com.naat.proyectofutbol.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


public interface ClaseRepository extends JpaRepository<Clase, String> {

    @Query(value = "SELECT MAX(cl_codigo) FROM clase", nativeQuery = true)
    String obtenerUltimoCodigo();

    List<Clase> findByEstadoTrue();

    List<Clase> findByEstadoFalse();

    boolean existsByInicioAndFinAndHorarioAndDia(
            LocalDate inicio, LocalDate fin, Horario horario, String dia
    );

}
