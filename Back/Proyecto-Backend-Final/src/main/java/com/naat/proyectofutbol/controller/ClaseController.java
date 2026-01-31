package com.naat.proyectofutbol.controller;


import com.naat.proyectofutbol.dto.request.ClaseDevRequest;
import com.naat.proyectofutbol.dto.request.ClaseRequest;
import com.naat.proyectofutbol.model.Clase;
import com.naat.proyectofutbol.model.ClaseDev;
import com.naat.proyectofutbol.service.ClaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/clase")
@RequiredArgsConstructor
public class ClaseController {

    private final ClaseService claseService;


    @GetMapping("/listar/activo")
    public List<Clase> listarAcitvos() {
        return claseService.listaractivados();
    }

    @GetMapping("/listar/desactivado")
    public List<Clase> listarDesactivos() {
        return claseService.listardesactivados();
    }

    @PostMapping("/registrar")
    public ResponseEntity<Clase> regitrar(@Valid @RequestBody ClaseRequest claseDTO) {
        return ResponseEntity.ok(claseService.registrar(claseDTO));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Clase> actualizar(@Valid @RequestBody ClaseRequest claseDTO) {
        return ResponseEntity.ok(claseService.actualizar(claseDTO));
    }

    @GetMapping("/listar/dev/activo")
    public List<ClaseDev> listarActivosDev() {
        return claseService.listarDevactivados();
    }

    @PostMapping("/dev/registrar")
    public ResponseEntity<ClaseDev> registrarDev(@Valid @RequestBody ClaseDevRequest claseDevDTO) {
        return ResponseEntity.ok(claseService.registrardev(claseDevDTO));
    }

    @PutMapping("/dev/actualizar")
    public ResponseEntity<ClaseDev> actualizarDev(@Valid @RequestBody ClaseDevRequest claseDTO) {
        return ResponseEntity.ok(claseService.actualizardev(claseDTO));
    }
}
