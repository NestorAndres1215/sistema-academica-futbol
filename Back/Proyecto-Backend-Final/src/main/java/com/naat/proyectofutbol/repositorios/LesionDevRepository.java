package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Lesiones;
import com.naat.proyectofutbol.entidades.LesionesDev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LesionDevRepository extends JpaRepository<LesionesDev,String>
{
    @Query(value = "SELECT MAX(dl_codigo) FROM lesiondev", nativeQuery = true)
    String obtenerUltimoCodigo();
}
