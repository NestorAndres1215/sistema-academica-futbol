package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.model.Cargo;
import com.naat.proyectofutbol.service.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cargo")
@RequiredArgsConstructor
public class CargoController {


    private final CargoService cargoService;

    @GetMapping("/listar/cargo/activo")
    public List<Cargo> getAdminsByEstadoTrue() {
        return cargoService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/cargo/desactivado")
    public List<Cargo> getAdminsByEstadoFalse() {
        return cargoService.findAdminsByEstadoFalse();
    }

    @PostMapping("/guardar-cargo")
    public ResponseEntity<?> guardarCargo(@RequestBody Cargo cargo) {
        return ResponseEntity.ok(cargoService.guardarCargo(cargo));
    }

    @PutMapping("/actualizar-cargo")
    public ResponseEntity<?> actualizarCargo(@RequestBody Cargo cargo) {
        return ResponseEntity.ok(cargoService.actualizarCargo(cargo));
    }


    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(cargoService.desactivarCargo(codigo));
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(cargoService.activarSede(codigo));
    }

    @GetMapping("/listar/{nombre}")
    public Cargo buscarPorNombre(@PathVariable("nombre") String nombre) {
        return cargoService.findByNombre(nombre);
    }


}