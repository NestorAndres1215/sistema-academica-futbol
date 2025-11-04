package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Menu;
import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.repositorios.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;


    public List<Menu> obtenerMenusPorRol(Rol rol) {
        // Llamamos al repositorio para obtener los menús asociados con el rol
        return menuRepository.findByRol(rol);
    }

}
