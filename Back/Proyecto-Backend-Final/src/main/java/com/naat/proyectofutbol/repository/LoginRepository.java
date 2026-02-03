package com.naat.proyectofutbol.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.naat.proyectofutbol.model.Login;


public interface LoginRepository extends JpaRepository<Login, String> {

     Login findByUsername(String username);

}