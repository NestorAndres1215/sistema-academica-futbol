package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.dto.request.ProfesorRequest;
import com.naat.proyectofutbol.model.Profesor;
import com.naat.proyectofutbol.service.ProfesorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/profesor")
@RequiredArgsConstructor
public class ProfesorController {

    private final ProfesorService profesorService;


    @GetMapping("/listar/estado/activo")
    public List<Profesor> getAdminsByEstadoTrue() {
        return profesorService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Profesor> getAdminsByEstadoFalse() {
        return profesorService.getAdminsByEstadoFalse();
    }

    @PostMapping("/guardar-profesor")
    public ResponseEntity<Profesor> guardarProfesor(@Valid @RequestBody ProfesorRequest profesorDTO) throws Exception {
        return ResponseEntity.ok(profesorService.guardarProfesor(profesorDTO));
    }

    @PutMapping("/actualizar-profesor")
    public ResponseEntity<Profesor> actualizarProfesor(@Valid @RequestBody ProfesorRequest profesorDTO) throws Exception {
        return ResponseEntity.ok(profesorService.actualizarProfesor(profesorDTO));
    }

    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<Profesor> desactivarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(profesorService.desactivar(codigo));
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<Profesor> activarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(profesorService.activar(codigo));
    }

    @PostMapping("/guardar-excel-profesores")
    public ResponseEntity<?> guardarExcelProfesores(@Valid @RequestBody List<ProfesorRequest> profesorDTOs) {
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
    public ResponseEntity<Profesor> actualizarUsuario(@PathVariable String usuario, @RequestParam("codigoAdmin") String codigoAdmin,
                                                      @RequestParam("codigoUsuario") String codigoUsuario, @RequestParam("usuario") String username,
                                                      @RequestParam("primerNombre") String primerNombre, @RequestParam("segundoNombre") String segundoNombre,
                                                      @RequestParam("apellidoPaterno") String apellidoPaterno, @RequestParam("apellidoMaterno") String apellidoMaterno,
                                                      @RequestParam("telefono") String telefono, @RequestParam("email") String email,
                                                      @RequestParam("direccion") String direccion, @RequestParam("perfil") MultipartFile perfil) {
        return ResponseEntity.ok(profesorService.actualizarImagen(codigoUsuario, codigoAdmin, username, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, telefono, email, direccion, perfil));
    }

    @GetMapping("/telefono/{telefono}")
    public List<Profesor> buscarPorTelefono(@PathVariable String telefono) {
        return profesorService.findByTelefono(telefono);
    }

    @GetMapping("/dni/{dni}")
    public List<Profesor> buscarPorDni(@PathVariable String dni) {
        return profesorService.findByDni(dni);
    }

    @GetMapping("/correo/{correo}")
    public List<Profesor> buscarPorCorreo(@PathVariable String correo) {
        return profesorService.findByCorreo(correo);
    }

    @GetMapping("/nacionalidad/{nacionalidad}")
    public List<Profesor> buscarPorNacionalidad(@PathVariable String nacionalidad) {
        return profesorService.findByNacionalidad(nacionalidad);
    }

    @GetMapping("/edad/{edad}")
    public List<Profesor> buscarPorEdad(@PathVariable String edad) {
        return profesorService.findByEdad(edad);
    }

    @GetMapping("/apellido/{apellidoPaterno}")
    public List<Profesor> buscarPorApellidoPaterno(@PathVariable String apellidoPaterno) {
        return profesorService.findByApellidoPaterno(apellidoPaterno);
    }

    @GetMapping("/nombre/{primerNombre}")
    public List<Profesor> buscarPorPrimerNombre(@PathVariable String primerNombre) {
        return profesorService.findByPrimerNombre(primerNombre);
    }
}
