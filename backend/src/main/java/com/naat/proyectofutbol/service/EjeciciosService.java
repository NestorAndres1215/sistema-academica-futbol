package com.naat.proyectofutbol.service;


import com.naat.proyectofutbol.dto.request.EjercicioRequest;
import com.naat.proyectofutbol.model.Ejercicio;

import java.util.List;

public interface EjeciciosService {

    List<Ejercicio> lista();

    Ejercicio registrar(EjercicioRequest ejercicioDTO);

    Ejercicio actualizar(EjercicioRequest ejercicioDTO);
}
