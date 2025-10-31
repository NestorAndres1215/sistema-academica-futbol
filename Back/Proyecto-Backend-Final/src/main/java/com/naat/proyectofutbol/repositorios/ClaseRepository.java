package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Clase;
import com.naat.proyectofutbol.entidades.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface ClaseRepository extends JpaRepository<Clase,String> {
    @Query(value = "SELECT MAX(cl_codigo) FROM clase", nativeQuery = true)
    String obtenerUltimoCodigo();
    List<Clase> findByEstadoTrue();
    List<Clase> findByEstadoFalse();
    boolean existsByInicioAndFinAndHorarioAndDia(
            LocalDate inicio, LocalDate fin, Horario horario, String dia
    );

}
