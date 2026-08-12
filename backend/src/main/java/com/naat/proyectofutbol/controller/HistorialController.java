package com.naat.proyectofutbol.controller;
import com.naat.proyectofutbol.dto.request.HistorialRequest;
import com.naat.proyectofutbol.model.Historial;
import com.naat.proyectofutbol.service.HistorialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/historial")
@RequiredArgsConstructor
public class HistorialController {


    private final HistorialService historialService;

    @GetMapping("/usuario/{usuarioId}")
    public List<Historial> getHistorialPorUsuario(@PathVariable String usuarioId) {
        return historialService.obtenerHistorialPorUsuario(usuarioId);
    }

    @PostMapping("/guardar-historial")
    public ResponseEntity<Historial> guardar(@Valid @RequestBody HistorialRequest historialDTO) throws Exception {
        return ResponseEntity.ok( historialService.guardar(historialDTO));
    }
}
