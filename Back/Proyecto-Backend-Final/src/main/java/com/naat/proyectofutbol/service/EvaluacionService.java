package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.EvaluacionDevRequest;
import com.naat.proyectofutbol.model.Evaluacion;
import com.naat.proyectofutbol.model.EvaluacionDev;

import java.util.List;

public interface EvaluacionService {

    List<Evaluacion> listaEvaluacion();

    List<EvaluacionDev> listaEvaluacionDetalle();

    List<EvaluacionDev> findByConteo(String conteo);

    List<EvaluacionDev> actualizar(List<EvaluacionDevRequest> evaluacionDevDTOS);

    int desactivar(String conteo);

    List<EvaluacionDev> findByEquipo(String clase);

    List<EvaluacionDev> findByEquipoAndConteo(String clase, String conteo);

    List<EvaluacionDev> desactivar(String equipo, String conteo);
}
