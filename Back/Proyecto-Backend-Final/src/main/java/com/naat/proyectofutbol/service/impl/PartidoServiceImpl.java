package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.dto.request.PartidoRequest;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Equipo;
import com.naat.proyectofutbol.model.Partido;
import com.naat.proyectofutbol.repository.EquipoRepository;
import com.naat.proyectofutbol.repository.PartidoRepository;
import com.naat.proyectofutbol.service.PartidoService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidoServiceImpl implements PartidoService {

    private final PartidoRepository partidoRepository;

    private final EquipoRepository equipoRepository;


    @Override
    public List<Partido> listar() {
        return partidoRepository.findAll();
    }

    @Override
    public List<Partido> findByEstadoTrue() {
        return partidoRepository.findByEstadoTrue();
    }

    @Override
    public List<Partido> findByEstadoFalse() {
        return partidoRepository.findByEstadoFalse();
    }

    @Override
    public Partido registrarPartido(PartidoRequest partidoDTO) {

        String ultimoCodigo = obtenerUltimoCodigoPartido();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        if (validar(partidoDTO.getFecha(), partidoDTO.getHora(), partidoDTO.getEquipo())) {
            throw new ResourceAlreadyExistsException(
                    "Ya existe un partido registrado con la misma fecha, hora y equipo"
            );
        }

        Equipo equipo = equipoRepository.findById(partidoDTO.getEquipo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipo no encontrado con código " + partidoDTO.getEquipo()
                        )
                );

        Partido partido = Partido.builder()
                .codigo(nuevoCodigo)
                .equipoRival(partidoDTO.getEquipoRival())
                .derrota(partidoDTO.getDerrota())
                .victoria(partidoDTO.getVictoria())
                .marcadorLocal(partidoDTO.getMarcadorLocal())
                .marcadorVisita(partidoDTO.getMarcadorVisita())
                .tipoPartido(partidoDTO.getTipoPartido())
                .lugar(partidoDTO.getLugar())
                .hora(partidoDTO.getHora())
                .fecha(partidoDTO.getFecha())
                .estado(true)
                .usuarioCreacion(partidoDTO.getUsuarioCreacion())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .equipo(equipo)
                .comentarios(partidoDTO.getComentarios())
                .build();

        return partidoRepository.save(partido);
    }

    @Override
    public Partido actualizarPartido(PartidoRequest dto) {

        Partido partido = partidoRepository.findById(dto.getCodigo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "El partido con código " + dto.getCodigo() + " no existe"
                        )
                );
        Equipo equipo = equipoRepository.findById(dto.getEquipo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipo no encontrado con código " + dto.getEquipo()
                        )
                );

        partido.setEquipoRival(dto.getEquipoRival());
        partido.setDerrota(dto.getDerrota());
        partido.setVictoria(dto.getVictoria());
        partido.setMarcadorLocal(dto.getMarcadorLocal());
        partido.setMarcadorVisita(dto.getMarcadorVisita());
        partido.setTipoPartido(dto.getTipoPartido());
        partido.setLugar(dto.getLugar());
        partido.setHora(dto.getHora());
        partido.setFecha(dto.getFecha());
        partido.setEquipo(equipo);
        partido.setComentarios(dto.getComentarios());

        partido.setUsuarioActualizacion(dto.getUsuarioActualizacion());
        partido.setFechaActualizacion(LocalDate.now());
        partido.setHoraActualizacion(LocalTime.now());

        return partidoRepository.save(partido);
    }

    @Override
    public Partido actualizarPartidoSegundo(PartidoRequest dto) {

        Partido partido = partidoRepository.findById(dto.getCodigo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "El partido con código " + dto.getCodigo() + " no existe"
                        )
                );

        Equipo equipo = equipoRepository.findById(dto.getEquipo())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Equipo no encontrado con código " + dto.getEquipo()
                        )
                );
        partido.setEquipoRival(dto.getEquipoRival());
        partido.setDerrota(dto.getDerrota());
        partido.setVictoria(dto.getVictoria());
        partido.setMarcadorLocal(dto.getMarcadorLocal());
        partido.setMarcadorVisita(dto.getMarcadorVisita());
        partido.setTipoPartido(dto.getTipoPartido());
        partido.setLugar(dto.getLugar());
        partido.setHora(dto.getHora());
        partido.setFecha(dto.getFecha());
        partido.setEquipo(equipo);
        partido.setComentarios(dto.getComentarios());
        partido.setEstado(false);
        partido.setUsuarioActualizacion(dto.getUsuarioActualizacion());
        partido.setFechaActualizacion(LocalDate.now());
        partido.setHoraActualizacion(LocalTime.now());

        return partidoRepository.save(partido);
    }


    @Scheduled(fixedRate = 60000)
    public void desactivarPartidosPasados() {
        List<Partido> partidos = partidoRepository.findByEstadoTrue();
        LocalDateTime ahora = LocalDateTime.now();

        for (Partido partido : partidos) {
            LocalDateTime fechaHoraPartido =
                    LocalDateTime.of(partido.getFecha(), partido.getHora());

            if (fechaHoraPartido.isBefore(ahora)) {
                partido.setEstado(false);
                partidoRepository.save(partido);
            }
        }
    }


    public boolean validar(LocalDate fecha, LocalTime hora, String codigoEquipo) {

        Equipo equipo = equipoRepository.findById(codigoEquipo)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Equipo no encontrado")
                );

        return partidoRepository.existsByFechaAndHoraAndEquipo(fecha, hora, equipo);
    }

    public String obtenerUltimoCodigoPartido() {
        return partidoRepository.obtenerUltimoCodigoPartido();
    }

    public boolean existsByFechaAndHoraAndEquipo(LocalDate fecha, LocalTime hora, Equipo equipo) {
        return partidoRepository.existsByFechaAndHoraAndEquipo(fecha, hora, equipo);
    }

}
