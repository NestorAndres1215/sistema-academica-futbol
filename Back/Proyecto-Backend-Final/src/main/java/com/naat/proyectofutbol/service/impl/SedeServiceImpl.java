package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Sede;
import com.naat.proyectofutbol.repository.SedeRepository;
import com.naat.proyectofutbol.service.SedeService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SedeServiceImpl implements SedeService {

    private final SedeRepository sedeRepository;

    @Override
    public List<Sede> listarSedes() {
        return sedeRepository.findAll();
    }

    @Override
    public String obtenerUltimoCodigo() {
        return sedeRepository.obtenerUltimoCodigo();
    }

    @Override
    public Sede guardarSede(Sede sede) {

        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        validarTelefono(sede.getTelefono());

        Sede sedeNueva = Sede.builder()
                .codigo(nuevoCodigo)
                .nombre(sede.getNombre())
                .direccion(sede.getDireccion())
                .telefono(sede.getTelefono())
                .estado(true)
                .usuarioCreacion(sede.getUsuarioCreacion())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .build();

        return sedeRepository.save(sedeNueva);
    }

    @Override
    public Sede actualizarSede(Sede sede) {
        Sede sedeExistente = buscarPorCodigo(sede.getCodigo());

        if (!sede.getTelefono().equals(sedeExistente.getTelefono())) {
            validarTelefono(sede.getTelefono());
        }

        sedeExistente.setNombre(sede.getNombre());
        sedeExistente.setDireccion(sede.getDireccion());
        sedeExistente.setTelefono(sede.getTelefono());
        sedeExistente.setUsuarioActualizacion(sede.getUsuarioActualizacion());
        sedeExistente.setFechaActualizacion(LocalDate.now());
        sedeExistente.setHoraActualizacion(LocalTime.now());

        return sedeRepository.save(sedeExistente);
    }

    @Override
    public List<Sede> findAdminsByEstadoTrue() {
        return sedeRepository.findByEstadoTrue();
    }

    @Override
    public List<Sede> findAdminsByEstadoFalse() {
        return sedeRepository.findByEstadoFalse();
    }

    @Override
    public Sede BuscarNombre(String nombre) {
        return sedeRepository.findByNombre(nombre)
                .orElseThrow(() -> new ResourceNotFoundException("Sede no encontrada con código: " + nombre));
    }

    @Override
    public Sede buscarPorCodigo(String codigo) {
        return sedeRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException("Sede no encontrada con código: " + codigo));
    }

    @Override
    public Sede desactivarSede(String codigo) {
        Sede sede = buscarPorCodigo(codigo);
        sede.setEstado(false);
        return sedeRepository.save(sede);
    }

    @Override
    public Sede activarSede(String codigo) {
        Sede sede = buscarPorCodigo(codigo);
        sede.setEstado(true);
        return sedeRepository.save(sede);
    }

    private void validarTelefono(String telefono) {
        sedeRepository.findByTelefono(telefono)
                .ifPresent(s -> {
                    throw new ResourceAlreadyExistsException("El teléfono ya existe: " + telefono);
                });
    }

}
