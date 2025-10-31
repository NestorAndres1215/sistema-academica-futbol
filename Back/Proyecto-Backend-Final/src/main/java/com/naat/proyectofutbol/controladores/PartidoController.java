package com.naat.proyectofutbol.controladores;


import com.naat.proyectofutbol.dto.PartidoDTO;

import com.naat.proyectofutbol.entidades.Partido;
import com.naat.proyectofutbol.servicios.PartidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partido")
public class PartidoController {
    @Autowired
    private PartidoService partidoService;

    @GetMapping("/listar/activo")
    public List<Partido> listarActivado() {
        return partidoService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/desactivado")
    public List<Partido> listarDesactivado() {
        return partidoService.findAdminsByEstadoFalse();
    }
    @PostMapping("/guardar")
    public ResponseEntity<?> guardarProfesor(@RequestBody PartidoDTO partidoDTO) throws Exception {
        try {
            return ResponseEntity.ok( partidoService.RegistrarPartido(partidoDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping ("/actualizar")
    public ResponseEntity<?> actualizarProfesor(@RequestBody PartidoDTO partidoDTO) throws Exception {
        try {
            System.out.print(partidoDTO);
            return ResponseEntity.ok( partidoService.actualizarPartido(partidoDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping ("/actualizar/desactivado")
    public ResponseEntity<?> actualizarProfesorDesa(@RequestBody PartidoDTO partidoDTO) throws Exception {
        try {
            System.out.print(partidoDTO);
            return ResponseEntity.ok( partidoService.actualizarPartidoSegundo(partidoDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
