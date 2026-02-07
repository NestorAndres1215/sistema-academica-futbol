package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.EquipoDev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EquipoDevRepository extends JpaRepository<EquipoDev,String> {

    @Query(value = "SELECT MAX(ed_codigo) FROM EquipoDev", nativeQuery = true)

    String obtenerUltimoCodigoDev();

    List<EquipoDev> findByEstadoTrue();

}
