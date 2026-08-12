package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.NotFoundMessages;
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

        validarTelefono(sede.getTelefono());

        Sede nuevaSede = Sede.builder()
                .codigo(Utilitarios.incrementarSecuencia(sedeRepository.obtenerUltimoCodigo()))
                .nombre(sede.getNombre())
                .direccion(sede.getDireccion())
                .telefono(sede.getTelefono())
                .estado(true)
                .usuarioCreacion(sede.getUsuarioCreacion())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .build();

        return sedeRepository.save(nuevaSede);
    }


    @Override
    public Sede actualizarSede(Sede sede) {

        Sede sedeActual = buscarPorCodigo(sede.getCodigo());

        if (!sedeActual.getTelefono().equals(sede.getTelefono())) {
            validarTelefono(sede.getTelefono());
        }

        sedeActual.setNombre(sede.getNombre());
        sedeActual.setDireccion(sede.getDireccion());
        sedeActual.setTelefono(sede.getTelefono());
        sedeActual.setUsuarioActualizacion(sede.getUsuarioActualizacion());
        sedeActual.setFechaActualizacion(LocalDate.now());
        sedeActual.setHoraActualizacion(LocalTime.now());

        return sedeRepository.save(sedeActual);
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
    public Sede buscarNombre(String nombre) {
        return sedeRepository.findByNombre(nombre)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.SEDE_NO_ENCONTRADO));
    }

    @Override
    public Sede buscarPorCodigo(String codigo) {
        return sedeRepository.findById(codigo)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.SEDE_NO_ENCONTRADO));
    }

    @Override
    public Sede activarSede(String codigo) {
        return cambiarEstado(codigo, true);
    }

    @Override
    public Sede desactivarSede(String codigo) {
        return cambiarEstado(codigo, false);
    }

    private Sede cambiarEstado(String codigo, boolean estado) {
        Sede sede = buscarPorCodigo(codigo);
        sede.setEstado(estado);
        return sedeRepository.save(sede);
    }

    private void validarTelefono(String telefono) {
        sedeRepository.findByTelefono(telefono)
                .ifPresent(sede -> {
                    throw new ResourceAlreadyExistsException("TELEFONO YA EXISTE");
                });
    }

}
