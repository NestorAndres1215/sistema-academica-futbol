package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Sede;
import com.naat.proyectofutbol.servicios.SedeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/sede")
public class SedeController {

    @Autowired
    private SedeService sedeService;

    @GetMapping("/listar")
    public ResponseEntity<List<Sede>> listarAdmin() {
        List<Sede> admin = sedeService.listarSedes();
        return ResponseEntity.ok(admin);
    }

    @PostMapping("/guardar-sede")
    public ResponseEntity<?> guardarAdmin(@RequestBody Sede sede) throws Exception {
        try {

            return ResponseEntity.ok( sedeService.guardarSede(sede));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/actualizar-sede")
    public ResponseEntity<?> actualizarAdmin(@RequestBody Sede sede) throws Exception {
        try {
            return ResponseEntity.ok(sedeService.actualizarSede(sede));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }



    @GetMapping("/listar/estado/activo")
        public List<Sede> getAdminsByEstadoTrue() {
        return sedeService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Sede> getAdminsByEstadoFalse() {
        return sedeService.findAdminsByEstadoFalse();
    }


    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(sedeService.desactivarSede(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(sedeService.activarSede(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
