package com.naat.proyectofutbol.servicios;


import java.util.List;
import java.util.Optional;
import com.naat.proyectofutbol.dto.UsuarioDTO;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.modelo.Login;

public interface UsuarioService {
    //guardar usuario
    public Usuario guardarUsuario(Usuario usuarios);
    //actualizar usuario
    Usuario actualizarUsuario(Usuario obj);
    // registrar usuario login
    Login guardarlogin(Login login);
    // activar usuario
    Optional<Usuario> activarUsuario(String Codigo);
    // desactivar usuario
    Optional<Usuario> desactivarUsuario(String Codigo);
    //listar usuario
    List<Usuario> findAll();



    // validaciones de usuario existe
    boolean usuarioExistePorUsername(String username);
    // validaciones de  usuario y contraseña valida
    boolean existsByUsernameAndPassword(String username, String password);
    // ultimo codigo
    public String obtenerUltimoCodigoUsuario();
    List<Usuario> findByUsername(String username);
    Usuario actualizar(UsuarioDTO usuarioDto) throws Exception ;


}
