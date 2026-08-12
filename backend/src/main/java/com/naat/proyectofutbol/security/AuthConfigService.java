package com.naat.proyectofutbol.security;

import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.model.Login;
import com.naat.proyectofutbol.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class AuthConfigService implements UserDetailsService {

    private final LoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Login login = loginRepository.findByUsername(username);

        if (login == null || !login.getEstado()) {
            throw new UsernameNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO);
        }

        return login;
    }
}
