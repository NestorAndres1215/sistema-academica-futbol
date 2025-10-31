package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.ProfesorDTO;
import com.naat.proyectofutbol.entidades.Estudiante;
import com.naat.proyectofutbol.entidades.Profesor;
import com.naat.proyectofutbol.servicios.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/profesor")

public class ProfesorController {
    @Autowired
    private ProfesorService profesorService;


    @GetMapping("/listar/estado/activo")
    public List<Profesor> getAdminsByEstadoTrue() {
        return profesorService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Profesor> getAdminsByEstadoFalse() {
        return profesorService.findAdminsByEstadoFalse();
    }

    @PostMapping("/guardar-profesor")
    public ResponseEntity<?> guardarProfesor(@RequestBody ProfesorDTO profesorDTO) throws Exception {
        try {
            return ResponseEntity.ok( profesorService.guardarProfesor(profesorDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @PutMapping ("/actualizar-profesor")
    public ResponseEntity<?> actualizarProfesor(@RequestBody ProfesorDTO profesorDTO) throws Exception {
        try {
            return ResponseEntity.ok( profesorService.actualizarProfesor(profesorDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(profesorService.desactivar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(profesorService.activar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/guardar-excel-profesores")
    public ResponseEntity<?> guardarExcelProfesores(@RequestBody List<ProfesorDTO> profesorDTOs) {
        try {
            return ResponseEntity.ok(profesorService.registrarProfesores(profesorDTOs));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar los profesores: " + e.getMessage());
        }
    }
    @GetMapping("/listar")
    public List<Profesor> listarPorUsername() {
        return profesorService.listar();
    }

    @GetMapping("/usuario/{usuarioCodigo}")
    public List<Profesor> getAdminsByUsuario(@PathVariable String usuarioCodigo) {
        return profesorService.getAdminsByUsuarioCodigo(usuarioCodigo);
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
            return ResponseEntity.ok(profesorService.actualizarImagen(codigoUsuario,codigoAdmin,username,primerNombre,segundoNombre,apellidoPaterno,apellidoMaterno,telefono,email,direccion,perfil));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }


}
