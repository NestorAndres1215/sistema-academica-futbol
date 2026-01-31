package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Login;
import com.naat.proyectofutbol.model.Rol;
import com.naat.proyectofutbol.repository.LoginRepository;
import com.naat.proyectofutbol.repository.RolRepository;
import com.naat.proyectofutbol.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final LoginRepository loginRepository;
    private final RolRepository rolRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Login registrar(String codigo, String username, String contrasena, String roles) {
        Rol rol = rolRepository.findByRol(roles)
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado: ADMINISTRADOR"));

        Login login = Login.builder()
                .ul_codigo(codigo)
                .username(username)
                .password(this.bCryptPasswordEncoder.encode(contrasena))
                .estado(true)
                .ul_rol(roles)
                .build();

        return loginRepository.save(login);
    }

    @Override
    public Login actualizar(String codigo, String username, String contrasena, String roles) {

        Login login = loginRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException("Login no encontrado: " + codigo));

        if (roles != null && !roles.equals(login.getUl_rol())) {

            Rol rol = rolRepository.findByRol(roles).orElseThrow(() ->
                            new ResourceNotFoundException("Rol no encontrado: " + roles));

            login.setUl_rol(roles);
        }

        return loginRepository.save(login);
    }

    @Override
    public Login activarUsuario(String codigo) {
        Login login = loginRepository.findById(codigo)
                .orElseThrow(() -> new RuntimeException("Login no encontrado con el código: " + codigo));
        login.setEstado(true);
        return loginRepository.save(login);
    }

    @Override
    public Login desactivarUsuario(String codigo) {
        Login login = loginRepository.findById(codigo)
                .orElseThrow(() -> new RuntimeException("Login no encontrado con el código: " + codigo));
        login.setEstado(false);
        return loginRepository.save(login);
    }
}
