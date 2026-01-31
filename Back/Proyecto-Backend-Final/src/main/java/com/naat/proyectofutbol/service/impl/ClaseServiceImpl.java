package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.AlreadyExistsMessages;
import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.dto.request.ClaseDevRequest;
import com.naat.proyectofutbol.dto.request.ClaseRequest;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Clase;
import com.naat.proyectofutbol.model.ClaseDev;
import com.naat.proyectofutbol.model.Equipo;
import com.naat.proyectofutbol.model.Horario;
import com.naat.proyectofutbol.repository.ClaseDevRepository;
import com.naat.proyectofutbol.repository.ClaseRepository;
import com.naat.proyectofutbol.repository.EquipoRepository;
import com.naat.proyectofutbol.repository.HorarioRepository;
import com.naat.proyectofutbol.service.ClaseService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClaseServiceImpl implements ClaseService {

    private final ClaseRepository claseRepository;
    private final HorarioRepository horarioRepository;
    private final ClaseDevRepository claseDevRepository;
    private final EquipoRepository equipoRepository;


    @Override
    public List<Clase> listaractivados() {
        return claseRepository.findByEstadoTrue();
    }

    @Override
    public List<Clase> listardesactivados() {
        return claseRepository.findByEstadoFalse();
    }

    @Override
    public Clase registrar(ClaseRequest claseDTO) {

        String ultimoCodigo = obtenerCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        Horario horario = horarioRepository.findById(claseDTO.getHorario())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.HORARIO_NO_ENCONTRADO));

        Equipo equipo = equipoRepository.findById(claseDTO.getEquipo())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPO_NO_ENCONTRADO));


        Clase clase = Clase.builder()
                .codigo(nuevoCodigo)
                .nombre(claseDTO.getNombre())
                .inicio(claseDTO.getInicio())
                .descripcion(claseDTO.getDescripcion())
                .dia(claseDTO.getDia())
                .fin(claseDTO.getFin())
                .equipo(equipo)
                .horario(horario)
                .estado(true)
                .usuarioCreacion(claseDTO.getUsuarioCreacion())
                .usuarioActualizacion("")
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .build();

        return claseRepository.save(clase);
    }

    @Override
    public Clase actualizar(ClaseRequest claseDTO) {

        Clase claseExistente = claseRepository.findById(claseDTO.getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CLASE_NO_ENCONTRADO));

        Horario horario = horarioRepository.findById(claseDTO.getHorario())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.HORARIO_NO_ENCONTRADO));

        boolean hayCambios = !claseDTO.getInicio().equals(claseExistente.getInicio()) || !claseDTO.getFin().equals(claseExistente.getFin())
                || !horario.equals(claseExistente.getHorario())
                || !claseDTO.getDia().equals(claseExistente.getDia());

        if (hayCambios) {
            if (claseRepository.existsByInicioAndFinAndHorarioAndDia(claseDTO.getInicio(), claseDTO.getFin(), horario, claseDTO.getDia())) {
                throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CLASE_YA_EXISTE);
            }
        }
        Clase claseActualizada = Clase.builder()
                .codigo(claseExistente.getCodigo())
                .nombre(claseDTO.getNombre() != null ? claseDTO.getNombre() : claseExistente.getNombre())
                .descripcion(claseDTO.getDescripcion())
                .inicio(claseDTO.getInicio())
                .fin(claseDTO.getFin())
                .horario(horario)
                .dia(claseDTO.getDia())
                .usuarioActualizacion(claseDTO.getUsuarioCreacion())
                .fechaActualizacion(LocalDate.now())
                .horaActualizacion(LocalTime.now())
                .estado(true)
                .equipo(claseExistente.getEquipo())
                .build();

        return claseRepository.save(claseActualizada);
    }

    @Override
    public List<ClaseDev> listarDevactivados() {
        return claseDevRepository.findByEstadoTrue();
    }

    @Override
    public List<ClaseDev> listarDevdesactivados() {
        return claseDevRepository.findByEstadoFalse();
    }

    @Override
    public ClaseDev registrardev(ClaseDevRequest claseDevDTO) {

        String ultimoCodigo = obtenerCodigoDev();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        Clase clase = claseRepository.findById(claseDevDTO.getClase())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CLASE_NO_ENCONTRADO));

        ClaseDev claseDev = ClaseDev.builder()
                .codigo(nuevoCodigo)
                .titulo(claseDevDTO.getTitulo())
                .dia(claseDevDTO.getDia())
                .objetivo(claseDevDTO.getObjetivo())
                .descripcion(claseDevDTO.getDescripcion())
                .clase(clase)
                .usuarioCreacion(claseDevDTO.getUsuarioCreacion())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .estado(true)
                .build();

        return claseDevRepository.save(claseDev);
    }

    @Override
    public ClaseDev actualizardev(ClaseDevRequest claseDevDTO) {

        ClaseDev claseExistente = claseDevRepository.findById(claseDevDTO.getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CLASEDEV_NO_ENCONTRADO));

        Clase clase = claseRepository.findById(claseDevDTO.getClase())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CLASE_NO_ENCONTRADO));

        ClaseDev claseActualizada = ClaseDev.builder()
                .codigo(claseExistente.getCodigo())
                .titulo(claseDevDTO.getTitulo())
                .dia(claseDevDTO.getDia())
                .objetivo(claseDevDTO.getObjetivo())
                .descripcion(claseDevDTO.getDescripcion())
                .clase(clase)
                .estado(true)
                .usuarioCreacion(claseExistente.getUsuarioCreacion())
                .usuarioActualizacion(claseDevDTO.getUsuarioActualizacion())
                .fechaCreacion(claseExistente.getFechaCreacion())
                .horaCreacion(claseExistente.getHoraCreacion())
                .fechaActualizacion(LocalDate.now())
                .horaActualizacion(LocalTime.now())
                .build();

        return claseDevRepository.save(claseActualizada);
    }

    public String obtenerCodigo() {
        return claseRepository.obtenerUltimoCodigo();
    }

    public String obtenerCodigoDev() {
        return claseDevRepository.obtenerUltimoCodigo();
    }

    public boolean existsByInicioAndFinAndHorarioAndDia(LocalDate inicio, LocalDate fin, Horario horario, String dia) {
        return claseRepository.existsByInicioAndFinAndHorarioAndDia(inicio, fin, horario, dia);
    }

}
