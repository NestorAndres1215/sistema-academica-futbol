package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipoRepository extends JpaRepository<Equipo,String> {
    @Query(value = "SELECT MAX(eq_codigo) FROM Equipo", nativeQuery = true)
    String obtenerUltimoCodigo();
    List<Equipo> findByEstadoTrue();
    List<Equipo> findByEstadoFalse();
}
