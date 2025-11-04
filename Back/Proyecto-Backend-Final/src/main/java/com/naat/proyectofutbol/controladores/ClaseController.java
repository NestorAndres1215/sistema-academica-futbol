package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.ClaseDTO;
import com.naat.proyectofutbol.dto.ClaseDevDTO;
import com.naat.proyectofutbol.entidades.Clase;
import com.naat.proyectofutbol.entidades.ClaseDev;
import com.naat.proyectofutbol.servicios.ClaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clase")
public class ClaseController {
    @Autowired
    private ClaseService claseService;


    @GetMapping("/listar/activo")
    public List<Clase> LISTARACTIVOS() {
        return claseService.listaractivados();
    }

    @GetMapping("/listar/desactivado")
    public List<Clase> LISTARDESACTIVADOS() {
        return claseService.listardesactivados();
    }
    @PostMapping("/registrar")
    public ResponseEntity<?> REGISTRAR(@RequestBody ClaseDTO claseDTO) {
        try {
            return ResponseEntity.ok(claseService.registrar(claseDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping ("/actualizar")
    public ResponseEntity<?> ACTUALIZAR(@RequestBody ClaseDTO claseDTO) {
        try {
            return ResponseEntity.ok(claseService.actualizar(claseDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/listar/dev/activo")
    public List<ClaseDev> LISTARACTIVO() {
        return claseService.listarDevactivados();
    }
    @PostMapping("/dev/registrar")
    public ResponseEntity<?> REGISTRARDEV(@RequestBody ClaseDevDTO claseDevDTO) {
        try {
            return ResponseEntity.ok(claseService.registrardev(claseDevDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping ("/dev/actualizar")
    public ResponseEntity<?> ACTUALIZARDEV(@RequestBody ClaseDevDTO claseDTO) {
        try {
            return ResponseEntity.ok(claseService.actualizardev(claseDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
