package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.model.Rol;
import com.naat.proyectofutbol.service.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolService rolService;

    @GetMapping
    public ResponseEntity<List<Rol>> listarTodos() {
        return ResponseEntity.ok(rolService.listarRoles());
    }

    @GetMapping("/listar/{nombre}")
    public ResponseEntity<Rol> listarPorRol(@PathVariable String nombre) {
        return ResponseEntity.ok(rolService.findByRol(nombre));
    }

    @PostMapping("/registrar")
    public ResponseEntity<Rol> crearRol(@RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.registrarRol(rol));
    }

    @PutMapping("/actualizar/{codigo}")
    public ResponseEntity<Rol> actualizarRol(@PathVariable String codigo, @RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.actualizarRol(codigo, rol));
    }


}
