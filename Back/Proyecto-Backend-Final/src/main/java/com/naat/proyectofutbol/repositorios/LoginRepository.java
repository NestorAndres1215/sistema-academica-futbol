package com.naat.proyectofutbol.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.naat.proyectofutbol.modelo.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {

    public Login findByUsername(String username);

}