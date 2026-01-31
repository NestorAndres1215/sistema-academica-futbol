package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.General;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneralRepository extends JpaRepository<General, String> {

    @Query(value = "SELECT MAX(tl_codigo) FROM General", nativeQuery = true)
    String obtenerUltimoCodigo();

    boolean existsByCodigo(String codigo);

    boolean existsByClave(String clave);

    boolean existsByDescripcion1(String descripcion1);

    List<General> findByEstadoTrue();
     List<General> findByCodigo(String generalCodigo);
    List<General> findByEstadoFalse();
}
