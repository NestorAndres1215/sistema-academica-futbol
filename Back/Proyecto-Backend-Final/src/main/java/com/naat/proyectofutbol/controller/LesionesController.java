package com.naat.proyectofutbol.controller;



import com.naat.proyectofutbol.dto.DetalleLesionRequest;
import com.naat.proyectofutbol.dto.request.LesionesRequest;
import com.naat.proyectofutbol.model.Lesiones;
import com.naat.proyectofutbol.model.LesionesDev;

import com.naat.proyectofutbol.service.LesionesService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
        return lesionesService.listarActivos();
    }

    @GetMapping("/listar/dev/activo")
    public List<LesionesDev> listarActivadoDev() {
        return lesionesService.listarDetalle();
    }

    @PostMapping("/registrar")
    public ResponseEntity<Lesiones> registrar(@Valid  @RequestBody LesionesRequest lesionesDTO) {
        return ResponseEntity.ok(lesionesService.registrarLesiones(lesionesDTO));
    }

    @PostMapping("/dev/registrar")
    public ResponseEntity<LesionesDev>registrarDetalle(@Valid @RequestBody DetalleLesionRequest lesionesDTO) {
        return ResponseEntity.ok(lesionesService.registrarLesionesDev(lesionesDTO));
    }
}
