package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.dto.request.GeneralDevRequest;
import com.naat.proyectofutbol.model.General;
import com.naat.proyectofutbol.model.GeneralDev;
import com.naat.proyectofutbol.service.GeneralService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/general")
@RequiredArgsConstructor
public class GeneralController {


    private final GeneralService generalService;

    @GetMapping("/tablaGenerales/listar/activo")
    public List<General> getAdminsByEstadoTrue() {
        return generalService.findGeneralByEstadoTrue();
    }

    @GetMapping("/tablaGenerales/listar/desactivado")
    public List<General> getAdminsByEstadoFalse() {
        return generalService.findGeneralByEstadoFalse();
    }

    @PostMapping("/tablaGenerales/guardar")
    public ResponseEntity<General> guardarGeneral(@RequestBody General general) {
        return ResponseEntity.ok(generalService.guardarGeneral(general));
    }

    @PutMapping("/tablaGenerales/actualizar")
    public ResponseEntity<General> actualizarGeneral(@RequestBody General general) {
        return ResponseEntity.ok(generalService.actualizarGeneral(general));
    }

    @DeleteMapping("/tablaGenerales/desactivar/{codigo}")
    public ResponseEntity<List<GeneralDev>> desactivarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(generalService.cambiarListaGen(codigo, false));
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<List<GeneralDev>> activarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(generalService.cambiarListaGen(codigo, true));
    }


    @GetMapping("/gendev/listar/activo/{codigo}")
    public List<GeneralDev> listarGenDevTrue(@PathVariable String codigo) {
        return generalService.findGeneralDevByEstadoTrueAndCodigo(codigo);
    }

    @GetMapping("/gendev/listar/desactivado")
    public List<GeneralDev> listarGenDevFalse() {
        return generalService.findGeneralDevByEstadoFalse();
    }

    @PostMapping("/genDev/guardar")
    public ResponseEntity<?> guardarGenDev(@Valid @RequestBody GeneralDevRequest general) {
        return ResponseEntity.ok(generalService.guardarGeneralDev(general));
    }

    @PutMapping("/genDev/actualizar")
    public ResponseEntity<?> actualizarGenDev(@Valid @RequestBody GeneralDevRequest general) {
        return ResponseEntity.ok(generalService.actualizarGeneralDev(general));
    }

    @DeleteMapping("/desactivarGeneral/{codigo}")
    public ResponseEntity<?> desactivarPorCodigoGeneral(@PathVariable String codigo) {
        return ResponseEntity.ok(generalService.cambiarEstadoGenerales(codigo, false));
    }

    @DeleteMapping("/activarGeneral/{codigo}")
    public ResponseEntity<?> activarPorCodigoGeneral(@PathVariable String codigo) {
        return ResponseEntity.ok(generalService.cambiarEstadoGenerales(codigo, true));
    }

    @DeleteMapping("/desactivarGeneralDev/{codigo}")
    public ResponseEntity<GeneralDev> desactivarPorCodigoGeneral1(@PathVariable String codigo) {
        return ResponseEntity.ok(generalService.cambiarEstadoGen(codigo, false));
    }

    @DeleteMapping("/activarGeneralDev/{codigo}")
    public ResponseEntity<GeneralDev> activarPorCodigoGeneral1(@PathVariable String codigo) {
        return ResponseEntity.ok(generalService.cambiarEstadoGen(codigo, true));
    }

}
