package com.naat.proyectofutbol.controladores;


import com.naat.proyectofutbol.dto.GeneralDevDTO;
import com.naat.proyectofutbol.entidades.General;
import com.naat.proyectofutbol.entidades.GeneralDev;
import com.naat.proyectofutbol.servicios.GeneralService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> guardarGeneral(@RequestBody General general) {
        try {
            return ResponseEntity.ok(generalService.guardarGeneral(general));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping("/tablaGenerales/actualizar")
    public ResponseEntity<?> actualizarGeneral(@RequestBody General general) {
        try {

            return ResponseEntity.ok(generalService.actualizarGeneral(general));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/tablaGenerales/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(generalService.desactivar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(generalService.activar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }









    @GetMapping("/gendev/listar/activo/{codigo}")
    public List<GeneralDev> listarGenDevTrue(@PathVariable String codigo) {
        return generalService.findGeneralDevByEstadoTrueAndCodigo(codigo);
    }

    @GetMapping("/gendev/listar/desactivado")
    public List<GeneralDev> listarGenDevFsalse() {
        return generalService.findGeneralDevByEstadoFalse();
    }

    @PostMapping("/genDev/guardar")
    public ResponseEntity<?> guardarGenDev(@RequestBody GeneralDevDTO general) {
        try {
            return ResponseEntity.ok(generalService.guardarGeneralDev(general));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping("/genDev/actualizar")
    public ResponseEntity<?> actualizarGenDev(@RequestBody GeneralDevDTO general) {
        try {
            return ResponseEntity.ok(generalService.actualizarGeneralDev(general));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/desactivarGeneral/{codigo}")
    public ResponseEntity<?> desactivarPorCodigoGeneral(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(generalService.desactivarGenrales(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activarGeneral/{codigo}")
    public ResponseEntity<?> activarPorCodigoGeneral(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(generalService.activarGenrales(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/desactivarGeneralDev/{codigo}")
    public ResponseEntity<?> desactivarPorCodigoGeneral1(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(generalService.desactivarGen(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activarGeneralDev/{codigo}")
    public ResponseEntity<?> activarPorCodigoGeneral1(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(generalService.activarGen(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }



}
