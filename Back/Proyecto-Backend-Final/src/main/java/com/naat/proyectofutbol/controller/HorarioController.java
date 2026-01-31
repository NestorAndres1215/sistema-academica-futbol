package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.model.Horario;
import com.naat.proyectofutbol.service.HorarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horario")
@RequiredArgsConstructor
public class HorarioController {

    private final HorarioService horarioService;

    @GetMapping("/listar/estado/activo")
    public List<Horario> listarActivado() {
        return horarioService.listarHorarioActivado();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Horario> listarDesactivado() {
        return horarioService.listarHorarioDesactivado();
    }

    @PostMapping("/guardar")
    public ResponseEntity<Horario> registrar(@RequestBody Horario horario) throws Exception {
        return ResponseEntity.ok(horarioService.RegistrarHorario(horario));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Horario> actualizar(@RequestBody Horario horario) {
        return ResponseEntity.ok(horarioService.actualizarHorario(horario));
    }

}
