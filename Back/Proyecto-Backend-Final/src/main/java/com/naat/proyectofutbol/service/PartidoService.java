package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.PartidoRequest;
import com.naat.proyectofutbol.model.Partido;

import java.util.List;

public interface PartidoService {

    List<Partido> listar();

    List<Partido> findByEstadoTrue();

    List<Partido> findByEstadoFalse();

    Partido registrarPartido(PartidoRequest partidoDTO);

    Partido actualizarPartido(PartidoRequest partidoDTO);

    Partido actualizarPartidoSegundo(PartidoRequest partidoDTO);


}
