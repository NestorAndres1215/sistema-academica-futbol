package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Cargo;
import com.naat.proyectofutbol.entidades.Sede;

import java.util.List;

public interface CargoService {

    Cargo guardarCargo(Cargo cargo);

    Cargo actualizarCargo(Cargo cargo);

    String obtenerUltimoCodigo();

    List<Cargo> findAdminsByEstadoTrue();

    List<Cargo> findAdminsByEstadoFalse();

    Cargo desactivarSede(String sedeCodigo);

    Cargo activarSede(String sedeCodigo);

    boolean ExistePorNombre(String nombre);

    List<Cargo> findByNombre(String nombre);
}
