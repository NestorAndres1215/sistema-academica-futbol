package com.naat.proyectofutbol.servicios;


import com.naat.proyectofutbol.dto.EvaluacionDevDTO;
import com.naat.proyectofutbol.entidades.*;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.repositorios.EvaluacionDevRepository;
import com.naat.proyectofutbol.repositorios.EvaluacionRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class  EvalucionService {

    @Autowired
    private EvaluacionDevRepository evaluacionDevRepository;
    @Autowired
    private EvaluacionRepository evaluacionRepository;


    public List<Evaluacion> listaEvaluacion() {
        return evaluacionRepository.findAll();
    }


    public List<EvaluacionDev> listaEvaluacionDetalle() {
        return evaluacionDevRepository.findAll();
    }


    public List<EvaluacionDev> actualizar(List<EvaluacionDevDTO> evaluacionDevDTOS) throws Exception {
        if (evaluacionDevDTOS == null || evaluacionDevDTOS.isEmpty()) {
            throw new Exception("La lista de AsignacionDTO está vacía o es nula.");
        }
        List<EvaluacionDev> evaluacionRegistro = new ArrayList<>();

try {

    String conteo = evaluacionDevRepository.obtenerUltimoConteo();
    String contador= Utilitarios.incrementarSecuencia(conteo);

    for (EvaluacionDevDTO evaluacionDevDTO : evaluacionDevDTOS) {
        Optional<EvaluacionDev> equipoExistente = evaluacionDevRepository.findById(evaluacionDevDTO.getCodigo());

        EvaluacionDev evaluacionDev = new EvaluacionDev();
        evaluacionDev.setCodigo(evaluacionDevDTO.getCodigo());
        evaluacionDev.setEvaluacion(evaluacionDevDTO.getEvaluacion());
        evaluacionDev.setPases(evaluacionDevDTO.getPases());
        evaluacionDev.setTiros(evaluacionDevDTO.getTiros());
        evaluacionDev.setPosicionamiento(evaluacionDevDTO.getPosicionamiento());
        evaluacionDev.setVisionJuego(evaluacionDevDTO.getVisionJuego());
        evaluacionDev.setResistencia(evaluacionDevDTO.getResistencia());
        evaluacionDev.setVelocidad(evaluacionDevDTO.getVelocidad());
        evaluacionDev.setFuerza(evaluacionDevDTO.getFuerza());
        evaluacionDev.setConcentracion(evaluacionDevDTO.getConcentracion());
        evaluacionDev.setTomaDecisiones(evaluacionDevDTO.getTomaDecisiones());



        double total = evaluacionDevDTO.getPases() +
                evaluacionDevDTO.getTiros() +
                evaluacionDevDTO.getPosicionamiento() +
                evaluacionDevDTO.getVisionJuego() +
                evaluacionDevDTO.getResistencia() +
                evaluacionDevDTO.getVelocidad() +
                evaluacionDevDTO.getFuerza() +
                evaluacionDevDTO.getConcentracion() +
                evaluacionDevDTO.getTomaDecisiones();

        double promedio = total / 9; // Se divide entre el número de atributos evaluados
        evaluacionDev.setNotaFinal(promedio);
        evaluacionDev.setComentarios(evaluacionDevDTO.getComentarios());
        evaluacionDev.setEquipo(evaluacionDevDTO.getEquipo());
        evaluacionDev.setEstado(true);
        evaluacionDev.setConteo(evaluacionDevDTO.getConteo());




        evaluacionRegistro.add(evaluacionDev);
    }
    evaluacionDevRepository.saveAll(evaluacionRegistro);
} catch (Exception e) {
    e.printStackTrace();
    throw new RuntimeException(e);
}
        return evaluacionRegistro;
    }


    public List<EvaluacionDev> findByConteo(String conteo) {
        return evaluacionDevRepository.findByConteo(conteo);
    }



    public int desactivar(String conteo) {
        List<EvaluacionDev> evaluaciones = evaluacionDevRepository.findByConteo(conteo);
        String Contador = evaluacionDevRepository.obtenerUltimoConteo();
        if (evaluaciones.isEmpty()) {
            throw new RuntimeException("No se encontraron evaluaciones con el conteo: " + conteo);
        }

        int cantidadDesactivadas = evaluaciones.size();
        System.out.println("🔍 Evaluaciones encontradas: " + cantidadDesactivadas);

        // Desactivar las evaluaciones encontradas
        evaluaciones.forEach(evaluacion -> {
            evaluacion.setEstado(false);
            System.out.println("⛔ Desactivando evaluación con código: " + evaluacion.getCodigo());
        });
        evaluacionDevRepository.saveAll(evaluaciones);

        // Crear nuevas evaluaciones con los mismos datos
        List<EvaluacionDev> nuevasEvaluaciones = new ArrayList<>();
        String ultimoCodigo = evaluacionDevRepository.obtenerUltimoCodigo();
        String conteoIncmentaciomn=Utilitarios.incrementarSecuencia(Contador);
System.out.print("conteo que ingresa"+conteoIncmentaciomn);
        for (EvaluacionDev evaluacion : evaluaciones) {
            // Incrementar el código en cada iteración
            ultimoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

            EvaluacionDev nuevaEvaluacion = new EvaluacionDev();
            nuevaEvaluacion.setCodigo(ultimoCodigo);
            nuevaEvaluacion.setEstado(true);
            nuevaEvaluacion.setConteo(conteoIncmentaciomn);
            nuevaEvaluacion.setEvaluacion(evaluacion.getEvaluacion());
            System.out.print("conteo que registra"+conteoIncmentaciomn);
            System.out.println("✅ Registrando nueva evaluación con código: " + nuevaEvaluacion.getCodigo());

            nuevasEvaluaciones.add(nuevaEvaluacion);
        }

        evaluacionDevRepository.saveAll(nuevasEvaluaciones);
        System.out.println("🚀 Se registraron " + nuevasEvaluaciones.size() + " nuevas evaluaciones");

        return cantidadDesactivadas;
    }


    public List<EvaluacionDev> desactivar(String equipo, String conteo) {
        try {
            // 🔍 Buscar evaluaciones por equipo y conteo
            List<EvaluacionDev> evaluaciones = evaluacionDevRepository.findByEquipoAndConteo(equipo, conteo);

            if (evaluaciones.isEmpty()) {
                throw new RuntimeException("No se encontraron evaluaciones con el equipo '" + equipo + "' y conteo '" + conteo + "'.");
            }

            String ultimoCodigo = evaluacionDevRepository.obtenerUltimoCodigo();
            String ultimoConteo = evaluacionDevRepository.obtenerUltimoConteo();

            // ✅ Validaciones para evitar errores
            if (ultimoCodigo == null || ultimoCodigo.isEmpty()) {
                throw new RuntimeException("Error al obtener el último código de evaluación.");
            }
            if (ultimoConteo == null || ultimoConteo.isEmpty()) {
                throw new RuntimeException("Error al obtener el último conteo.");
            }

            int cantidadDesactivadas = evaluaciones.size();
            System.out.println("🔍 Evaluaciones encontradas: " + cantidadDesactivadas);

            // 🔻 **Desactivar las evaluaciones encontradas**
            evaluaciones.forEach(evaluacion -> {
                evaluacion.setEstado(false);
                System.out.println("⛔ Desactivando evaluación con código: " + evaluacion.getCodigo());
                System.out.println(evaluacion.getEvaluacion().getCodigo());
                System.out.println(evaluacion.getNotaFinal());
                Evaluacion evaluacionRegistro = evaluacionRepository.findById(evaluacion.getEvaluacion().getCodigo()).orElse(null);

                System.out.println("✅ Evaluación encontrada: " + evaluacionRegistro.getCodigo());
                System.out.println("✅ NOTA FINAL DE EVALAUCIONES DEV: " + evaluacion.getNotaFinal());
                System.out.println("✅ NOTA FINAL DE EVALAUCIONES : " + evaluacionRegistro.getNotaFinal());
                Integer sumaNotas = (int) (evaluacion.getNotaFinal() + evaluacionRegistro.getNotaFinal());
                System.out.println("✅ SUMA DE NOTAS FINALES: " + sumaNotas);
                System.out.println();
                Evaluacion nuevaEvaluacion = new Evaluacion();
                nuevaEvaluacion.setCodigo(evaluacionRegistro.getCodigo());
                nuevaEvaluacion.setEstudiante(evaluacionRegistro.getEstudiante().getCodigo());
                nuevaEvaluacion.setNotaFinal(sumaNotas);
                evaluacionRepository.save(nuevaEvaluacion);
            });
            evaluacionDevRepository.saveAll(evaluaciones);

            // 🔻 **Crear nuevas evaluaciones con códigos incrementados**
            List<EvaluacionDev> nuevasEvaluaciones = new ArrayList<>();
            System.out.println(nuevasEvaluaciones);
            ultimoConteo = Utilitarios.incrementarSecuencia(ultimoConteo);
            for (EvaluacionDev evaluacion : evaluaciones) {

                // 🔹 Incrementamos códigos en cada iteración
                ultimoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);


                EvaluacionDev nuevaEvaluacion = new EvaluacionDev();
                nuevaEvaluacion.setCodigo(ultimoCodigo);
                nuevaEvaluacion.setEstado(true);
                nuevaEvaluacion.setConteo(ultimoConteo);
                nuevaEvaluacion.setEvaluacion(evaluacion.getEvaluacion());
                nuevaEvaluacion.setEquipo(equipo);  // 🟢 Se mantiene el equipo original

                System.out.println("✅ Registrando nueva evaluación con código: " + nuevaEvaluacion.getCodigo());
                nuevasEvaluaciones.add(nuevaEvaluacion);
            }


            System.out.println("🚀 Se registraron " + nuevasEvaluaciones.size() + " nuevas evaluaciones");

            return evaluacionDevRepository.saveAll(nuevasEvaluaciones);
        } catch (Exception e) {
            System.err.println("❌ Error al desactivar evaluaciones: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e); // Si hay un error, retornamos 0 evaluaciones desactivadas
        }
    }


    public List<EvaluacionDev> findByEquipo(String clase) {
        return  evaluacionDevRepository.findByEquipo(clase);
    }


    public List<EvaluacionDev> findByEquipoAndConteo(String clase, String conteo) {
        return evaluacionDevRepository.findByEquipoAndConteo(clase,conteo);
    }


}
