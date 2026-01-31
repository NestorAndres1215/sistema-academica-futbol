package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.dto.DetalleLesionRequest;
import com.naat.proyectofutbol.dto.request.LesionesRequest;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.EquipoDev;
import com.naat.proyectofutbol.model.Estudiante;
import com.naat.proyectofutbol.model.Lesiones;
import com.naat.proyectofutbol.model.LesionesDev;
import com.naat.proyectofutbol.repository.EquipoDevRepository;
import com.naat.proyectofutbol.repository.EstudianteRepository;
import com.naat.proyectofutbol.repository.LesionDevRepository;
import com.naat.proyectofutbol.repository.LesionesRepository;
import com.naat.proyectofutbol.service.LesionesService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LesionesServiceImpl implements LesionesService {

    private final LesionesRepository lesionesRepository;
    private final LesionDevRepository lesionDevRepository;
    private final EquipoDevRepository equipoDevRepository;
    private  final EstudianteRepository estudianteRepository;

    @Override
    public List<Lesiones> listarActivos() {
        return lesionesRepository.findByEstadoTrue();
    }

    @Override
    public List<Lesiones> listarInactivos() {
        return lesionesRepository.findByEstadoFalse();
    }

    @Override
    public List<LesionesDev> listarDetalle() {
        return lesionDevRepository.findAll();
    }

    @Override
    public Lesiones registrarLesiones(LesionesRequest dto) {

        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        desactivar(dto.getEquipo());

        Estudiante estudiante = estudianteRepository.findById(dto.getEstudiante())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

        Lesiones lesiones = Lesiones.builder()
                .codigo(nuevoCodigo)
                .descripcion(dto.getDescripcion())
                .comentarios(dto.getComentarios())
                .gravedad(dto.getGravedad())
                .fechaLesion(dto.getFechaLesion())
                .fechaRecuperacion(dto.getFechaRecuperacion())
                .tiempoRecuperacion(dto.getTiempoRecuperacion())
                .tipoLesion(dto.getTipoLesion())
                .estudiante(estudiante)
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .estado(true)
                .build();

        return lesionesRepository.save(lesiones);
    }
    public String obtenerUltimoCodigo() {
        return lesionesRepository.obtenerUltimoCodigo();
    }

    @Override
    public LesionesDev registrarLesionesDev(DetalleLesionRequest dto) {

        String ultimoCodigo = lesionDevRepository.obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        Lesiones lesiones = lesionesRepository.findById(dto.getLesiones())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.LESION_NO_ENCONTRADO));

        LesionesDev lesionesDev = LesionesDev.builder()
                .codigo(nuevoCodigo)
                .descripcion(dto.getDescripcion())
                .observaciones(dto.getObservaciones())
                .fecha(LocalDate.now())
                .hora(LocalTime.now())
                .lesiones(lesiones)
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .build();

        return lesionDevRepository.save(lesionesDev);
    }

    @Override
    public EquipoDev desactivar(String equipoCodigo) {

        EquipoDev equipo = equipoDevRepository.findById(equipoCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPODEV_NO_ENCONTRADO));
        equipo.setEstado(false);
        return equipoDevRepository.save(equipo);
    }

    @Override
    public Optional<Lesiones> buscarPorCodigo(String codigo) {
        return lesionesRepository.findById(codigo);
    }

    @Override
    public List<Lesiones> listarPorGravedad(String gravedad) {
        return lesionesRepository.findByGravedad(gravedad);
    }

    @Override
    public List<Lesiones> listarPorEstudiante(String codigoEstudiante) {
        return lesionesRepository.findByEstudiante_Codigo(codigoEstudiante);
    }

    @Override
    public List<Lesiones> listarPorFechaRecuperacion(LocalDate fecha) {
        return lesionesRepository.findByFechaRecuperacion(fecha);
    }

    @Override
    public List<Lesiones> listarPorRangoRecuperacion(LocalDate inicio, LocalDate fin) {
        return lesionesRepository.findByFechaRecuperacionBetween(inicio, fin);
    }

}
