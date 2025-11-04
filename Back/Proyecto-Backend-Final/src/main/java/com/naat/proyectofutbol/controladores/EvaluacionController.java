package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.EvaluacionDTO;
import com.naat.proyectofutbol.dto.EvaluacionDevDTO;
import com.naat.proyectofutbol.entidades.Evaluacion;
import com.naat.proyectofutbol.entidades.EvaluacionDev;
import com.naat.proyectofutbol.servicios.EvalucionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/evaluacion")
@RequiredArgsConstructor
public class EvaluacionController {

    private final EvalucionService evalucionService;

    @GetMapping("/listar")
    public List<Evaluacion> listar() {
        return evalucionService.listaEvaluacion();
    }
    @GetMapping("/listar/Detalle")
    public List<EvaluacionDev> listarDetalle() {
        return evalucionService.listaEvaluacionDetalle();
    }

    @GetMapping("/conteo/{conteo}")
    public List<EvaluacionDev> listarPorConteo(@PathVariable String conteo) {
        return evalucionService.findByConteo(conteo);
    }
    @GetMapping("/equipo/{equipo}")
    public List<EvaluacionDev> listarPorEquipo(@PathVariable String equipo) {
        return evalucionService.findByEquipo(equipo);
    }
    @GetMapping("/listar/{equipo}/{conteo}")
    public List<EvaluacionDev> listarPorEquipoConteo(@PathVariable String equipo,@PathVariable String conteo) {
        return evalucionService.findByEquipoAndConteo(equipo,conteo);
    }
    @PutMapping("/actualizar/detalle")
    public ResponseEntity<?> actualizar(@RequestBody List<EvaluacionDevDTO>  evaluacionDevDTOS) {
        try {

            return ResponseEntity.ok(evalucionService.actualizar(evaluacionDevDTOS));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping("/actualizar/ev")
    public ResponseEntity<?> actualizarev(@RequestBody List<EvaluacionDTO>  evaluacionDTOS) {
        try {
System.out.println(evaluacionDTOS);
            return ResponseEntity.ok("LISTO");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping("/desactivar/{clase}/{conteo}")
    public ResponseEntity<?> desactivarEvaluaciones(
            @PathVariable String clase,
            @PathVariable String conteo) {


        return ResponseEntity.ok( evalucionService.desactivar(clase, conteo));
    }

}
