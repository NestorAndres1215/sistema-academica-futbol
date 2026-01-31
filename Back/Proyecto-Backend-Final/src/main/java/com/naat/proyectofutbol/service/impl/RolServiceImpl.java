package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Rol;
import com.naat.proyectofutbol.repository.RolRepository;
import com.naat.proyectofutbol.service.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;

    @Override
    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }

    @Override
    public Rol findByRol(String nombre) {
        return rolRepository.findByRol(nombre).orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado:  ADMINISTRADOR"));
    }

    @Override
    public Rol registrarRol(Rol rol) {
        rol.setFechaCreacion(LocalDate.now());
        rol.setHoraCreacion(LocalTime.now());
        return rolRepository.save(rol);
    }

    @Override
    public Rol actualizarRol(String codigo, Rol rol) {

        Rol rolDB = rolRepository.findById(codigo)
                .orElseThrow(() -> new RuntimeException("Rol no existe"));

        rolDB.setRol(rol.getRol());
        rolDB.setFechaActualizacion(LocalDate.now());
        rolDB.setHoraActualizacion(LocalTime.now());

        return rolRepository.save(rolDB);
    }
}
