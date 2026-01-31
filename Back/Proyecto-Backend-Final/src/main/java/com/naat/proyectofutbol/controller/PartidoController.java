package com.naat.proyectofutbol.controller;


import com.naat.proyectofutbol.dto.request.PartidoRequest;

import com.naat.proyectofutbol.model.Partido;
import com.naat.proyectofutbol.service.PartidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/partido")
@RequiredArgsConstructor
public class PartidoController {

    private final PartidoService partidoService;

    @GetMapping("/listar/activo")
    public List<Partido> listarActivado() {
        return partidoService.findByEstadoTrue();
    }

    @GetMapping("/listar/desactivado")
    public List<Partido> listarDesactivado() {
        return partidoService.findByEstadoFalse();
    }

    @PostMapping("/guardar")
    public ResponseEntity<Partido> guardarProfesor(@Valid @RequestBody PartidoRequest partidoDTO) throws Exception {
        return ResponseEntity.ok(partidoService.registrarPartido(partidoDTO));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Partido> actualizarProfesor(@Valid @RequestBody PartidoRequest partidoDTO) throws Exception {
        return ResponseEntity.ok(partidoService.actualizarPartido(partidoDTO));
    }

    @PutMapping("/actualizar/desactivado")
    public ResponseEntity<Partido> actualizarProfesorDesa(@Valid @RequestBody PartidoRequest partidoDTO) throws Exception {
        return ResponseEntity.ok(partidoService.actualizarPartidoSegundo(partidoDTO));
    }
}
