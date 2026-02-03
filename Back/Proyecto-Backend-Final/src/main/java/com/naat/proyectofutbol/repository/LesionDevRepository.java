package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.LesionesDev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


public interface LesionDevRepository extends JpaRepository<LesionesDev,String>
{
    @Query(value = "SELECT MAX(dl_codigo) FROM lesiondev", nativeQuery = true)
    String obtenerUltimoCodigo();
}
