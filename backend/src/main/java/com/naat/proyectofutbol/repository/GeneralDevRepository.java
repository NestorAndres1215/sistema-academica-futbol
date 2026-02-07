package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.GeneralDev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface GeneralDevRepository extends JpaRepository<GeneralDev,String> {
    @Query("SELECT g FROM GeneralDev g WHERE g.general.codigo = :generalCodigo")
    List<GeneralDev> findByGeneralCodigo(@Param("generalCodigo") String generalCodigo);

    @Query(value = "SELECT * FROM gendev WHERE tl_estado = true AND tl_gen = :codigo", nativeQuery = true)
    List<GeneralDev> findByEstadoTrueAndCodigo(@Param("codigo") String codigo);

    @Query(value = "SELECT MAX(tl_codigo) FROM gendev", nativeQuery = true)
    String obtenerUltimoCodigo();

    List<GeneralDev> findByEstadoTrue();

    List<GeneralDev> findByEstadoFalse();
}
