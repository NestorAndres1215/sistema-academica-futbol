package com.naat.proyectofutbol.servicios;


import com.naat.proyectofutbol.dto.AsignacionDTO;
import com.naat.proyectofutbol.dto.AsignacionEstudiante;
import com.naat.proyectofutbol.dto.EquipoDTO;
import com.naat.proyectofutbol.dto.EstudianteDTO;
import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.entidades.EquipoDev;
import com.naat.proyectofutbol.entidades.Estudiante;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface EquipoService {
    List<Equipo> listaractivados();
    List<Equipo> listardesactivados();
    Equipo registrar(EquipoDTO equipoDTO) throws Exception;
    Equipo actualizar (EquipoDTO equipoDTO)throws  Exception;
    String obtenerCodigo();
    String obtenerCodigoDev();
    Equipo desactivar(String usuarioCodigo);
    Equipo activar(String usuarioCodigo);
    List<EquipoDev>finall();
    List<EquipoDev> regEquipo(List<AsignacionDTO> asignacionDTOS) throws Exception;
    List<EquipoDev>listarEquipoDevActivados();
    EquipoDev  eliminarEquipo(String  usuarioCodigo);
    List<EquipoDev> listar();
    void eliminar(String codigo);
    List<EquipoDev> actualizarEquipoEstudiante(List<AsignacionEstudiante> asignacionEstudiantes) throws Exception;

}
