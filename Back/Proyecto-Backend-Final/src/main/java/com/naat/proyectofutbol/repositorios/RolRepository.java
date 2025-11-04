package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Sede;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.naat.proyectofutbol.entidades.Rol;

import java.util.List;

@Repository
public interface RolRepository  extends JpaRepository<Rol,String> {
    Rol findByCodigo(String codigo);
    List<Rol> findByRol(String nombre);
}