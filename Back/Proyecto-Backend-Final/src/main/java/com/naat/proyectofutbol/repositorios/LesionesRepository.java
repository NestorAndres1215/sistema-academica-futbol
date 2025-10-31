package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Lesiones;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LesionesRepository extends JpaRepository<Lesiones,String>
{
    @Query(value = "SELECT MAX(le_codigo) FROM lesiones", nativeQuery = true)
    String obtenerUltimoCodigo();




    List<Lesiones> findByEstadoTrue();
    List<Lesiones> findByEstadoFalse();
}
