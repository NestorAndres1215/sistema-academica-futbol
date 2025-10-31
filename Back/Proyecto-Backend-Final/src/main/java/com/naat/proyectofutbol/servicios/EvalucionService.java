package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.EvaluacionDevDTO;
import com.naat.proyectofutbol.entidades.*;

import java.util.List;

public interface EvalucionService {

    List<Evaluacion> listaEvaluacion();
    List<EvaluacionDev> listaEvaluacionDetalle();
    List<EvaluacionDev> actualizar(List<EvaluacionDevDTO> evaluacionDevDTOS) throws Exception;
    List<EvaluacionDev> findByConteo(String conteo);
    int desactivar(String conteo);
    List<EvaluacionDev>  desactivar(String clase, String conteo);
    List<EvaluacionDev> findByEquipo(String clase);
    List<EvaluacionDev> findByEquipoAndConteo(String clase, String conteo);

}
