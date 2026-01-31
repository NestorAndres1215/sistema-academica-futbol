package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.model.Sede;
import com.naat.proyectofutbol.service.SedeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sede")
@RequiredArgsConstructor
public class SedeController {

    private final SedeService sedeService;

    @GetMapping("/listar")
    public ResponseEntity<List<Sede>> listarSedes() {
        return ResponseEntity.ok(sedeService.listarSedes());
    }

    @PostMapping("/guardar")
    public ResponseEntity<Sede> guardarSede(@RequestBody Sede sede) {
        return ResponseEntity.ok(sedeService.guardarSede(sede));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Sede> actualizarSede(@RequestBody Sede sede) {
        return ResponseEntity.ok(sedeService.actualizarSede(sede));
    }

    @GetMapping("/listar/estado/activo")
    public ResponseEntity<List<Sede>> listarActivos() {
        return ResponseEntity.ok(sedeService.findAdminsByEstadoTrue());
    }

    @GetMapping("/listar/estado/desactivado")
    public ResponseEntity<List<Sede>> listarDesactivados() {
        return ResponseEntity.ok(sedeService.findAdminsByEstadoFalse());
    }

    @PutMapping("/desactivar/{codigo}")
    public ResponseEntity<Sede> desactivar(@PathVariable String codigo) {
        return ResponseEntity.ok(sedeService.desactivarSede(codigo));
    }

    @PutMapping("/activar/{codigo}")
    public ResponseEntity<Sede> activar(@PathVariable String codigo) {
        return ResponseEntity.ok(sedeService.activarSede(codigo));
    }

    @GetMapping("/listar/nombre/{nombre}")
    public ResponseEntity<Sede> listarPorNombre(@PathVariable String nombre) {
        return ResponseEntity.ok(sedeService.BuscarNombre(nombre));
    }

}