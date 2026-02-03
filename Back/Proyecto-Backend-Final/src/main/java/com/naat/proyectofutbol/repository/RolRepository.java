package com.naat.proyectofutbol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.naat.proyectofutbol.model.Rol;

import java.util.List;
import java.util.Optional;


public interface RolRepository  extends JpaRepository<Rol,String> {
    Optional<Rol> findByCodigo(String codigo);

    Optional<Rol> findByRol(String nombre);
}