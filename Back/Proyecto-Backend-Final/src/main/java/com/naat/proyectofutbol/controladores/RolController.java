package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.servicios.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rol")
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE }, allowedHeaders = "*")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public List<Rol> listarRoles() {
        return rolService.listarRoles(); // Llama al servicio para obtener los roles
    }
}
