package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.AsignacionDTO;
import com.naat.proyectofutbol.dto.AsignacionEstudiante;
import com.naat.proyectofutbol.dto.EquipoDTO;

import com.naat.proyectofutbol.entidades.*;
import com.naat.proyectofutbol.repositorios.*;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class EquipoServiceImpl implements EquipoService{
    @Autowired
    private EquipoRepository equipoRepository ;
    @Autowired
    private EquipoDevRepository equipoDevRepository;
    @Autowired
    private EstudianteRepository estudianteRepository;
    @Autowired
    private ProfesorRepository profesorRepository;
    @Autowired
    private EvaluacionRepository evaluacionRepository;
    @Autowired
    private  EvaluacionDevRepository evaluacionDevRepository;

    @Override
    public List<Equipo> listaractivados() {
        return equipoRepository.findByEstadoTrue() ;
    }

    @Override
    public List<Equipo> listardesactivados() {
        return equipoRepository.findByEstadoFalse();
    }

    @Override
    public Equipo registrar(EquipoDTO equipoDTO) throws Exception {

        String ultimoCodigo = obtenerCodigo();

        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        System.out.print(nuevoCodigo);
        Equipo equipo = new Equipo();
        equipo.setCodigo(nuevoCodigo);
        equipo.setNombre(equipoDTO.getNombre());
        equipo.setCategoria(equipoDTO.getCategoria());
        equipo.setSede(equipoDTO.getSede());
        equipo.setGenero(equipoDTO.getGenero());
        equipo.setEstado(true);
        equipo.setUsuarioRegistro(equipoDTO.getUsuarioRegistro());
        equipo.setFechaCreacion(LocalDate.now());
        equipo.setHoraCreacion(LocalTime.now());
        System.out.print(equipo);
        return equipoRepository.save(equipo);
    }

    @Override
    public Equipo actualizar(EquipoDTO equipoDTO) throws Exception {
        Optional<Equipo> equipoOptional = equipoRepository.findById(equipoDTO.getCodigo());
        if (!equipoOptional.isPresent()) {
            throw new RuntimeException("El Profesor con código " + equipoDTO.getCodigo() + " no existe.");
        }
        Equipo equipo = new Equipo();
        equipo.setCodigo(equipoDTO.getCodigo());
        equipo.setNombre(equipoDTO.getNombre());
        equipo.setCategoria(equipoDTO.getCategoria());
        equipo.setSede(equipoDTO.getSede());
        equipo.setGenero(equipoDTO.getGenero());
        equipo.setEstado(true);
        equipo.setUsuarioActualizacion(equipoDTO.getUsuarioRegistro());
        equipo.setFechaActualizacion(LocalDate.now());
        equipo.setHoraActualizacion(LocalTime.now());
System.out.print(equipo);

        return equipoRepository.save(equipo);
    }

    @Override
    public String obtenerCodigo() {
        return equipoRepository.obtenerUltimoCodigo();
    }

    @Override
    public String obtenerCodigoDev() {
        return equipoDevRepository.obtenerUltimoCodigoDev();
    }

    @Override
    public Equipo desactivar(String usuarioCodigo) {
        Optional<Equipo> equipoOptional = equipoRepository.findById(usuarioCodigo);
        if (equipoOptional.isPresent()) {
            Equipo equipo = equipoOptional.get();
            equipo.setEstado(false);
            return equipoRepository.save(equipo);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + usuarioCodigo);
        }
    }

    @Override
    public Equipo activar(String usuarioCodigo) {
        Optional<Equipo> equipoOptional = equipoRepository.findById(usuarioCodigo);
        if (equipoOptional.isPresent()) {
            Equipo equipo = equipoOptional.get();
            equipo.setEstado(true);
            return equipoRepository.save(equipo);
        }
        else {
            throw new RuntimeException(" no encontrado con el código: " + usuarioCodigo);
        }
    }

    @Override
    public List<EquipoDev> finall() {
        return equipoDevRepository.findAll();
    }


    @Override
    public List<EquipoDev> regEquipo(List<AsignacionDTO> asignacionDTOS) throws Exception {
        if (asignacionDTOS == null || asignacionDTOS.isEmpty()) {
            throw new Exception("La lista de AsignacionDTO está vacía o es nula.");
        }

        List<EquipoDev> equipoRegistrado = new ArrayList<>();
        List<Evaluacion> evaluacionRegistrado = new ArrayList<>();
        List<EvaluacionDev> detalleRegistrado = new ArrayList<>();

        try {
            // Obtener últimos códigos antes del bucle
            String ultimoCodigoEquipoDev = obtenerCodigoDev();
            // Obtener últimos códigos antes del bucle

            String ultimoCodigoEvaluacion = evaluacionRepository.obtenerUltimoCodigo();
            String ultimoCodigoDetalle = evaluacionDevRepository.obtenerUltimoCodigo();

            Set<String> codigosGenerados = new HashSet<>(); // Para evitar duplicados
            for (AsignacionDTO equipoDev : asignacionDTOS) {
                Optional<Equipo> equipoExistente = equipoRepository.findById(equipoDev.getCodigo());
                Equipo equipo = equipoExistente.orElseThrow(() ->
                        new Exception("El equipo con el código " + equipoDev.getCodigo() + " no existe.")
                );

                // Dividir nombres de estudiante y profesor
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


// Dentro del ciclo donde se crean las evaluaciones
                if ("0000".equals(codigoProfesor)) {
                    // Generar nuevo código para Evaluacion
                    String nuevoCodigoEvaluacion;
                    do {
                        nuevoCodigoEvaluacion = Utilitarios.incrementarSecuencia(ultimoCodigoEvaluacion);
                    } while (codigosGenerados.contains(nuevoCodigoEvaluacion)); // Evita duplicados
                    codigosGenerados.add(nuevoCodigoEvaluacion);
                    ultimoCodigoEvaluacion = nuevoCodigoEvaluacion;

                    Evaluacion evaluacion = new Evaluacion();
                    evaluacion.setCodigo(ultimoCodigoEvaluacion);
                    evaluacion.setComentarios("");
                    evaluacion.setEstudiante(codigoEstudiante);
                    evaluacion.setNotaFinal(0);
                    evaluacionRegistrado.add(evaluacion);

                    // Generar nuevo código para EvaluacionDev
                    ultimoCodigoDetalle = Utilitarios.incrementarSecuencia(ultimoCodigoDetalle);
                    EvaluacionDev evaluacionDev = new EvaluacionDev();
                    evaluacionDev.setCodigo(ultimoCodigoDetalle);
                    evaluacionDev.setEquipo(equipoDev.getCodigo());
                    evaluacionDev.setEvaluacion(evaluacion); // Aquí asignamos el objeto Evaluacion, no solo su código
                    evaluacionDev.setEstado(true);
                    evaluacionDev.setConteo("0001");
                    detalleRegistrado.add(evaluacionDev);

                    // Generar nuevo código para EquipoDev
                    ultimoCodigoEquipoDev = Utilitarios.incrementarSecuencia(ultimoCodigoEquipoDev);
                    EquipoDev equipoDev1 = new EquipoDev();
                    equipoDev1.setCodigo(ultimoCodigoEquipoDev);
                    equipoDev1.setEstudiante(codigoEstudiante);
                    equipoDev1.setProfesor(codigoProfesor);
                    equipoDev1.setFechaCreacion(LocalDate.now());
                    equipoDev1.setHoraCreacion(LocalTime.now());
                    equipoDev1.setEquipo(equipoDev.getCodigo());
                    equipoDev1.setEstado(true);
                    equipoRegistrado.add(equipoDev1);
                } else {
                    // Si el código del profesor no es "0000", no se registra la evaluación ni los detalles.
                    // Solo puedes registrar el equipoDev sin evaluación.
                    EquipoDev equipoDev1 = new EquipoDev();
                    ultimoCodigoEquipoDev = Utilitarios.incrementarSecuencia(ultimoCodigoEquipoDev);
                    equipoDev1.setCodigo(ultimoCodigoEquipoDev);
                    equipoDev1.setEstudiante(codigoEstudiante);
                    equipoDev1.setProfesor(codigoProfesor);
                    equipoDev1.setFechaCreacion(LocalDate.now());
                    equipoDev1.setHoraCreacion(LocalTime.now());
                    equipoDev1.setEquipo(equipoDev.getCodigo());
                    equipoDev1.setEstado(true);
                    equipoRegistrado.add(equipoDev1);
                }

            }

            // Guardar en base de datos
            evaluacionRepository.saveAll(evaluacionRegistrado);
            evaluacionDevRepository.saveAll(detalleRegistrado);
            equipoDevRepository.saveAll(equipoRegistrado);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al registrar equipos: " + e.getMessage(), e);
        }

        return equipoRegistrado;
    }


    @Override
    public List<EquipoDev> listarEquipoDevActivados() {
        return equipoDevRepository.findByEstadoTrue();
    }


    @Override
    public EquipoDev eliminarEquipo(String usuarioCodigo) {
        try {
            // Verificar si el equipo existe
            if (!equipoRepository.existsById(usuarioCodigo)) {
                throw new IllegalArgumentException("El equipo con ID " + usuarioCodigo + " no existe.");
            }

            // Crear el objeto EquipoDev con solo el código antes de eliminar
            EquipoDev equipoDev = new EquipoDev();
            equipoDev.setCodigo(usuarioCodigo);

            // Eliminar el equipo
            equipoRepository.deleteById(usuarioCodigo);

            // Retornar el objeto EquipoDev con el código del equipo eliminado
            return equipoDev;

        } catch (IllegalArgumentException e) {
            // Manejo de excepción para datos no encontrados
            throw e; // Re-lanzar la excepción para que el controlador la maneje
        } catch (Exception e) {
            // Manejo de cualquier otra excepción inesperada
            throw new RuntimeException("Ocurrió un error al eliminar el equipo: " + e.getMessage(), e);
        }
    }

    @Override
    public List<EquipoDev> listar() {
        return equipoDevRepository.findAll();
    }

    @Override
    public void eliminar(String codigo) {
        equipoDevRepository.deleteById(codigo);
    }

    @Override
    public List<EquipoDev> actualizarEquipoEstudiante(List<AsignacionEstudiante> asignacionEstudiantes) throws Exception {
        if (asignacionEstudiantes == null || asignacionEstudiantes.isEmpty()) {
            throw new Exception("La lista de AsignacionDTO está vacía o es nula.");
        }
        List<EquipoDev> equipoRegistrado = new ArrayList<>();

        try {
            String ultimoCodigo = obtenerCodigoDev(); // Obtén el último código inicial
            for (AsignacionEstudiante asignacionEstudiante : asignacionEstudiantes) {
                Optional<EquipoDev> equipoExistente = equipoDevRepository.findById(asignacionEstudiante.getCodigo());
               System.out.print("\n"+asignacionEstudiante.getCodigo());
                EquipoDev equipoDev1 = new EquipoDev();
                equipoDev1.setCodigo(asignacionEstudiante.getCodigo());
                equipoDev1.setNumeroCamiseta(asignacionEstudiante.getNumeroCamiseta());
                equipoDev1.setPosicion(asignacionEstudiante.getPosicion());
                equipoDev1.setEsCapitan(asignacionEstudiante.isEsCapitan());
                equipoDev1.setEstado(asignacionEstudiante.getEstado());
                equipoDev1.setUsuarioActualizacion(asignacionEstudiante.getUsuarioActualizacion());
                equipoDev1.setFechaActualizacion(LocalDate.now());
                equipoDev1.setHoraActualizacion(LocalTime.now());
                equipoDev1.setEstudiante(asignacionEstudiante.getEstudiante());
                equipoDev1.setProfesor(asignacionEstudiante.getProfesor());
                equipoDev1.setEquipo(asignacionEstudiante.getEquipo());
                equipoRegistrado.add(equipoDev1);
            }
            equipoDevRepository.saveAll(equipoRegistrado);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al registrar equipos: " + e.getMessage(), e);
        }
        return equipoRegistrado;
    }



}
