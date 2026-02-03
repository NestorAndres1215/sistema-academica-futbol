package com.naat.proyectofutbol.controller;


import com.naat.proyectofutbol.dto.DetalleLesionRequest;
import com.naat.proyectofutbol.dto.request.LesionesRequest;
import com.naat.proyectofutbol.model.Lesiones;
import com.naat.proyectofutbol.model.LesionesDev;

import com.naat.proyectofutbol.service.LesionesService;
import lombok.RequiredArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lesiones")
@RequiredArgsConstructor
public class LesionesController {

    private final LesionesService lesionesService;

    @GetMapping("/listar/activo")
    public List<Lesiones> listarActivado() {
        return lesionesService.listarActivos();
    }

    @GetMapping("/listar/desactivado")
    public List<Lesiones> listarDesactivado() {
        return lesionesService.listarInactivos();
    }

    @GetMapping("/listar/dev/activo")
    public List<LesionesDev> listarActivadoDev() {
        return lesionesService.listarDetalle();
    }

    @PostMapping("/registrar")
    public ResponseEntity<Lesiones> registrar(@Valid @RequestBody LesionesRequest lesionesDTO) {
        return ResponseEntity.ok(lesionesService.registrarLesiones(lesionesDTO));
    }

    @PostMapping("/dev/registrar")
    public ResponseEntity<LesionesDev> registrarDetalle(@Valid @RequestBody DetalleLesionRequest lesionesDTO) {
        return ResponseEntity.ok(lesionesService.registrarLesionesDev(lesionesDTO));
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<Optional<Lesiones>> buscarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(lesionesService.buscarPorCodigo(codigo));
    }

    @GetMapping("/gravedad/{gravedad}")
    public ResponseEntity<List<Lesiones>> listarPorGravedad(@PathVariable String gravedad) {
        return ResponseEntity.ok(lesionesService.listarPorGravedad(gravedad));
    }

    @GetMapping("/estudiante/{codigo}")
    public ResponseEntity<List<Lesiones>> listarPorEstudiante(@PathVariable String codigo) {
        return ResponseEntity.ok(lesionesService.listarPorEstudiante(codigo));
    }

    @GetMapping("/recuperacion/{fecha}")
    public ResponseEntity<List<Lesiones>> listarPorFechaRecuperacion(@PathVariable String fecha) {
        LocalDate fechaRec = LocalDate.parse(fecha);
        return ResponseEntity.ok(lesionesService.listarPorFechaRecuperacion(fechaRec));
    }

    @GetMapping("/recuperacion/rango")
    public ResponseEntity<List<Lesiones>> listarPorRangoRecuperacion(@RequestParam String inicio, @RequestParam String fin) {
        LocalDate fechaInicio = LocalDate.parse(inicio);
        LocalDate fechaFin = LocalDate.parse(fin);
        return ResponseEntity.ok(lesionesService.listarPorRangoRecuperacion(fechaInicio, fechaFin));
    }

    @GetMapping("/activas/{gravedad}")
    public ResponseEntity<List<Lesiones>> listarActivas(@PathVariable String gravedad) {
        return ResponseEntity.ok(lesionesService.listarPorGravedadActivas(gravedad));
    }

    @GetMapping("/inactivas/{gravedad}")
    public ResponseEntity<List<Lesiones>> listarInactivas(@PathVariable String gravedad) {
        return ResponseEntity.ok(lesionesService.listarPorGravedadInactivas(gravedad));
    }

    @GetMapping("/recuperacion/despues/{fecha}")
    public ResponseEntity<List<Lesiones>> listarDespuesDeFecha(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(lesionesService.findByFechaRecuperacionAfter(fecha));
    }

    @GetMapping("/recuperacion/antes/{fecha}")
    public ResponseEntity<List<Lesiones>> listarAntesDeFecha(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(lesionesService.findByFechaRecuperacionBefore(fecha));
    }
}
