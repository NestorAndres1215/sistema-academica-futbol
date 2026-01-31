package com.naat.proyectofutbol.controller;


import com.naat.proyectofutbol.dto.request.AsignacionRequest;
import com.naat.proyectofutbol.dto.request.AsignacionEstudianteRequest;
import com.naat.proyectofutbol.dto.request.EquipoRequest;
import com.naat.proyectofutbol.model.Equipo;
import com.naat.proyectofutbol.model.EquipoDev;
import com.naat.proyectofutbol.service.EquipoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/equipo")
@RequiredArgsConstructor
public class EquipoController {

    private final EquipoService equipoService;

    @GetMapping("/listar/activo")
    public List<Equipo> listaractivados() {
        return equipoService.listaractivados();
    }

    @GetMapping("/listar/desactivado")
    public List<Equipo> listaractivos() {
        return equipoService.listardesactivados();
    }

    @PostMapping("/registrar")
    public ResponseEntity<Equipo> registrar(@Valid @RequestBody EquipoRequest equipoDTO) {
        return ResponseEntity.ok(equipoService.registrar(equipoDTO));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Equipo> actualizar(@Valid @RequestBody EquipoRequest equipoDTO) {
        return ResponseEntity.ok(equipoService.actualizar(equipoDTO));
    }

    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<Equipo> desactivar(@PathVariable String codigo) {
        return ResponseEntity.ok(equipoService.desactivar(codigo));
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<Equipo> activar(@PathVariable String codigo) {
        return ResponseEntity.ok(equipoService.activar(codigo));
    }


    @PostMapping("/asignacion/registrar")
    public ResponseEntity<List<EquipoDev>> registrarAsignacion(@Valid @RequestBody List<AsignacionRequest> asignacionDTO) {
        return ResponseEntity.ok(equipoService.regEquipo(asignacionDTO));
    }

    @GetMapping("/listar/equipodev/activo")
    public List<EquipoDev> listarEquipoDevActivados() {
        return equipoService.listarEquipoDevActivados();
    }

    @DeleteMapping("/asignacion/eliminar/{id}")
    public ResponseEntity<EquipoDev> deleteItem(@PathVariable String codigo) {
            return ResponseEntity.ok(equipoService.eliminarEquipo(codigo));
    }

    @PutMapping("/asignacion/actualizar")
    public ResponseEntity<List<EquipoDev>> actualizar(@Valid @RequestBody List<AsignacionEstudianteRequest> asignacionEstudiantes) {
            return ResponseEntity.ok(equipoService.actualizarEquipoEstudiante(asignacionEstudiantes));
    }

    @GetMapping("/listar")
    public List<EquipoDev> listar() {
        return equipoService.listar();
    }

}
