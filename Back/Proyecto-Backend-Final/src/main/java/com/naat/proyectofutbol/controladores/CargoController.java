package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Cargo;
import com.naat.proyectofutbol.servicios.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        try {
            return ResponseEntity.ok(cargoService.guardarCargo(cargo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/actualizar-cargo")
    public ResponseEntity<?> actualizarCargo(@RequestBody Cargo cargo) {
        try {
            return ResponseEntity.ok(cargoService.actualizarCargo(cargo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }


    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(cargoService.desactivarSede(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(cargoService.activarSede(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/listar/{nombre}")
    public List<Cargo> buscarPorNombre(@PathVariable("nombre") String nombre) {
        return cargoService.findByNombre(nombre);
    }


}