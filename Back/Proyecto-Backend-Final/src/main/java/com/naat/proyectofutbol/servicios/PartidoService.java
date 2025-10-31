package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.PartidoDTO;
import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.entidades.Partido;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface PartidoService {
    List<Partido> findAdminsByEstadoTrue();
    List<Partido> findAdminsByEstadoFalse();
    List<Partido> listar();
    String obtenerUltimoCodigoPartido();
    Partido RegistrarPartido (PartidoDTO partidoDTO);
    Partido actualizarPartido(PartidoDTO partidoDTO);
Partido actualizarPartidoSegundo(PartidoDTO partidoDTO);
    boolean existsByFechaAndHoraAndEquipo(LocalDate fecha, LocalTime hora, Equipo equipo);
}
