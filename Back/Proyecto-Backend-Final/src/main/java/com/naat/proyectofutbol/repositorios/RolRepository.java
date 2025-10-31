package com.naat.proyectofutbol.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.naat.proyectofutbol.entidades.Rol;

@Repository
public interface RolRepository  extends JpaRepository<Rol,String> {
    Rol findByCodigo(String codigo);
}