package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.repositorios.RolRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class  RolService {


    private final RolRepository rolRepository;


    public List<Rol> listarRoles() {
        return rolRepository.findAll(); // Devuelve todos los roles
    }
    public List<Rol> findByRol(String nombre) {
        return rolRepository.findByRol(nombre);
    }
}
