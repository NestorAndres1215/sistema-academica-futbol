package com.naat.proyectofutbol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.naat.proyectofutbol.model.Menu;
import com.naat.proyectofutbol.model.Rol;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, String> {

    List<Menu> findByRol(Optional<Rol> rol);

    List<Menu> findByNivel(Integer menuNivel);
}