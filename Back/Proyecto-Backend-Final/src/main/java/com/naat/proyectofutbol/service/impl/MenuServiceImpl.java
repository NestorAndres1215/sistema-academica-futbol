package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.model.Menu;
import com.naat.proyectofutbol.model.Rol;
import com.naat.proyectofutbol.repository.MenuRepository;
import com.naat.proyectofutbol.service.MenuService;
import com.naat.proyectofutbol.service.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    private final RolService rolService;
@Override
    public List<Menu> listar() {
        return menuRepository.findAll();
    }
@Override
    public List<Menu> obtenerMenusPorRol(Optional<Rol> rol) {
        // Llamamos al repositorio para obtener los menús asociados con el rol
        return menuRepository.findByRol(rol);
    }

}
