package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Menu;
import com.naat.proyectofutbol.model.Rol;

import java.util.List;
import java.util.Optional;

public interface MenuService {
    List<Menu> listar();

    List<Menu> obtenerMenusPorRol(Optional<Rol> rol);
}
