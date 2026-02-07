package com.naat.proyectofutbol.security;

import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Login;
import com.naat.proyectofutbol.model.Usuario;
import com.naat.proyectofutbol.repository.LoginRepository;
import com.naat.proyectofutbol.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class AuthoryConfigService implements UserDetailsService {

    private final LoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Login login = Optional.ofNullable(loginRepository.findByUsername(username))
                .orElseThrow(() -> new UsernameNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        if (!login.getEstado()) {
            throw new UsernameNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO);
        }

        return login;
    }

}
