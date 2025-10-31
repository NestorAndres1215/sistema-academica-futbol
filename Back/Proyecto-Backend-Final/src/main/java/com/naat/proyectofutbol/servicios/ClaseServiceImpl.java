package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.ClaseDTO;
import com.naat.proyectofutbol.dto.ClaseDevDTO;
import com.naat.proyectofutbol.entidades.*;
import com.naat.proyectofutbol.repositorios.ClaseDevRepository;
import com.naat.proyectofutbol.repositorios.ClaseRepository;
import com.naat.proyectofutbol.repositorios.HorarioRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaseServiceImpl implements ClaseService{

    @Autowired
    private ClaseRepository claseRepository;
    @Autowired
    private HorarioRepository horarioRepository;
    @Autowired
    private ClaseDevRepository claseDevRepository;



    @Override
    public List<Clase> listaractivados() {
        return  claseRepository.findByEstadoTrue();
    }

    @Override
    public List<Clase> listardesactivados() {
        return claseRepository.findByEstadoFalse();
    }

    @Override
    public Clase registrar(ClaseDTO claseDTO) throws Exception {
        String ultimoCodigo = obtenerCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        System.out.print(nuevoCodigo);
        Clase clase = new Clase();
        clase.setCodigo(nuevoCodigo);
        clase.setNombre(claseDTO.getNombre());
        clase.setInicio(claseDTO.getInicio());
        clase.setDescripcion(claseDTO.getDescripcion());
        clase.setDia(claseDTO.getDia());
        clase.setFin(claseDTO.getFin());
        clase.setEquipo(claseDTO.getEquipo());
        clase.setHorario(claseDTO.getHorario());
        clase.setEstado(true);
        clase.setUsuarioCreacion(claseDTO.getUsuarioCreacion());
        clase.setUsuarioActualizacion("");
        clase.setFechaCreacion(LocalDate.now());
        clase.setHoraCreacion(LocalTime.now());


        return claseRepository.save(clase);
    }

    @Override
    public Clase actualizar(ClaseDTO claseDTO) throws Exception {
        try {
            // Verificar si la clase con el código dado existe
            Optional<Clase> claseOptional = claseRepository.findById(claseDTO.getCodigo());
            if (!claseOptional.isPresent()) {
                throw new RuntimeException("La clase con código " + claseDTO.getCodigo() + " no existe.");
            }

            // Verificar si el horario con el ID dado existe
            Optional<Horario> horarioOptional = horarioRepository.findById(claseDTO.getHorario());
            if (!horarioOptional.isPresent()) {
                throw new RuntimeException("El horario con código " + claseDTO.getHorario() + " no existe.");
            }

            Horario horario = horarioOptional.get();
            Clase claseExistente = claseOptional.get();


            // Verificar si alguno de los valores ha cambiado
            if (!(claseDTO.getInicio().equals(claseExistente.getInicio()) &&
                    claseDTO.getFin().equals(claseExistente.getFin()) &&
                    claseDTO.getHorario().equals(claseExistente.getHorario().getCodigo()) &&
                    claseDTO.getDia().equals(claseExistente.getDia()))) {

                // Si los valores han cambiado, se verifica si ya existe una clase con los nuevos valores
                System.out.print("hola"); // Mensaje para depuración

                if (claseRepository.existsByInicioAndFinAndHorarioAndDia(
                        claseDTO.getInicio(),
                        claseDTO.getFin(),
                        horario,
                        claseDTO.getDia())) {
                    throw new IllegalArgumentException("Ya existe una clase con los mismos valores para inicio, fin, horario y día.");
                }
            } else {
                // Si no hay cambios, no entra aquí ni realiza verificación de duplicados
                System.out.println("No hubo cambios en los valores.");
            }
                System.out.print("entro");
            // Actualizar los valores de la clase existente
            claseExistente.setCodigo(claseDTO.getCodigo());
            claseExistente.setInicio(claseDTO.getInicio());
            claseExistente.setDescripcion(claseDTO.getDescripcion());
            claseExistente.setFin(claseDTO.getFin());
            claseExistente.setHorario(claseDTO.getHorario());
            claseExistente.setDia(claseDTO.getDia());
            claseExistente.setUsuarioActualizacion(claseDTO.getUsuarioCreacion());
            claseExistente.setFechaActualizacion(LocalDate.now());
            claseExistente.setHoraActualizacion(LocalTime.now());
            // Guardar los cambios en la base de datos
            System.out.print(claseExistente);
            return claseRepository.save(claseExistente);

        } catch (IllegalArgumentException e) {
            // Excepción controlada para reglas de negocio
            throw e;
        } catch (Exception e) {

            throw new RuntimeException("Ocurrió un error al actualizar la clase: " + e.getMessage(), e);
        }
    }

    @Override
    public String obtenerCodigo() {
        return claseRepository.obtenerUltimoCodigo();
    }

    @Override
    public boolean existsByInicioAndFinAndHorarioAndDia(LocalDate inicio, LocalDate fin, Horario horario, String dia) {
        try {
            // Intentar verificar si ya existe una clase con los mismos parámetros
            return claseRepository.existsByInicioAndFinAndHorarioAndDia(inicio, fin, horario, dia);
        } catch (Exception e) {
            // Capturar cualquier excepción inesperada y lanzar una RuntimeException o hacer log
            throw new RuntimeException("Ocurrió un error al verificar si la clase existe: " + e.getMessage(), e);
        }
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
    public ClaseDev registrardev(ClaseDevDTO claseDevDTO) {
System.out.print(claseDevDTO);
        try {
            String ultimoCodigo = obtenerCodigoDev();
            String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
            ClaseDev clase = new ClaseDev();
            System.out.print(nuevoCodigo);
            clase.setCodigo(nuevoCodigo);
            clase.setTitulo(claseDevDTO.getTitulo());
            clase.setDia(claseDevDTO.getDia());
            clase.setObjetivo(claseDevDTO.getObjetivo());
            clase.setDescripcion(claseDevDTO.getDescripcion());
            clase.setClase(claseDevDTO.getClase());
            clase.setFechaCreacion(LocalDate.now());
            clase.setHoraCreacion(LocalTime.now());
            clase.setUsuarioCreacion(clase.getUsuarioCreacion());
            clase.setEstado(true);
            System.out.print(clase);
           return claseDevRepository.save(clase);

        } catch (Exception e) {

            throw new RuntimeException(e);
        }

    }

    @Override
    public String obtenerCodigoDev() {
        return  claseDevRepository.obtenerUltimoCodigo();
    }

    @Override
    public ClaseDev actualizardev(ClaseDevDTO claseDevDTO) {
        // Verificar si la clase con el código dado existe
        Optional<ClaseDev> claseOptional = claseDevRepository.findById(claseDevDTO.getCodigo());
        if (!claseOptional.isPresent()) {
            throw new RuntimeException("La clase con código " + claseDevDTO.getCodigo() + " no existe.");
        }

        ClaseDev claseExistente = claseOptional.get();
        claseExistente.setCodigo(claseExistente.getCodigo());
        claseExistente.setClase(claseDevDTO.getClase());
        claseExistente.setDescripcion(claseDevDTO.getDescripcion());
        claseExistente.setObjetivo(claseDevDTO.getObjetivo());
        claseExistente.setFechaActualizacion(LocalDate.now());
        claseExistente.setHoraActualizacion(LocalTime.now());
        claseExistente.setEstado(true);
        return claseDevRepository.save(claseExistente);
    }


}
