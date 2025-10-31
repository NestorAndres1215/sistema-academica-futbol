package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.repositorios.RolRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository rolRepository;

    @Override
    public List<Rol> listarRoles() {
        return rolRepository.findAll(); // Devuelve todos los roles
    }
}
