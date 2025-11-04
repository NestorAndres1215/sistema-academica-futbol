package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.DetalleLesionDTO;
import com.naat.proyectofutbol.dto.LesionesDTO;
import com.naat.proyectofutbol.entidades.Lesiones;
import com.naat.proyectofutbol.entidades.LesionesDev;
import com.naat.proyectofutbol.servicios.LesionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lesiones")
public class LesionesController {
    @Autowired
    private LesionesService lesionesService;


    @GetMapping("/listar/activo")
    public List<Lesiones> listarActivado() {
        return lesionesService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/desactivado")
    public List<Lesiones> listarDesactivado() {
        return lesionesService.findAdminsByEstadoFalse();
    }


    @GetMapping("/listar/dev/activo")
    public List<LesionesDev> listarActivadoDev() {
        return lesionesService.listar();
    }


    @PostMapping("/registrar")
    public ResponseEntity<?> REGISTRAR(@RequestBody LesionesDTO lesionesDTO) {
        try {

            return ResponseEntity.ok(lesionesService.registrarLesiones(lesionesDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }


    @PostMapping("/dev/registrar")
    public ResponseEntity<?> REGISTRARDEV(@RequestBody DetalleLesionDTO lesionesDTO) {
        try {

            return ResponseEntity.ok(lesionesService.registrarLesionesDev(lesionesDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
