package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.dto.request.EstudianteRequest;
import com.naat.proyectofutbol.model.Estudiante;
import com.naat.proyectofutbol.service.EstudianteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/estudiante")
@RequiredArgsConstructor
public class EstudianteController {

    private final EstudianteService estudianteService;

    @GetMapping("/listar/estado/activo")
    public List<Estudiante> getAdminsByEstadoTrue() {
        return estudianteService.findProfesorByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Estudiante> getAdminsByEstadoFalse() {
        return estudianteService.findProfesorByEstadoFalse();
    }

    @PostMapping("/guardar-estudiante")
    public ResponseEntity<Estudiante> guardarEstudiante(@Valid @RequestBody EstudianteRequest estudianteDTO) throws Exception {
        return ResponseEntity.ok(estudianteService.guardarEstudiante(estudianteDTO));
    }

    @PutMapping("/actualizar-estudiante")
    public ResponseEntity<Estudiante> actualizarEstudiante(@Valid @RequestBody EstudianteRequest estudianteDTO) {
        return ResponseEntity.ok(estudianteService.actualizarEstudiante(estudianteDTO));
    }

    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<Estudiante> desactivarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(estudianteService.desactivar(codigo));
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<Estudiante> activarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(estudianteService.activar(codigo));
    }

    @PostMapping("/guardar-excel-estudiante")
    public ResponseEntity<List<Estudiante>> guardarExcelProfesores(@Valid @RequestBody List<EstudianteRequest> estudianteDTOS) {
        return ResponseEntity.ok(estudianteService.reEstudiantes(estudianteDTOS));
    }

    @GetMapping("/listar")
    public List<Estudiante> listarPorUsername() {
        return estudianteService.listar();
    }

    @GetMapping("/usuario/{usuarioCodigo}")
    public List<Estudiante> getAdminsByUsuario(@PathVariable String usuarioCodigo) {
        return estudianteService.getAdminsByUsuarioCodigo(usuarioCodigo);
    }

    @PutMapping("/actualizar/{usuario}")
    public ResponseEntity<Estudiante> actualizarUsuario(@PathVariable String usuario, @RequestParam("codigoAdmin") String codigoAdmin,
                                                        @RequestParam("codigoUsuario") String codigoUsuario, @RequestParam("usuario") String username,
                                                        @RequestParam("primerNombre") String primerNombre, @RequestParam("segundoNombre") String segundoNombre,
                                                        @RequestParam("apellidoPaterno") String apellidoPaterno, @RequestParam("apellidoMaterno") String apellidoMaterno,
                                                        @RequestParam("telefono") String telefono, @RequestParam("email") String email,
                                                        @RequestParam("direccion") String direccion, @RequestParam("perfil") MultipartFile perfil) {

        return ResponseEntity.ok(estudianteService.actualizarImagen(codigoUsuario, codigoAdmin, username, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, telefono, email, direccion, perfil));

    }
}
