package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.AsignacionRequest;
import com.naat.proyectofutbol.dto.request.AsignacionEstudianteRequest;
import com.naat.proyectofutbol.dto.request.EquipoRequest;
import com.naat.proyectofutbol.model.Equipo;
import com.naat.proyectofutbol.model.EquipoDev;

import javax.validation.Valid;
import java.util.List;

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
}
