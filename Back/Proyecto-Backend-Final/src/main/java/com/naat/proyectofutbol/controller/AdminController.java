package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.dto.request.AdminRequest;
import com.naat.proyectofutbol.model.Admin;
import com.naat.proyectofutbol.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;



    @GetMapping("/usuario/{usuarioCodigo}")
    public List<Admin> getAdminsByUsuario(@PathVariable String usuarioCodigo) {
        return adminService.listarUsuarioCodigo(usuarioCodigo);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Admin>> listarAdmin() {
        return ResponseEntity.ok(adminService.listarAdmin());
    }

    @PostMapping("/guardar-admin")
    public ResponseEntity<Admin> guardarAdmin(@Valid @RequestBody AdminRequest admin) throws Exception {
        return ResponseEntity.ok(adminService.guardarAdmin(admin));
    }

    @PutMapping("/actualizar-admin")
    public ResponseEntity<Admin> actualizarAdmin(@Valid @RequestBody AdminRequest admin) throws Exception {
        return ResponseEntity.ok(adminService.actualizarAdmin(admin));
    }

    @PutMapping("/actualizar/{usuario}")
    public ResponseEntity<Admin> actualizarUsuario(
            @PathVariable String usuario, @RequestParam("codigoAdmin") String codigoAdmin, @RequestParam("codigoUsuario") String codigoUsuario, @RequestParam("usuario") String username,
            @RequestParam("contra") String contra, @RequestParam("primerNombre") String primerNombre,
            @RequestParam("segundoNombre") String segundoNombre, @RequestParam("apellidoPaterno") String apellidoPaterno, @RequestParam("apellidoMaterno") String apellidoMaterno,
            @RequestParam("telefono") String telefono, @RequestParam("email") String email, @RequestParam("dni") String dni, @RequestParam("direccion") String direccion,
            @RequestParam("nacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate nacimiento, @RequestParam("nacionalidad") String nacionalidad,
            @RequestParam("edad") int edad, @RequestParam("perfil") MultipartFile perfil) throws IOException {

            return ResponseEntity.ok(adminService.actualizarImagen(codigoUsuario, codigoAdmin, contra, username, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, telefono, email, dni, direccion, nacimiento, nacionalidad, edad, perfil));

    }

    @GetMapping("/listar/estado/activo")
    public List<Admin> getAdminsByEstadoTrue() {
        return adminService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Admin> getAdminsByEstadoFalse() {
        return adminService.findAdminsByEstadoFalse();
    }

    @GetMapping("/correo/{correo}")
    public Admin buscarPorCorreo(@PathVariable String correo) {
        return adminService.buscarPorCorreo(correo);
    }

    @GetMapping("/dni/{dni}")
    public Admin buscarPorDni(@PathVariable String dni) {
        return adminService.buscarPorDni(dni);
    }

    @GetMapping("/apellido/{apellido}")
    public List<Admin> buscarPorApellido(@PathVariable("apellido") String apellidoPaterno) {
        return adminService.buscarPorApellidoPaterno(apellidoPaterno);
    }

    @GetMapping("/nombre/{nombre}")
    public List<Admin> buscarPorNombre(@PathVariable("nombre") String primerNombre) {
        return adminService.buscarPorPrimerNombre(primerNombre);
    }

    @GetMapping("/telefono/{telefono}")
    public Admin buscarPorTelefono(@PathVariable String telefono) {
        return adminService.buscarPorTelefono(telefono);
    }


    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<Admin> desactivarPorCodigo(@PathVariable String codigo) {

            return ResponseEntity.ok(adminService.desactivarUsuario(codigo));

    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<Admin> activarPorCodigo(@PathVariable String codigo) {

            return ResponseEntity.ok(adminService.activarUsuario(codigo));

    }
}

