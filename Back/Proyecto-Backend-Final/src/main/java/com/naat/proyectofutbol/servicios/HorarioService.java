package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Horario;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface HorarioService {
    String obtenerUltimoCodigo();
    List<Horario> listarHorarioActivado();
    List<Horario> listarHorarioDesactivado();
    Horario RegistrarHorario (Horario horario);
    Horario actualizarHorario(Horario horario);
    boolean verificarExistenciaHorario(LocalTime inicioHora, LocalTime finHora);
}
