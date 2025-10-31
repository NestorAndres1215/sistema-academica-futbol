package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.entidades.Estudiante;
import com.naat.proyectofutbol.entidades.Partido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface PartidoRepository extends JpaRepository<Partido,String> {

    @Query(value = "SELECT MAX(pat_codigo) FROM Partido", nativeQuery = true)
    String obtenerUltimoCodigoPartido();
    List<Partido> findByEstadoTrue();
    List<Partido> findByEstadoFalse();
    boolean existsByFechaAndHoraAndEquipo(LocalDate fecha, LocalTime hora, Equipo equipo);


}
