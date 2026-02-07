package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.AsignacionRequest;
import com.naat.proyectofutbol.dto.request.AsignacionEstudianteRequest;
import com.naat.proyectofutbol.dto.request.EquipoRequest;
import com.naat.proyectofutbol.model.Equipo;
import com.naat.proyectofutbol.model.EquipoDev;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface EquipoService {

    List<EquipoDev> listar();

    List<Equipo> listaractivados();

    List<Equipo> listardesactivados();

    List<EquipoDev> listarEquipoDevActivados();

    Equipo registrar(EquipoRequest equipoDTO);

    Equipo actualizar(EquipoRequest equipoDTO);

    Equipo desactivar(String usuarioCodigo);

    Equipo activar(String usuarioCodigo);

    List<EquipoDev> regEquipo(List<AsignacionRequest> asignacionDTOS);

    List<EquipoDev> actualizarEquipoEstudiante(@Valid List<AsignacionEstudianteRequest> asignacionEstudiantes);

    EquipoDev eliminarEquipo(String usuarioCodigo);

    Optional<Equipo> buscarPorCodigo(String codigo);

    List<Equipo> listarPorSede(String sede);

    List<Equipo> listarPorNombre(String nombre);

    List<Equipo> listarPorGenero(String genero);

}
