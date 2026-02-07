package com.naat.proyectofutbol.controller;



import com.naat.proyectofutbol.dto.request.EjercicioRequest;
import com.naat.proyectofutbol.model.Ejercicio;
import com.naat.proyectofutbol.service.EjeciciosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/ejercicio")
@RequiredArgsConstructor
public class EjercicioController {

    private final EjeciciosService ejercicioService;

    @GetMapping("/listar")
    public List<Ejercicio> LISTAR() {
        return ejercicioService.lista();
    }


    @PostMapping("/registrar")
    public ResponseEntity<Ejercicio> REGISTRAR(@Valid @RequestBody EjercicioRequest ejercicioDTO) {
        return ResponseEntity.ok(ejercicioService.registrar(ejercicioDTO));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Ejercicio> ACTUALIZAR(@Valid @RequestBody EjercicioRequest ejercicioDTO) {
        return ResponseEntity.ok(ejercicioService.actualizar(ejercicioDTO));
    }



}
