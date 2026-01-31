package com.naat.proyectofutbol.controller;


import com.naat.proyectofutbol.dto.request.EvaluacionDevRequest;
import com.naat.proyectofutbol.model.Evaluacion;
import com.naat.proyectofutbol.model.EvaluacionDev;


import com.naat.proyectofutbol.service.EvaluacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluacion")
@RequiredArgsConstructor
public class EvaluacionController {

    private final EvaluacionService evalucionService;

    @GetMapping("/listar")
    public List<Evaluacion> listar() {
        return evalucionService.listaEvaluacion();
    }

    @GetMapping("/listar/Detalle")
    public List<EvaluacionDev> listarDetalle() {
        return evalucionService.listaEvaluacionDetalle();
    }

    @GetMapping("/conteo/{conteo}")
    public List<EvaluacionDev> listarPorConteo(@PathVariable String conteo) {
        return evalucionService.findByConteo(conteo);
    }

    @GetMapping("/equipo/{equipo}")
    public List<EvaluacionDev> listarPorEquipo(@PathVariable String equipo) {
        return evalucionService.findByEquipo(equipo);
    }

    @GetMapping("/listar/{equipo}/{conteo}")
    public List<EvaluacionDev> listarPorEquipoConteo(@PathVariable String equipo, @PathVariable String conteo) {
        return evalucionService.findByEquipoAndConteo(equipo, conteo);
    }

    @PutMapping("/actualizar/detalle")
    public ResponseEntity<List<EvaluacionDev>> actualizar(@RequestBody List<EvaluacionDevRequest> evaluacionDevDTOS) {
        return ResponseEntity.ok(evalucionService.actualizar(evaluacionDevDTOS));
    }

    @PutMapping("/desactivar/{clase}/{conteo}")
    public ResponseEntity<List<EvaluacionDev>> desactivarEvaluaciones(@PathVariable String clase, @PathVariable String conteo) {

        return ResponseEntity.ok(evalucionService.desactivar(clase, conteo));
    }

}
