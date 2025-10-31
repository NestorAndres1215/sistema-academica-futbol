package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.EstudianteDTO;
import com.naat.proyectofutbol.entidades.Estudiante;
import com.naat.proyectofutbol.servicios.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/estudiante")

public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;

    @GetMapping("/listar/estado/activo")
    public List<Estudiante> getAdminsByEstadoTrue() {
        return estudianteService.findProfesorByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Estudiante> getAdminsByEstadoFalse() {
        return estudianteService.findProfesorByEstadoFalse();
    }

    @PostMapping("/guardar-estudiante")
        public ResponseEntity<?> guardarEstudiante(@RequestBody EstudianteDTO estudianteDTO) throws Exception {
        try {
            return ResponseEntity.ok( estudianteService.guardarEstudianter(estudianteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping ("/actualizar-estudiante")
    public ResponseEntity<?> actualizarEstudiante(@RequestBody EstudianteDTO estudianteDTO) throws Exception {
        try {
            return ResponseEntity.ok( estudianteService.actualizarEstudiante(estudianteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(estudianteService.desactivar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(estudianteService.activar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PostMapping("/guardar-excel-estudiante")
    public ResponseEntity<?> guardarExcelProfesores(@RequestBody List<EstudianteDTO> estudianteDTOS) {
        try {
            return ResponseEntity.ok(estudianteService.reEstudiantes(estudianteDTOS));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar los profesores: " + e.getMessage());
        }
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
    public ResponseEntity<?> actualizarUsuario(
            @PathVariable String usuario,
            @RequestParam("codigoAdmin") String codigoAdmin,
            @RequestParam("codigoUsuario") String codigoUsuario,
            @RequestParam("usuario") String username,
            @RequestParam("primerNombre") String primerNombre,
            @RequestParam("segundoNombre") String segundoNombre,
            @RequestParam("apellidoPaterno") String apellidoPaterno,
            @RequestParam("apellidoMaterno") String apellidoMaterno,
            @RequestParam("telefono") String telefono,
            @RequestParam("email") String email,
            @RequestParam("direccion") String direccion,
            @RequestParam("perfil") MultipartFile perfil) {

        try {
            return ResponseEntity.ok(estudianteService.actualizarImagen(codigoUsuario,codigoAdmin,username,primerNombre,segundoNombre,apellidoPaterno,apellidoMaterno,telefono,email,direccion,perfil));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
