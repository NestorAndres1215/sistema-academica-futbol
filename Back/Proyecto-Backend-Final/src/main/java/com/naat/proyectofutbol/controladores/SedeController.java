package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Sede;
import com.naat.proyectofutbol.servicios.SedeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sede")
@RequiredArgsConstructor // ✅ Lombok genera constructor e inyecta dependencias
@CrossOrigin(origins = "**")
public class SedeController {

    private final SedeService sedeService; // ✅ Sin @Autowired

    @GetMapping("/listar")
    public ResponseEntity<List<Sede>> listarSedes() {
        return ResponseEntity.ok(sedeService.listarSedes());
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarSede(@RequestBody Sede sede) {
        try {
            return ResponseEntity.ok(sedeService.guardarSede(sede));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar sede: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarSede(@RequestBody Sede sede) {
        try {
            return ResponseEntity.ok(sedeService.actualizarSede(sede));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar sede: " + e.getMessage());
        }
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
    public ResponseEntity<?> desactivar(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(sedeService.desactivarSede(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al desactivar sede: " + e.getMessage());
        }
    }

    @PutMapping("/activar/{codigo}")
    public ResponseEntity<?> activar(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(sedeService.activarSede(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al activar sede: " + e.getMessage());
        }
    }

    @GetMapping("/listar/nombre/{nombre}")
    public ResponseEntity<List<Sede>> listarPorNombre(@PathVariable String nombre) {
        try {
            List<Sede> sedes = sedeService.findByNombre(nombre);
            return ResponseEntity.ok(sedes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}