package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.AlreadyExistsMessages;
import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Horario;
import com.naat.proyectofutbol.repository.HorarioRepository;
import com.naat.proyectofutbol.service.HorarioService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class HorarioServiceImpl implements HorarioService {

    private final HorarioRepository horarioRepository;


    @Override
    public String obtenerUltimoCodigo() {
        return horarioRepository.obtenerUltimoCodigo();
    }

    @Override
    public List<Horario> listar() {
        return horarioRepository.findAll();
    }

    @Override
    public List<Horario> listarHorarioActivado() {
        return horarioRepository.findByEstadoTrue();
    }

    @Override
    public List<Horario> listarHorarioDesactivado() {
        return horarioRepository.findByEstadoFalse();
    }

    @Override
    public Horario RegistrarHorario(Horario horario) {

        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        validarHorarioUnico(horario.getInicioHora(), horario.getFinHora());

        Horario nuevoHorario = Horario.builder()
                .codigo(nuevoCodigo)
                .inicioHora(horario.getInicioHora())
                .finHora(horario.getFinHora())
                .usuarioRegistro(horario.getUsuarioRegistro())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .estado(true)
                .build();

        return horarioRepository.save(nuevoHorario);
    }

    private void validarHorarioUnico(LocalTime inicio, LocalTime fin) {
        if (horarioRepository.existsByInicioHoraAndFinHora(inicio, fin)) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.HORARIO_YA_EXISTE);
        }
    }

    @Override
    public boolean verificarExistenciaHorario(LocalTime inicioHora, LocalTime finHora) {
        return horarioRepository.existsByInicioHoraAndFinHora(inicioHora, finHora);
    }

    @Override
    public Horario actualizarHorario(Horario horario) {
        Horario horarioExistente = horarioRepository.findById(horario.getCodigo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.HORARIO_NO_ENCONTRADO)
                );


        boolean cambioHorario =
                !horarioExistente.getInicioHora().equals(horario.getInicioHora()) ||
                        !horarioExistente.getFinHora().equals(horario.getFinHora());

        if (cambioHorario && verificarExistenciaHorario(horario.getInicioHora(), horario.getFinHora())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.HORARIO_YA_EXISTE);
        }

        horarioExistente.setInicioHora(horario.getInicioHora());
        horarioExistente.setFinHora(horario.getFinHora());
        horarioExistente.setUsuarioActualizacion(horario.getUsuarioRegistro());
        horarioExistente.setFechaActualizacion(LocalDate.now());
        horarioExistente.setHoraActualizacion(LocalTime.now());
        horarioExistente.setEstado(true);

        return horarioRepository.save(horarioExistente);
    }
}
