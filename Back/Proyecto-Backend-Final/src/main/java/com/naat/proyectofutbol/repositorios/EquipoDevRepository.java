package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.EquipoDev;
import com.naat.proyectofutbol.entidades.Lesiones;
import com.naat.proyectofutbol.entidades.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface EquipoDevRepository extends JpaRepository<EquipoDev,String> {
    @Query(value = "SELECT MAX(ed_codigo) FROM EquipoDev", nativeQuery = true)
    String obtenerUltimoCodigoDev();




    List<EquipoDev> findByEstadoTrue();

}
