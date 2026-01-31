package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.dto.request.EstudianteRequest;
import com.naat.proyectofutbol.model.Estudiante;
import com.naat.proyectofutbol.model.Profesor;
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


    @GetMapping("/telefono/{telefono}")
    public List<Estudiante> buscarPorTelefono(@PathVariable String telefono) {
        return estudianteService.findByTelefono(telefono);
    }

    @GetMapping("/dni/{dni}")
    public List<Estudiante> buscarPorDni(@PathVariable String dni) {
        return estudianteService.findByDni(dni);
    }

    @GetMapping("/correo/{correo}")
    public List<Estudiante> buscarPorCorreo(@PathVariable String correo) {
        return estudianteService.findByCorreo(correo);
    }

    @GetMapping("/nacionalidad/{nacionalidad}")
    public List<Estudiante> buscarPorNacionalidad(@PathVariable String nacionalidad) {
        return estudianteService.findByNacionalidad(nacionalidad);
    }

    @GetMapping("/edad/{edad}")
    public List<Estudiante> buscarPorEdad(@PathVariable String edad) {
        return estudianteService.findByEdad(edad);
    }

    @GetMapping("/apellido/{apellidoPaterno}")
    public List<Estudiante> buscarPorApellidoPaterno(@PathVariable String apellidoPaterno) {
        return estudianteService.findByApellidoPaterno(apellidoPaterno);
    }

    @GetMapping("/nombre/{primerNombre}")
    public List<Estudiante> buscarPorPrimerNombre(@PathVariable String primerNombre) {
        return estudianteService.findByPrimerNombre(primerNombre);
    }
}
