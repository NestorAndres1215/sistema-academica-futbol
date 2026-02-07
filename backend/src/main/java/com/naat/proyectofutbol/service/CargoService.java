package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Cargo;


import java.util.List;


public interface CargoService {

    Cargo guardarCargo(Cargo cargo);

    Cargo actualizarCargo(Cargo cargo);

    String obtenerUltimoCodigo();

    List<Cargo> findAdminsByEstadoTrue();

    List<Cargo> findAdminsByEstadoFalse();

    Cargo desactivarCargo(String sedeCodigo);

    Cargo activarSede(String sedeCodigo);

    Cargo findByNombre(String nombre);

}
