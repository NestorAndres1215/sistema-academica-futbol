package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.EjercicioDTO;
import com.naat.proyectofutbol.entidades.Ejercicio;

import java.util.List;

public interface EjercicioService {
    String obtenerCodigo();
    List<Ejercicio> lista();
    Ejercicio registrar(EjercicioDTO ejercicioDTO)throws Exception;
    Ejercicio actualizar(EjercicioDTO ejercicioDTO)throws Exception;
}
