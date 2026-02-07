package com.naat.proyectofutbol.service;



import com.naat.proyectofutbol.dto.DetalleLesionRequest;
import com.naat.proyectofutbol.dto.request.LesionesRequest;
import com.naat.proyectofutbol.model.EquipoDev;
import com.naat.proyectofutbol.model.Lesiones;
import com.naat.proyectofutbol.model.LesionesDev;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LesionesService {

    List<Lesiones> listarActivos();

    List<Lesiones> listarInactivos();

    List<LesionesDev> listarDetalle();

    Lesiones registrarLesiones(LesionesRequest dto);

    LesionesDev registrarLesionesDev(DetalleLesionRequest dto);

    EquipoDev desactivar(String usuarioCodigo);

    Optional<Lesiones> buscarPorCodigo(String codigo);

    List<Lesiones> listarPorGravedad(String gravedad);

    List<Lesiones> listarPorEstudiante(String codigoEstudiante);

    List<Lesiones> listarPorFechaRecuperacion(LocalDate fecha);

    List<Lesiones> listarPorRangoRecuperacion(LocalDate inicio, LocalDate fin);

    List<Lesiones> listarPorGravedadActivas(String gravedad);

    List<Lesiones> listarPorGravedadInactivas(String gravedad);

    List<Lesiones> findByFechaRecuperacionAfter(LocalDate fecha);

    List<Lesiones> findByFechaRecuperacionBefore(LocalDate fecha);
}
