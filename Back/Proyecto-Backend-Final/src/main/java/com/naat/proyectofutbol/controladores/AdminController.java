package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.AdminDTO;
import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/usuario/{usuarioCodigo}")
    public List<Admin> getAdminsByUsuario(@PathVariable String usuarioCodigo) {
        return adminService.getAdminsByUsuarioCodigo(usuarioCodigo);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Admin>> listarAdmin() {
        List<Admin> admin = adminService.listarAdmin();
        return ResponseEntity.ok(admin);
    }

    @PostMapping("/guardar-admin")
    public ResponseEntity<?> guardarAdmin(@RequestBody AdminDTO admin) throws Exception {
        try {
            return ResponseEntity.ok(adminService.guardarAdmin(admin));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/actualizar-admin")
    public ResponseEntity<?> actualizarAdmin(@RequestBody AdminDTO request) throws Exception {
        try {
            return ResponseEntity.ok(adminService.actualizarAdmin(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/actualizar/{usuario}")
    public ResponseEntity<?> actualizarUsuario(
            @PathVariable String usuario, @RequestParam("codigoAdmin") String codigoAdmin, @RequestParam("codigoUsuario") String codigoUsuario, @RequestParam("usuario") String username,
            @RequestParam("contra") String contra, @RequestParam("primerNombre") String primerNombre,
            @RequestParam("segundoNombre") String segundoNombre, @RequestParam("apellidoPaterno") String apellidoPaterno, @RequestParam("apellidoMaterno") String apellidoMaterno,
            @RequestParam("telefono") String telefono, @RequestParam("email") String email, @RequestParam("dni") String dni, @RequestParam("direccion") String direccion,
            @RequestParam("nacimiento") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate nacimiento, @RequestParam("nacionalidad") String nacionalidad,
            @RequestParam("edad") int edad, @RequestParam("perfil") MultipartFile perfil) {

        try {
            return ResponseEntity.ok(adminService.actualizarImagen(codigoUsuario, codigoAdmin, contra, username, primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, telefono, email, dni, direccion, nacimiento, nacionalidad, edad, perfil));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }


    @GetMapping("/listar/estado/activo")
    public List<Admin> getAdminsByEstadoTrue() {
        return adminService.findAdminsByEstadoTrue();
    }

    @GetMapping("/listar/estado/desactivado")
    public List<Admin> getAdminsByEstadoFalse() {
        return adminService.findAdminsByEstadoFalse();
    }


    // Filtrar por correo
    @GetMapping("/correo/{correo}")
    public List<Admin> buscarPorCorreo(@PathVariable String correo) {
        return adminService.findByCorreo(correo);
    }

    // Filtrar por DNI
    @GetMapping("/dni/{dni}")
    public List<Admin> buscarPorDni(@PathVariable String dni) {
        return adminService.findByDni(dni);
    }

    // Filtrar por apellido paterno
    @GetMapping("/apellido/{apellido}")
    public List<Admin> buscarPorApellido(@PathVariable("apellido") String apellidoPaterno) {
        return adminService.findByApellidoPaterno(apellidoPaterno);
    }

    // Filtrar por primer nombre
    @GetMapping("/nombre/{nombre}")
    public List<Admin> buscarPorNombre(@PathVariable("nombre") String primerNombre) {
        return adminService.findByPrimerNombre(primerNombre);
    }

    // Filtrar por teléfono
    @GetMapping("/telefono/{telefono}")
    public List<Admin> buscarPorTelefono(@PathVariable String telefono) {
        return adminService.findByTelefono(telefono);
    }


    @DeleteMapping("/desactivar/{codigo}")
    public ResponseEntity<?> desactivarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(adminService.desactivarUsuario(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/activar/{codigo}")
    public ResponseEntity<?> activarPorCodigo(@PathVariable String codigo) {
        try {
            return ResponseEntity.ok(adminService.activarUsuario(codigo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}

