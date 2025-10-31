package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.servicios.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "**", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE }, allowedHeaders = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

/*
    @PostMapping("/")
    public ResponseEntity<?> guardarUsuario(@RequestBody Usuario usuario) throws Exception {
        String ultimoCodigoUsuario = usuarioService.obtenerUltimoCodigoUsuario();

        String nuevoCodigoUsuario= Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);
        usuario.setCodigo(nuevoCodigoUsuario);
        Login user = new Login();
        user.setUl_codigo(nuevoCodigoUsuario);
        user.setPassword(this.bCryptPasswordEncoder.encode(usuario.getPassword()));
        user.setUsername(usuario.getUsername());
        user.setEstado(usuario.getEstado());
        user.setUl_rol(usuario.getRol().getRol());

        try {

            if (usuarioService.usuarioExistePorUsername(usuario.getUsername())) {
                return ResponseEntity.status(HttpStatus.HTTP_VERSION_NOT_SUPPORTED).body(UsuarioError.USUARIO_EXISTENTE.getMensaje());
            }

            usuarioService.guardarlogin(user);
            usuarioService.guardarUsuario(usuario);

            UsuarioLoginResponse response = new UsuarioLoginResponse(usuario, user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new Exception("Error HUR2006_B 1° + " + e.getMessage());
        }
    }

    @PutMapping("/actualizarUsuario/")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Usuario usuario) {

        Login user = new Login();
        user.setUl_codigo(usuario.getCodigo());
        user.setPassword(this.bCryptPasswordEncoder.encode(usuario.getPassword()));
        user.setUsername(usuario.getUsername());
        user.setUl_rol(usuario.getRol().getCodigo());
        try {
            usuarioService.guardarlogin(user);
            usuarioService.actualizarUsuario( usuario);
            UsuarioLoginResponse response = new UsuarioLoginResponse(usuario, user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Maneja cualquier excepción que ocurra durante el proceso
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al actualizar el usuario.");
        }


    }
*/

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar usuario");
        }
    }

}
