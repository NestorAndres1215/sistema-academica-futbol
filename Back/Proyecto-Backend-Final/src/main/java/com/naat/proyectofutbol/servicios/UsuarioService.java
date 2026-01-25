package com.naat.proyectofutbol.servicios;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.naat.proyectofutbol.dto.UsuarioDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.repositorios.UsuarioRepository;
import com.naat.proyectofutbol.repositorios.LoginRepository;

@Service
@RequiredArgsConstructor
public class  UsuarioService {


    private final UsuarioRepository usuarioRepository;

    private final  BCryptPasswordEncoder bCryptPasswordEncoder;

    private final LoginRepository loginRepository;
    // GUARDAR USUARIO

    public Usuario guardarUsuario(Usuario usuarios) {
        return usuarioRepository.save(usuarios);
    }
    // USUARIO EXISTENTE POR USERNAME VALIDACION
    public boolean usuarioExistePorUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    //VALIDACION DE USUARIO Y CONTRASEÑA
    public boolean existsByUsernameAndPassword(String username, String password) {
        return usuarioRepository.existsByUsernameAndPassword(username,password);
    }
    //OBTENER EL ULTIMO CODIGO DE USUARIO

    public String obtenerUltimoCodigoUsuario() {
        return usuarioRepository.obtenerUltimoCodigo();
    }



    // ACTUALZIAR USUARIO

    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    //ACTIVAR USUARIO

    @Transactional
    public Optional<Usuario> activarUsuario(String usCodigo) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usCodigo);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            usuario.setEstado(true); // Cambiar estado a activo
            usuarioRepository.save(usuario);
        }
        return usuarioOpt;
    }
    //DESACTIVAR USUARIO

    @Transactional
    public Optional<Usuario> desactivarUsuario(String usCodigo) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usCodigo);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            usuario.setEstado(false); // Cambiar estado a inactivo
            usuarioRepository.save(usuario);
        }
        return usuarioOpt;
    }


    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // REGISTAR LOGIN

    public Login guardarlogin(Login login) {
        return loginRepository.save(login);
    }

	public List<Usuario> findByUsername(String username) {
		return usuarioRepository.findByUsername(username);
	}


    public Usuario actualizar(UsuarioDTO usuarioDto) throws Exception {
        // Buscar usuario existente
        Optional<Usuario> usuarioExistenteOpt = usuarioRepository.findById(usuarioDto.getUl_Codigo());
        Optional<Login> loginOptional = loginRepository.findById(usuarioDto.getUl_Codigo());
        if (!usuarioExistenteOpt.isPresent()) {
            throw new RuntimeException("El usuario con código " + usuarioDto.getUl_Codigo() + " no existe.");
        }

        Usuario usuarioExistente = usuarioExistenteOpt.get();
        if (usuarioExistente.getPassword().equals(usuarioDto.getPassword())) {
            throw new RuntimeException("La nueva contraseña no puede ser igual a la anterior.");
        }

        // Actualizar Login
        Login login = new Login();
        login.setUl_codigo(usuarioDto.getUl_Codigo());
        login.setUsername(usuarioDto.getUsername());
        login.setPassword(this.bCryptPasswordEncoder.encode(usuarioDto.getPassword()));
        login.setCorreo(loginOptional.get().getCorreo());
        login.setUl_rol(loginOptional.get().getUl_rol());
        login.setEstado(true);

        // Actualizar Usuario
        usuarioExistente.setUsername(usuarioDto.getUsername());
        usuarioExistente.setPassword(usuarioDto.getPassword());
        usuarioExistente.setFechaActualizacion(LocalDate.now());
        usuarioExistente.setHoraActualizacion(LocalTime.now());
        usuarioExistente.setEstado(true);
        usuarioExistente.setRol(usuarioExistente.getRol().getCodigo());

        // Guardar cambios
        loginRepository.save(login);
        return usuarioRepository.save(usuarioExistente);
    }


}