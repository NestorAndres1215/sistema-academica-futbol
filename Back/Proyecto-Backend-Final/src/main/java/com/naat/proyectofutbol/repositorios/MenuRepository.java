package com.naat.proyectofutbol.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import com.naat.proyectofutbol.entidades.Menu;
import com.naat.proyectofutbol.entidades.Rol;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,String> {
    List<Menu> findByRol(Rol rol);
   // List<Menu> findByRolAndTipo( Rol rol, String tipo);
    List<Menu> findByNivel(Integer menuNivel);
}