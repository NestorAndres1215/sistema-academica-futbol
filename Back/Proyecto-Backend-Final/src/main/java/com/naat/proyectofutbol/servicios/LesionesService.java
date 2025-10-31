package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.DetalleLesionDTO;
import com.naat.proyectofutbol.dto.LesionesDTO;
import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.entidades.EquipoDev;
import com.naat.proyectofutbol.entidades.Lesiones;
import com.naat.proyectofutbol.entidades.LesionesDev;

import java.util.List;

public interface LesionesService {
    List<Lesiones> findAdminsByEstadoTrue();
    List<Lesiones> findAdminsByEstadoFalse();
    List<LesionesDev> listar();
    Lesiones registrarLesiones(LesionesDTO lesionesDTO);
    String obtenerUltimoCodigo();
    EquipoDev desactivar(String usuarioCodigo);
    LesionesDev registrarLesionesDev(DetalleLesionDTO detalleLesionDTO );
}
