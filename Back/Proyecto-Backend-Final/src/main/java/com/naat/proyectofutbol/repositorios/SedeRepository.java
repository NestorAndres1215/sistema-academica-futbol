package com.naat.proyectofutbol.repositorios;


import com.naat.proyectofutbol.entidades.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface SedeRepository extends JpaRepository<Sede,String> {

    List<Sede> findByEstadoTrue();
        List<Sede> findByEstadoFalse();
    @Query(value = "SELECT MAX(se_codigo) FROM Sede", nativeQuery = true)
    String obtenerUltimoCodigo();
    boolean existsByTelefono(String telefono);

}
