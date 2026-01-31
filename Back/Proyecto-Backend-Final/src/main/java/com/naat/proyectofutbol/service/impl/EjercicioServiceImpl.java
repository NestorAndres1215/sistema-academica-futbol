package com.naat.proyectofutbol.service.impl;



import com.naat.proyectofutbol.dto.request.EjercicioRequest;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.ClaseDev;
import com.naat.proyectofutbol.model.Ejercicio;
import com.naat.proyectofutbol.repository.ClaseDevRepository;
import com.naat.proyectofutbol.repository.EjercicioRepository;
import com.naat.proyectofutbol.service.EjeciciosService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EjercicioServiceImpl implements EjeciciosService {

    private final EjercicioRepository ejercicioRepository;
    private  final ClaseDevRepository claseDevRepository;

    public String obtenerCodigo() {
        return ejercicioRepository.obtenerUltimoCodigo();
    }

    @Override
    public List<Ejercicio> lista() {
        return ejercicioRepository.findAll();
    }

    @Override
    public Ejercicio registrar(EjercicioRequest dto) {

        String nuevoCodigo = Utilitarios.incrementarSecuencia(obtenerCodigo());

        ClaseDev clase = claseDevRepository.findById(dto.getClase())
                .orElseThrow(() -> new ResourceNotFoundException("La clase con código " + dto.getClase() + " no existe"));

        Ejercicio ejercicio = Ejercicio.builder()
                .codigo(nuevoCodigo)
                .nombre(dto.getNombre())
                .duracion(dto.getDuracion())
                .descripcion(dto.getDescripcion())
                .tipo(dto.getTipo())
                .intensidad(dto.getIntensidad())
                .claseDev(clase)
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .usuarioRegistro(dto.getUsuarioCreacion())

                .build();

        return ejercicioRepository.save(ejercicio);
    }



    @Override
    public Ejercicio actualizar(EjercicioRequest dto) {

        Ejercicio ejercicio = ejercicioRepository.findById(dto.getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException("El Ejercicio con código " + dto.getCodigo() + " no existe"));

        ClaseDev clase = claseDevRepository.findById(dto.getClase())
                .orElseThrow(() -> new ResourceNotFoundException("La Clase con código " + dto.getClase() + " no existe"));

        ejercicio.setNombre(dto.getNombre());
        ejercicio.setDuracion(dto.getDuracion());
        ejercicio.setDescripcion(dto.getDescripcion());
        ejercicio.setTipo(dto.getTipo());
        ejercicio.setIntensidad(dto.getIntensidad());
        ejercicio.setClaseDev(clase);
        ejercicio.setFechaActualizacion(LocalDate.now());
        ejercicio.setHoraActualizacion(LocalTime.now());
        ejercicio.setUsuarioActualizacion(dto.getUsuarioCreacion());

        return ejercicioRepository.save(ejercicio);
    }

}
