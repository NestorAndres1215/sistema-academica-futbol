package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluacionRepository extends JpaRepository<Evaluacion,String> {

    @Query(value = "SELECT MAX(ev_codigo) FROM Evaluacion", nativeQuery = true)
    String obtenerUltimoCodigo();

}
