package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface HorarioRepository extends JpaRepository<Horario,String> {
    @Query(value = "SELECT MAX(hor_codigo) FROM horario", nativeQuery = true)
    String obtenerUltimoCodigo();
    List<Horario> findByEstadoTrue();
    List<Horario> findByEstadoFalse();

    @Query("SELECT CASE WHEN COUNT(h) > 0 THEN true ELSE false END " +
            "FROM Horario h " +
            "WHERE h.inicioHora = :inicioHora AND h.finHora = :finHora")
    boolean existsByInicioHoraAndFinHora(@Param("inicioHora") LocalTime inicioHora,
                                         @Param("finHora") LocalTime finHora);
}
