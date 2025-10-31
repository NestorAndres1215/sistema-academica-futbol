package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.AsignacionDTO;
import com.naat.proyectofutbol.dto.AsignacionEstudiante;
import com.naat.proyectofutbol.dto.EquipoDTO;
import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.entidades.EquipoDev;
import com.naat.proyectofutbol.servicios.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipo")
public class EquipoController {
    @Autowired
    private EquipoService equipoService;
    @GetMapping("/listar/activo")
    public List<Equipo> LISTARACTIVOS() {
        return equipoService.listaractivados();
    }

    @GetMapping("/listar/desactivado")
    public List<Equipo> LISTARDESACTIVADOS() {
        return equipoService.listardesactivados();
    }
    @PostMapping("/registrar")
    public ResponseEntity<?> REGISTRAR(@RequestBody EquipoDTO equipoDTO) {
        try {
            return ResponseEntity.ok(equipoService.registrar(equipoDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping ("/actualizar")
    public ResponseEntity<?> ACTUALIZAR(@RequestBody EquipoDTO equipoDTO) {
        try {
            return ResponseEntity.ok(equipoService.actualizar(equipoDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivar(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(equipoService.desactivar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activar(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(equipoService.activar(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }



    @PostMapping("/asignacion/registrar")
    public ResponseEntity<?> REGISTRARASIGNACION1( @RequestBody List<AsignacionDTO>  asignacionDTO) {
        try {
           System.out.print(asignacionDTO+"\n");
            return ResponseEntity.ok(equipoService.regEquipo(asignacionDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @GetMapping("/listar/equipodev/activo")
    public List<EquipoDev> listarEquipoDevActivados() {
        return equipoService.listarEquipoDevActivados(); // Asegúrate de que este método exista en tu repositorio
    }

    @DeleteMapping("/asignacion/eliminar/{id}")
    public ResponseEntity<?>  deleteItem(@PathVariable String codigo) {

        try {
            return ResponseEntity.ok(equipoService.eliminarEquipo(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }

    }

    @PutMapping ("/asignacion/actualizar")
    public ResponseEntity<?> ACTUAÑOZAR( @RequestBody List<AsignacionEstudiante>  asignacionEstudiantes) {
        try {

            return ResponseEntity.ok(equipoService.actualizarEquipoEstudiante(asignacionEstudiantes));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
    @GetMapping("/listar")
    public List<EquipoDev> LISTAR() {
        return equipoService.listar();
    }

}
