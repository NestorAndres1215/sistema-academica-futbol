package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Sede;

import java.util.List;

public interface SedeService {

    List<Sede> listarSedes();

    String obtenerUltimoCodigo();

    Sede guardarSede(Sede sede);

    Sede actualizarSede(Sede sede);

    List<Sede> findAdminsByEstadoTrue();

    List<Sede> findAdminsByEstadoFalse();

    Sede BuscarNombre(String nombre);

    Sede desactivarSede(String codigo);

    Sede activarSede(String codigo);

    Sede buscarPorCodigo(String codigo);
}
