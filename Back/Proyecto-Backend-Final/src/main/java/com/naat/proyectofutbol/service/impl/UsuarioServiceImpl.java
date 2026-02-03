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
    public Usuario actualizar(String codigo, String username, String contrasena,String roles)  {

        Usuario usuario = usuarioRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        if (roles != null && (usuario.getRol() == null || !usuario.getRol().getCodigo().equals(roles))) {
            Rol rol = rolRepository.findByCodigo(roles)
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ROL_NO_ENCONTRADO));

            usuario.setRol(rol);
        }

        usuario.setFechaActualizacion(LocalDate.now());
        usuario.setHoraActualizacion(LocalTime.now());

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario registrar(String codigo, String username, String contrasena,String roles) {

        Rol rol = rolRepository.findByCodigo(roles)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ROL_NO_ENCONTRADO));

        Usuario usuario = Usuario.builder()
                .codigo(codigo)
                .username(username)
                .password(passwordEncoder.encode(contrasena))
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .estado(true)
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
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
    }

    @Override
    public Usuario obtenerUsuarioPorCodigo(String codigo) {
        return usuarioRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
    }

    @Override
    public boolean usuarioExistePorUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    @Override
    public Usuario desactivar(String codigo) {
        Usuario usuario = usuarioRepository.findById(codigo)
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
        usuario.setEstado(false);
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario activar(String codigo) {
        Usuario usuario = usuarioRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
        usuario.setEstado(true);
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario activarUsuario(String codigo) {
        Usuario usuario = obtenerUsuarioPorCodigo(codigo);
        usuario.setEstado(true);
        return usuarioRepository.save(usuario);
    }
    @Override
    public Usuario desactivarUsuario(String codigo) {
        Usuario usuario = obtenerUsuarioPorCodigo(codigo);
        usuario.setEstado(false);
        return usuarioRepository.save(usuario);
    }

}
