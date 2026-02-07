package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.dto.request.EvaluacionDevRequest;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Evaluacion;
import com.naat.proyectofutbol.model.EvaluacionDev;
import com.naat.proyectofutbol.repository.EvaluacionDevRepository;
import com.naat.proyectofutbol.repository.EvaluacionRepository;
import com.naat.proyectofutbol.service.EvaluacionService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EvaluacionServiceImpl implements EvaluacionService {

    private final EvaluacionDevRepository evaluacionDevRepository;

    private final EvaluacionRepository evaluacionRepository;

    @Override
    public List<Evaluacion> listaEvaluacion() {
        return evaluacionRepository.findAll();
    }

    @Override
    public List<EvaluacionDev> listaEvaluacionDetalle() {
        return evaluacionDevRepository.findAll();
    }

    @Override
    public List<EvaluacionDev> findByConteo(String conteo) {
        return evaluacionDevRepository.findByConteo(conteo);
    }

    @Override
    public List<EvaluacionDev> actualizar(List<EvaluacionDevRequest> evaluacionDevDTOS) {


        List<EvaluacionDev> evaluacionRegistro = new ArrayList<>();

        for (EvaluacionDevRequest evaluacionDevDTO : evaluacionDevDTOS) {

            EvaluacionDev evaluacionExistente = evaluacionDevRepository.findById(evaluacionDevDTO.getCodigo())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.EVALUACIONDEV_NO_ENCONTRADO));

            double total =
                    evaluacionDevDTO.getPases() +
                            evaluacionDevDTO.getTiros() +
                            evaluacionDevDTO.getPosicionamiento() +
                            evaluacionDevDTO.getVisionJuego() +
                            evaluacionDevDTO.getResistencia() +
                            evaluacionDevDTO.getVelocidad() +
                            evaluacionDevDTO.getFuerza() +
                            evaluacionDevDTO.getConcentracion() +
                            evaluacionDevDTO.getTomaDecisiones();

            double promedio = total / 9;

            Evaluacion evaluacion = evaluacionRepository.findById(evaluacionDevDTO.getEvaluacion())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            NotFoundMessages.EVALUACION_NO_ENCONTRADO
                    ));

            evaluacionExistente.setEvaluacion(evaluacion);
            evaluacionExistente.setPases(evaluacionDevDTO.getPases());
            evaluacionExistente.setTiros(evaluacionDevDTO.getTiros());
            evaluacionExistente.setPosicionamiento(evaluacionDevDTO.getPosicionamiento());
            evaluacionExistente.setVisionJuego(evaluacionDevDTO.getVisionJuego());
            evaluacionExistente.setResistencia(evaluacionDevDTO.getResistencia());
            evaluacionExistente.setVelocidad(evaluacionDevDTO.getVelocidad());
            evaluacionExistente.setFuerza(evaluacionDevDTO.getFuerza());
            evaluacionExistente.setConcentracion(evaluacionDevDTO.getConcentracion());
            evaluacionExistente.setTomaDecisiones(evaluacionDevDTO.getTomaDecisiones());
            evaluacionExistente.setNotaFinal(promedio);
            evaluacionExistente.setComentarios(evaluacionDevDTO.getComentarios());
            evaluacionExistente.setEstado(true);


            evaluacionRegistro.add(evaluacionExistente);
        }

        return evaluacionDevRepository.saveAll(evaluacionRegistro);
    }

    @Override
    public int desactivar(String conteo) {

        List<EvaluacionDev> evaluaciones = evaluacionDevRepository.findByConteo(conteo);
        int cantidadDesactivadas = evaluaciones.size();
        evaluaciones.forEach(e -> e.setEstado(false));
        evaluacionDevRepository.saveAll(evaluaciones);

        String ultimoConteo = evaluacionDevRepository.obtenerUltimoConteo();
        String nuevoConteo = Utilitarios.incrementarSecuencia(ultimoConteo);

        String ultimoCodigo = evaluacionDevRepository.obtenerUltimoCodigo();

        List<EvaluacionDev> nuevasEvaluaciones = new ArrayList<>();

        for (EvaluacionDev evaluacion : evaluaciones) {

            ultimoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

            EvaluacionDev nuevaEvaluacion = EvaluacionDev.builder()
                    .codigo(ultimoCodigo)
                    .evaluacion(evaluacion.getEvaluacion())
                    .equipo(evaluacion.getEquipo())
                    .pases(evaluacion.getPases())
                    .tiros(evaluacion.getTiros())
                    .posicionamiento(evaluacion.getPosicionamiento())
                    .visionJuego(evaluacion.getVisionJuego())
                    .resistencia(evaluacion.getResistencia())
                    .velocidad(evaluacion.getVelocidad())
                    .fuerza(evaluacion.getFuerza())
                    .concentracion(evaluacion.getConcentracion())
                    .tomaDecisiones(evaluacion.getTomaDecisiones())
                    .notaFinal(evaluacion.getNotaFinal())
                    .comentarios(evaluacion.getComentarios())
                    .conteo(nuevoConteo)
                    .estado(true)
                    .build();

            nuevasEvaluaciones.add(nuevaEvaluacion);

        }
        evaluacionDevRepository.saveAll(nuevasEvaluaciones);

        return cantidadDesactivadas;
    }


    @Override
    public List<EvaluacionDev> findByEquipo(String clase) {
        return evaluacionDevRepository.findByEquipo(clase);
    }

    @Override
    public List<EvaluacionDev> findByEquipoAndConteo(String clase, String conteo) {
        return evaluacionDevRepository.findByEquipoAndConteo(clase, conteo);
    }

    @Override
    public List<EvaluacionDev> desactivar(String equipo, String conteo) {

        List<EvaluacionDev> evaluaciones = evaluacionDevRepository.findByEquipoAndConteo(equipo, conteo);

        String ultimoCodigo = evaluacionDevRepository.obtenerUltimoCodigo();
        String ultimoConteo = evaluacionDevRepository.obtenerUltimoConteo();

        evaluaciones.forEach(evaluacion -> {
            evaluacion.setEstado(false);
            Evaluacion evaluacionRegistro = evaluacionRepository.findById(evaluacion.getEvaluacion().getCodigo()).orElse(null);
            Integer sumaNotas = (int) (evaluacion.getNotaFinal() + evaluacionRegistro.getNotaFinal());

            Evaluacion nuevaEvaluacion = Evaluacion.builder()
                    .codigo(evaluacionRegistro.getCodigo())
                    .estudiante(evaluacionRegistro.getEstudiante())
                    .notaFinal(sumaNotas)
                    .build();

            evaluacionRepository.save(nuevaEvaluacion);

        });
        evaluacionDevRepository.saveAll(evaluaciones);

        List<EvaluacionDev> nuevasEvaluaciones = new ArrayList<>();
        ultimoConteo = Utilitarios.incrementarSecuencia(ultimoConteo);

        for (EvaluacionDev evaluacion : evaluaciones) {

            ultimoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

            EvaluacionDev nuevaEvaluacion = EvaluacionDev.builder()
                    .codigo(ultimoCodigo)
                    .estado(true)
                    .conteo(ultimoConteo)
                    .evaluacion(evaluacion.getEvaluacion())
                    .equipo(equipo)
                    .build();

            nuevasEvaluaciones.add(nuevaEvaluacion);
        }
        return evaluacionDevRepository.saveAll(nuevasEvaluaciones);
    }

}
