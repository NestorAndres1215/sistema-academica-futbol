package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.ClaseDevRequest;
import com.naat.proyectofutbol.dto.request.ClaseRequest;
import com.naat.proyectofutbol.model.Clase;
import com.naat.proyectofutbol.model.ClaseDev;

import java.util.List;

public interface ClaseService {

    List<Clase> listaractivados();

    List<Clase> listardesactivados();

    Clase registrar(ClaseRequest claseDTO);

    Clase actualizar(ClaseRequest claseDTO);

    List<ClaseDev> listarDevactivados();

    List<ClaseDev> listarDevdesactivados();

    ClaseDev registrardev(ClaseDevRequest claseDevDTO);

    ClaseDev actualizardev(ClaseDevRequest claseDevDTO);
}
