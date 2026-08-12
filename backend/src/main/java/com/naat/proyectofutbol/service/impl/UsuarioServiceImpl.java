package com.naat.proyectofutbol.service.impl;


import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Rol;
import com.naat.proyectofutbol.model.Usuario;

import com.naat.proyectofutbol.repository.RolRepository;
import com.naat.proyectofutbol.repository.UsuarioRepository;
import com.naat.proyectofutbol.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public Usuario actualizar(String codigo, String username, String contrasena, String rolCodigo) {

        Usuario usuario = obtenerUsuarioPorCodigo(codigo);

        usuario.setUsername(username);

        if (contrasena != null && !contrasena.isBlank()) {
            usuario.setPassword(passwordEncoder.encode(contrasena));
        }

        if (rolCodigo != null && !rolCodigo.equals(usuario.getRol().getCodigo())) {
            usuario.setRol(obtenerRol(rolCodigo));
        }

        usuario.setFechaActualizacion(LocalDate.now());
        usuario.setHoraActualizacion(LocalTime.now());

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario registrar(String codigo, String username, String contrasena, String rolCodigo) {

        Rol rol = obtenerRol(rolCodigo);

        Usuario usuario = Usuario.builder()
                .codigo(codigo)
                .username(username)
                .password(passwordEncoder.encode(contrasena))
                .estado(true)
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .rol(rol)
                .build();

        return usuarioRepository.save(usuario);
    }


    @Override
    public List<Usuario> listarUsuario() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario buscarUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
    }

    @Override
    public Usuario obtenerUsuarioPorCodigo(String codigo) {
        return usuarioRepository.findById(codigo)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
    }


    @Override
    public boolean usuarioExistePorUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    @Override
    public Usuario activar(String codigo) {
        return cambiarEstado(codigo, true);
    }

    @Override
    public Usuario desactivar(String codigo) {
        return cambiarEstado(codigo, false);
    }

    @Override
    public Usuario activarUsuario(String codigo) {
        return cambiarEstado(codigo, true);
    }

    @Override
    public Usuario desactivarUsuario(String codigo) {
        return cambiarEstado(codigo, false);
    }

    private Usuario cambiarEstado(String codigo, boolean estado) {
        Usuario usuario = obtenerUsuarioPorCodigo(codigo);
        usuario.setEstado(estado);
        return usuarioRepository.save(usuario);
    }

    private Rol obtenerRol(String codigo) {
        return rolRepository.findByCodigo(codigo)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.ROL_NO_ENCONTRADO));
    }

}
