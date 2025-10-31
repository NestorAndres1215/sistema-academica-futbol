package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Horario;
import com.naat.proyectofutbol.servicios.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horario")
public class HorarioController {
    @Autowired
    private HorarioService horarioService;

    @GetMapping("/listar/estado/activo")
    public List<Horario> listarActivado() {
        return horarioService.listarHorarioActivado();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Horario> listarDesactivado() {
        return horarioService.listarHorarioDesactivado();
    }
    @PostMapping("/guardar")
    public ResponseEntity<?> GUARDAR(@RequestBody Horario horario) throws Exception {
        try {

            return ResponseEntity.ok( horarioService.RegistrarHorario(horario));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping ("/actualizar")
    public ResponseEntity<?> ACTUALIZAR(@RequestBody Horario horario) {
        try {
            return ResponseEntity.ok(horarioService.actualizarHorario(horario));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
