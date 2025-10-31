package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.EvaluacionDev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluacionDevRepository extends JpaRepository<EvaluacionDev,String> {
    @Query(value = "SELECT MAX(de_codigo) FROM EvaluacionDev", nativeQuery = true)
    String obtenerUltimoCodigo();
    @Query(value = "SELECT MAX(de_conteo) FROM EvaluacionDev", nativeQuery = true)
    String obtenerUltimoConteo();
    List<EvaluacionDev> findByConteo(String conteo);
    List<EvaluacionDev> findByEquipoAndConteo(String clase, String conteo);
    List<EvaluacionDev> findByEquipo(String clase);
}
