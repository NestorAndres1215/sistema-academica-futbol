package com.naat.proyectofutbol.service;



import com.naat.proyectofutbol.dto.DetalleLesionRequest;
import com.naat.proyectofutbol.dto.request.LesionesRequest;
import com.naat.proyectofutbol.model.EquipoDev;
import com.naat.proyectofutbol.model.Lesiones;
import com.naat.proyectofutbol.model.LesionesDev;

import java.util.List;

public interface LesionesService {

    List<Lesiones> listarActivos();

    List<Lesiones> listarInactivos();

    List<LesionesDev> listarDetalle();

    Lesiones registrarLesiones(LesionesRequest dto);

    LesionesDev registrarLesionesDev(DetalleLesionRequest dto);

    EquipoDev desactivar(String usuarioCodigo);


}
