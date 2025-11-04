package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.UsuarioDTO;
import com.naat.proyectofutbol.servicios.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.naat.proyectofutbol.entidades.Usuario;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "**", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE}, allowedHeaders = "*")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> lista() {
        return usuarioService.findAll();
    }

    @GetMapping("/listar/username/{username}")
    public List<Usuario> listarPorUsername(@PathVariable String username) {
        return usuarioService.findByUsername(username);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarUsuario(@RequestBody UsuarioDTO usuarioDto) {
        try {
            return ResponseEntity.ok(usuarioService.actualizar(usuarioDto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar usuario");
        }
    }
}
