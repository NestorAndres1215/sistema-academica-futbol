package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Horario;

import java.time.LocalTime;
import java.util.List;

public interface HorarioService {

    String obtenerUltimoCodigo();

    List<Horario> listar();

    List<Horario> listarHorarioActivado();

    List<Horario> listarHorarioDesactivado();

    Horario RegistrarHorario(Horario horario);

    boolean verificarExistenciaHorario(LocalTime inicioHora, LocalTime finHora);

    Horario actualizarHorario(Horario horario);


}
