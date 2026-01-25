package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Menu;
import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.repositorios.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;


    public List<Menu> obtenerMenusPorRol(Rol rol) {
        // Llamamos al repositorio para obtener los menús asociados con el rol
        return menuRepository.findByRol(rol);
    }

}
