package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.constrainst.UsuarioError;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.repositorios.LoginRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private LoginRepository usuarioRepository;
@Autowired
private UsuarioRepository usuario2Repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
 Usuario usuarioActivado= this.usuario2Repository.findByUsernameAndEstado(username);
		Login usuario = this.usuarioRepository.findByUsername(username);

	        if(usuarioActivado == null){
				usuario=null;
				throw new IllegalArgumentException(UsuarioError.USUARIO_NO_ENCONTRADO.getMensaje());
	      //      throw new UsernameNotFoundException("Usuario no encontrado");
	        }
		return usuario;
	}


}
