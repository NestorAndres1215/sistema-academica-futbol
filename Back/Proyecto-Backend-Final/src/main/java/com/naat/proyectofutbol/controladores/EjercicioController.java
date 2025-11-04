package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.EjercicioDTO;
import com.naat.proyectofutbol.entidades.Ejercicio;
import com.naat.proyectofutbol.servicios.EjercicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ejercicio")
public class EjercicioController {
    @Autowired
    private EjercicioService ejercicioService;
    @GetMapping("/listar")
    public List<Ejercicio> LISTAR() {
        return ejercicioService.lista();
    }


    @PostMapping("/registrar")
    public ResponseEntity<?> REGISTRAR(@RequestBody EjercicioDTO ejercicioDTO) {
        try {
            return ResponseEntity.ok(ejercicioService.registrar(ejercicioDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping ("/actualizar")
    public ResponseEntity<?> ACTUALIZAR(@RequestBody EjercicioDTO ejercicioDTO) {
        try {
            return ResponseEntity.ok(ejercicioService.actualizar(ejercicioDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
