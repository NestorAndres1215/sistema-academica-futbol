package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Menu;
import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.repositorios.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepository;

   @Override
    public List<Menu> obtenerMenusPorRol(Rol rol) {
        // Llamamos al repositorio para obtener los menús asociados con el rol
        return menuRepository.findByRol(rol);
    }
 /*
    @Override
    public List<Menu> obtenerMenusPorRolYTipo(Rol rol, String tipo) {
        return menuRepository.findByRolAndTipo(rol, tipo);
    }*/
}
