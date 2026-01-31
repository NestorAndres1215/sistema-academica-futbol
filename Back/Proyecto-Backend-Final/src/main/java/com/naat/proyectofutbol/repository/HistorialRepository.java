package com.naat.proyectofutbol.repository;

import com.naat.proyectofutbol.model.Historial;
import com.naat.proyectofutbol.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistorialRepository extends JpaRepository<Historial,String> {
    @Query("SELECT h FROM Historial h WHERE h.usuario = :usuario")
    List<Historial> findByUsuario(Usuario usuario);

    @Query(value = "SELECT MAX(hu_codigo) FROM historialusuario", nativeQuery = true)
    String obtenerUltimoCodigo();
}
