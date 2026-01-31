package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Rol;

import java.util.List;

public interface RolService {

    List<Rol> listarRoles();

    Rol findByRol(String nombre);

    Rol registrarRol(Rol rol);

    Rol actualizarRol(String codigo, Rol rol);
}