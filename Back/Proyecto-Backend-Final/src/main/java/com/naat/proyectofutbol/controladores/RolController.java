package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.servicios.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rol")
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE }, allowedHeaders = "*")
@RequiredArgsConstructor
public class RolController {


    private final RolService rolService;

    @GetMapping
    public List<Rol> listarRoles() {
        return rolService.listarRoles(); // Llama al servicio para obtener los roles
    }

    // ✅ Listar roles por nombre
    @GetMapping("/listar/{nombre}")
    public ResponseEntity<?> listarPorRol(@PathVariable String nombre) {
        try {
            List<Rol> roles = rolService.findByRol(nombre);
            return ResponseEntity.ok(roles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener roles por nombre");
        }
    }
}
