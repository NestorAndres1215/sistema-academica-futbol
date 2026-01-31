package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.dto.request.AsignacionRequest;
import com.naat.proyectofutbol.dto.request.AsignacionEstudianteRequest;
import com.naat.proyectofutbol.dto.request.EquipoRequest;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.*;
import com.naat.proyectofutbol.repository.*;
import com.naat.proyectofutbol.service.EquipoService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EquipoServiceImpl implements EquipoService {

    private final EquipoRepository equipoRepository;
    private final SedeRepository sedeRepository;
    private final EquipoDevRepository equipoDevRepository;
    private final EstudianteRepository estudianteRepository;

    private final ProfesorRepository profesorRepository;

    private final EvaluacionRepository evaluacionRepository;

    private final EvaluacionDevRepository evaluacionDevRepository;

    @Override
    public List<EquipoDev> listar() {
        return equipoDevRepository.findAll();
    }

    @Override
    public List<Equipo> listaractivados() {
        return equipoRepository.findByEstadoTrue();
    }


    @Override
    public List<Equipo> listardesactivados() {
        return equipoRepository.findByEstadoFalse();
    }

    @Override
    public List<EquipoDev> listarEquipoDevActivados() {
        return equipoDevRepository.findByEstadoTrue();
    }

    @Override
    public Equipo registrar(EquipoRequest dto) {

        String ultimoCodigo = obtenerCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        Sede sede = sedeRepository.findById(dto.getSede())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.SEDE_NO_ENCONTRADO));

        Equipo equipo = Equipo.builder()
                .codigo(nuevoCodigo)
                .nombre(dto.getNombre())
                .categoria(dto.getCategoria())
                .sede(sede.getNombre())
                .genero(dto.getGenero())
                .estado(true)
                .usuarioRegistro(dto.getUsuarioRegistro())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .build();
        return equipoRepository.save(equipo);
    }

    @Override
    public Equipo actualizar(EquipoRequest dto) {

        Equipo equipo = equipoRepository.findById(dto.getCodigo())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPO_NO_ENCONTRADO));

        Sede sede = sedeRepository.findById(dto.getSede())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.SEDE_NO_ENCONTRADO));

        equipo.setCodigo(dto.getCodigo());
        equipo.setNombre(dto.getNombre());
        equipo.setCategoria(dto.getCategoria());
        equipo.setSede(sede.getNombre());
        equipo.setGenero(dto.getGenero());
        equipo.setEstado(true);
        equipo.setUsuarioActualizacion(dto.getUsuarioRegistro());
        equipo.setFechaActualizacion(LocalDate.now());
        equipo.setHoraActualizacion(LocalTime.now());

        return equipoRepository.save(equipo);
    }

    @Override
    public Equipo desactivar(String usuarioCodigo) {

        Equipo equipo = equipoRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPO_NO_ENCONTRADO));
        equipo.setEstado(false);
        return equipoRepository.save(equipo);
    }

    @Override
    public Equipo activar(String usuarioCodigo) {

        Equipo equipo = equipoRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPO_NO_ENCONTRADO));
        equipo.setEstado(true);
        return equipoRepository.save(equipo);
    }

    @Override
    public List<EquipoDev> regEquipo(List<AsignacionRequest> asignacionDTOS) {

        List<EquipoDev> equipoRegistrado = new ArrayList<>();
        List<Evaluacion> evaluacionRegistrado = new ArrayList<>();
        List<EvaluacionDev> detalleRegistrado = new ArrayList<>();
        String ultimoCodigoEquipoDev = obtenerCodigoDev();

        String ultimoCodigoEvaluacion = evaluacionRepository.obtenerUltimoCodigo();
        String ultimoCodigoDetalle = evaluacionDevRepository.obtenerUltimoCodigo();

        Set<String> codigosGenerados = new HashSet<>();

        for (AsignacionRequest equipoDev : asignacionDTOS) {

            String[] datosEstudiante = equipoDev.getEstudiante().split(" ");
            String[] datosProfesor = equipoDev.getProfesor().split(" ");

            String primerNombreEstudiante = datosEstudiante.length > 0 ? datosEstudiante[0] : "";
            String apellidoPaternoEstudiante = datosEstudiante.length > 1 ? datosEstudiante[1] : "";
            String apellidoMaternoEstudiante = datosEstudiante.length > 2 ? datosEstudiante[2] : "";

            String primerNombreProfesor = datosProfesor.length > 0 ? datosProfesor[0] : "";
            String apellidoPaternoProfesor = datosProfesor.length > 1 ? datosProfesor[1] : "";
            String apellidoMaternoProfesor = datosProfesor.length > 2 ? datosProfesor[2] : "";


            Optional<Estudiante> estudiante1 = estudianteRepository.findByPrimerNombreAndApellidoPaternoAndApellidoMaterno(
                    primerNombreEstudiante, apellidoPaternoEstudiante, apellidoMaternoEstudiante
            );

            Optional<Profesor> profesor1 = profesorRepository.findByPrimerNombreAndApellidoPaternoAndApellidoMaterno(
                    primerNombreProfesor, apellidoPaternoProfesor, apellidoMaternoProfesor
            );

            String codigoEstudiante = estudiante1.map(Estudiante::getCodigo).orElse("0000");
            String codigoProfesor = profesor1.map(Profesor::getCodigo).orElse("0000");

            if ("0000".equals(codigoProfesor)) {

                String nuevoCodigoEvaluacion;
                do {
                    nuevoCodigoEvaluacion = Utilitarios.incrementarSecuencia(ultimoCodigoEvaluacion);
                } while (codigosGenerados.contains(nuevoCodigoEvaluacion));
                codigosGenerados.add(nuevoCodigoEvaluacion);
                ultimoCodigoEvaluacion = nuevoCodigoEvaluacion;

                Estudiante estudiante = estudianteRepository.findById(codigoEstudiante)
                        .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

                Profesor profesor = profesorRepository.findById(codigoProfesor)
                        .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROFESOR_NO_ENCONTRADO));

                Equipo equipoExistente = equipoRepository.findById(equipoDev.getCodigo())
                        .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPO_NO_ENCONTRADO));

                Evaluacion evaluacion = Evaluacion.builder()
                        .codigo(ultimoCodigoEvaluacion)
                        .comentarios("")
                        .estudiante(estudiante)
                        .notaFinal(0)
                        .build();
                evaluacionRegistrado.add(evaluacion);

                ultimoCodigoDetalle = Utilitarios.incrementarSecuencia(ultimoCodigoDetalle);

                EvaluacionDev evaluacionDev = EvaluacionDev.builder()
                        .codigo(ultimoCodigoDetalle)
                        .equipo(equipoDev.getCodigo())
                        .evaluacion(evaluacion)
                        .estado(true)
                        .conteo("0001")
                        .build();

                detalleRegistrado.add(evaluacionDev);

                ultimoCodigoEquipoDev = Utilitarios.incrementarSecuencia(ultimoCodigoEquipoDev);
                EquipoDev equipoDev1 = EquipoDev.builder()
                        .codigo(ultimoCodigoEquipoDev)
                        .estudiante(estudiante)
                        .profesor(profesor)
                        .fechaCreacion(LocalDate.now())
                        .horaCreacion(LocalTime.now())
                        .equipo(equipoExistente)
                        .estado(true)
                        .build();
                equipoRegistrado.add(equipoDev1);
            } else {

                Estudiante estudiante = estudianteRepository.findById(codigoEstudiante)
                        .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

                Profesor profesor = profesorRepository.findById(codigoProfesor)
                        .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROFESOR_NO_ENCONTRADO));

                Equipo equipoExistente = equipoRepository.findById(equipoDev.getCodigo())
                        .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPO_NO_ENCONTRADO));

                ultimoCodigoEquipoDev = Utilitarios.incrementarSecuencia(ultimoCodigoEquipoDev);
                EquipoDev equipoDev1 = EquipoDev.builder()
                        .codigo(ultimoCodigoEquipoDev)
                        .estudiante(estudiante)
                        .profesor(profesor)
                        .fechaCreacion(LocalDate.now())
                        .horaCreacion(LocalTime.now())
                        .equipo(equipoExistente)
                        .estado(true)
                        .build();
                equipoRegistrado.add(equipoDev1);
            }
        }


        return equipoRegistrado;
    }

    @Override
    public List<EquipoDev> actualizarEquipoEstudiante(@Valid List<AsignacionEstudianteRequest> asignacionEstudiantes) {

        List<EquipoDev> equipoRegistrado = new ArrayList<>();

        for (AsignacionEstudianteRequest asignacionEstudiante : asignacionEstudiantes) {

            EquipoDev equipoExistente = equipoDevRepository.findById(asignacionEstudiante.getCodigo())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPODEV_NO_ENCONTRADO));

            Equipo equipo = equipoRepository.findById(asignacionEstudiante.getEquipo())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EQUIPODEV_NO_ENCONTRADO));

            Estudiante estudiante = estudianteRepository.findById(asignacionEstudiante.getEstudiante())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

            Profesor profesor = profesorRepository.findById(asignacionEstudiante.getProfesor())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROFESOR_NO_ENCONTRADO));

            equipoExistente.setCodigo(asignacionEstudiante.getCodigo());
            equipoExistente.setNumeroCamiseta(asignacionEstudiante.getNumeroCamiseta());
            equipoExistente.setPosicion(asignacionEstudiante.getPosicion());
            equipoExistente.setEsCapitan(asignacionEstudiante.isEsCapitan());
            equipoExistente.setEstado(asignacionEstudiante.isEstado());
            equipoExistente.setUsuarioActualizacion(asignacionEstudiante.getUsuarioActualizacion());
            equipoExistente.setFechaActualizacion(LocalDate.now());
            equipoExistente.setHoraActualizacion(LocalTime.now());
            equipoExistente.setEstudiante(estudiante);
            equipoExistente.setProfesor(profesor);
            equipoExistente.setEquipo(equipo);
            equipoRegistrado.add(equipoExistente);
        }
        equipoDevRepository.saveAll(equipoRegistrado);
        return equipoRegistrado;
    }

    @Override
    public EquipoDev eliminarEquipo(String usuarioCodigo) {

        EquipoDev equipoDev = EquipoDev.builder()
                .codigo(usuarioCodigo)
                .build();

        equipoRepository.deleteById(usuarioCodigo);
        return equipoDev;
    }


    public String obtenerCodigo() {
        return equipoRepository.obtenerUltimoCodigo();
    }

    public String obtenerCodigoDev() {
        return equipoDevRepository.obtenerUltimoCodigoDev();
    }

}
