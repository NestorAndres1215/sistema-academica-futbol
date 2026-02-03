package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface GeneralRepository extends JpaRepository<General, String> {

    @Query(value = "SELECT MAX(tl_codigo) FROM General", nativeQuery = true)
    String obtenerUltimoCodigo();

    boolean existsByClave(String clave);

    boolean existsByDescripcion1(String descripcion1);

    List<General> findByEstadoTrue();

    List<General> findByClave(String clave);

    List<General> findByDescripcion1(String descripcion1);

    List<General> findByClaveAndEstadoTrue(String clave);

    List<General> findByClaveAndEstadoFalse(String clave);

    List<General> findByCodigo(String generalCodigo);

    List<General> findByEstadoFalse();
}
