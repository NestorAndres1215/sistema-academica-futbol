package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Menu;
import com.naat.proyectofutbol.entidades.Rol;

import java.util.List;

public interface MenuService {
   List<Menu> obtenerMenusPorRol(Rol rol);
    //   List<Menu> obtenerMenusPorRolYTipo(Rol rol, String tipo);
}