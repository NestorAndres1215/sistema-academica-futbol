package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.HistorialDTO;
import com.naat.proyectofutbol.entidades.Historial;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.servicios.HistorialService;
import com.naat.proyectofutbol.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historial")
public class HistorialController {

    @Autowired
    private HistorialService historialService;
    @Autowired
    private UsuarioService usuarioService;


    @GetMapping("/usuario/{usuarioId}")
    public List<Historial> getHistorialPorUsuario(@PathVariable String usuarioId) {
        // Aquí debes buscar el usuario por ID
        Usuario usuario = historialService.findById(usuarioId); // Suponiendo que tienes un servicio para obtener usuarios
        return historialService.obtenerHistorialPorUsuario(usuario);
    }
    @PostMapping("/guardar-historial")
    public ResponseEntity<?> guardar(@RequestBody HistorialDTO historialDTO) throws Exception {
        try {

            return ResponseEntity.ok( historialService.guardar(historialDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
