package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EjercicioRepository extends JpaRepository<Ejercicio,String> {
    @Query(value = "SELECT MAX(ej_codigo) FROM ejercicios", nativeQuery = true)
    String obtenerUltimoCodigo();

}
