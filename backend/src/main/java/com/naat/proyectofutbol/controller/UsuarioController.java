package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.service.UsuarioService;
import org.springframework.web.bind.annotation.*;
import com.naat.proyectofutbol.model.Usuario;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> lista() {
        return usuarioService.listarUsuario();
    }

    @GetMapping("/listar/username/{username}")
    public Usuario listarPorUsername(@PathVariable String username) {
        return usuarioService.buscarUsername(username);
    }
/*
    @PutMapping("/actualizar")
    public ResponseEntity<Usuario> actualizarUsuario(@RequestBody UsuarioDTO usuarioDto) {
            return ResponseEntity.ok(usuarioService.actualizar(usuarioDto));

    }*/
}
