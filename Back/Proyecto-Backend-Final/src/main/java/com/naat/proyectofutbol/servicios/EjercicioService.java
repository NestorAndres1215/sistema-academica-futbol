package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.EjercicioDTO;
import com.naat.proyectofutbol.entidades.Ejercicio;
import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.repositorios.EjercicioRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EjercicioService{

    private final EjercicioRepository ejercicioRepository;


    public String obtenerCodigo() {
        return ejercicioRepository.obtenerUltimoCodigo();
    }


    public List<Ejercicio> lista() {
        return ejercicioRepository.findAll();
    }


    public Ejercicio registrar(EjercicioDTO ejercicioDTO) throws Exception {
        String ultimoCodigo = obtenerCodigo();

        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        Ejercicio ejercicio =new Ejercicio();
        ejercicio.setCodigo(nuevoCodigo);
        ejercicio.setNombre(ejercicioDTO.getNombre());
        ejercicio.setDuracion(ejercicioDTO.getDuracion());
        ejercicio.setDescripcion(ejercicioDTO.getDescripcion());
        ejercicio.setTipo(ejercicioDTO.getTipo());
        ejercicio.setFechaCreacion(LocalDate.now());
        ejercicio.setHoraCreacion(LocalTime.now());
        ejercicio.setUsuarioRegistro(ejercicioDTO.getUsuarioCreacion());
    ejercicio.setIntensidad(ejercicioDTO.getIntensidad());
        ejercicio.setClase(ejercicioDTO.getClase());
        System.out.print(ejercicio);
    return ejercicioRepository.save(ejercicio);
    }


    public Ejercicio actualizar(EjercicioDTO ejercicioDTO) throws Exception {
        Optional<Ejercicio> equipoOptional = ejercicioRepository.findById(ejercicioDTO.getCodigo());
        if (!equipoOptional.isPresent()) {
            throw new RuntimeException("El Profesor con código " + ejercicioDTO.getCodigo() + " no existe.");
        }
        Ejercicio ejercicio =new Ejercicio();
        ejercicio.setCodigo(ejercicioDTO.getCodigo());
        ejercicio.setNombre(ejercicioDTO.getNombre());
        ejercicio.setDuracion(ejercicioDTO.getDuracion());
        ejercicio.setDescripcion(ejercicioDTO.getDescripcion());
        ejercicio.setTipo(ejercicioDTO.getTipo());
        ejercicio.setFechaActualizacion(LocalDate.now());
        ejercicio.setHoraActualizacion(LocalTime.now());
        ejercicio.setUsuarioRegistro(ejercicioDTO.getUsuarioCreacion());
        ejercicio.setIntensidad(ejercicioDTO.getIntensidad());
        ejercicio.setClase(ejercicioDTO.getClase());
        return ejercicioRepository.save(ejercicio);
    }
}
