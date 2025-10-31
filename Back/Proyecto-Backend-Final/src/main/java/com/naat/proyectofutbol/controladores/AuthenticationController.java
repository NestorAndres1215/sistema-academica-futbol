package com.naat.proyectofutbol.controladores;

import java.security.Principal;

import com.naat.proyectofutbol.constrainst.UsuarioError;
import com.naat.proyectofutbol.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.naat.proyectofutbol.configuraciones.JwtUtils;
import com.naat.proyectofutbol.modelo.JwtRequest;
import com.naat.proyectofutbol.modelo.JwtResponse;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.servicios.UserDetailsServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UsuarioService usuarioService;
	@PostMapping("/generate-token")
	public ResponseEntity<?> generarToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			// Verifica que el usuario exista
			if(!usuarioService.usuarioExistePorUsername(jwtRequest.getUsername())) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(UsuarioError.USUARIO_NO_ENCONTRADO.getMensaje());
			}

			// Verifica las credenciales del usuario
			if(!usuarioService.existsByUsernameAndPassword(jwtRequest.getUsername(), jwtRequest.getPassword())) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UsuarioError.ERROR_USUARIO.getMensaje());
			}

			// Autenticación
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));

			// Cargar detalles del usuario
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());

			// Generación del token
			String token = this.jwtUtils.generateToken(userDetails);

			// Responder con el token
			return ResponseEntity.ok(new JwtResponse(token));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la solicitud");
		}
	}


	@GetMapping("/actual-usuario")
	public Login obtenerUsuarioActual(Principal principal) {
		return (Login) this.userDetailsService.loadUserByUsername(principal.getName());
	}

}
