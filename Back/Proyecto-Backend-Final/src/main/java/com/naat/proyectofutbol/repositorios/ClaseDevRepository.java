package com.naat.proyectofutbol.repositorios;



import com.naat.proyectofutbol.entidades.ClaseDev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaseDevRepository extends JpaRepository<ClaseDev,String>{
    @Query(value = "SELECT MAX(cd_codigo) FROM clasedev", nativeQuery = true)
    String obtenerUltimoCodigo();
    List<ClaseDev> findByEstadoTrue();
    List<ClaseDev> findByEstadoFalse();
}
