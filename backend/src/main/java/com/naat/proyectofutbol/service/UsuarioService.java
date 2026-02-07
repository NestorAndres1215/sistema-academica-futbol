package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Usuario;

import java.util.List;

public interface UsuarioService {
    Usuario activarUsuario(String codigo);

    Usuario desactivarUsuario(String codigo);

    Usuario actualizar(String codigo, String username, String contrasena, String roles);

    Usuario registrar(String codigo, String username, String contrasena, String roles);

    List<Usuario> listarUsuario();

    Usuario buscarUsername(String username);

    Usuario obtenerUsuarioPorCodigo(String codigo);

    boolean usuarioExistePorUsername(String username);

    Usuario desactivar(String codigo);

    Usuario activar(String codigo);

}
