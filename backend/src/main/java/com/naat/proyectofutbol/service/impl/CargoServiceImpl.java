package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Cargo;
import com.naat.proyectofutbol.repository.CargoRepository;
import com.naat.proyectofutbol.service.CargoService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CargoServiceImpl implements CargoService {

    private final CargoRepository cargoRepository;


    @Override
    public Cargo guardarCargo(Cargo cargo) {

        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        validarNombreUnico(cargo.getNombre());

        Cargo cargoNuevo = Cargo.builder()
                .codigo(nuevoCodigo)
                .nombre(cargo.getNombre())
                .estado(true)
                .usuarioCreacion(cargo.getUsuarioCreacion())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .build();

        return cargoRepository.save(cargoNuevo);
    }

    @Override
    public Cargo actualizarCargo(Cargo cargo) {
        Cargo cargoExistente = cargoRepository.findById(cargo.getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CARGO_NO_ENCONTRADO));

        if (!cargoExistente.getNombre().equals(cargo.getNombre())) {
            validarNombreUnico(cargo.getNombre());
        }

        cargoExistente.setNombre(cargo.getNombre());

        return cargoRepository.save(cargoExistente);
    }

    @Override
    public String obtenerUltimoCodigo() {
        return cargoRepository.obtenerUltimoCodigo();
    }

    @Override
    public List<Cargo> findAdminsByEstadoTrue() {
        return cargoRepository.findByEstadoTrue();
    }

    @Override
    public List<Cargo> findAdminsByEstadoFalse() {
        return cargoRepository.findByEstadoFalse();
    }

    @Override
    public Cargo activarSede(String codigo) {
        Cargo cargo = cargoRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CARGO_NO_ENCONTRADO));

        cargo.setEstado(true);
        return cargoRepository.save(cargo);
    }

    @Override
    public Cargo findByNombre(String nombre) {
        return cargoRepository.findByNombre(nombre)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CARGO_NO_ENCONTRADO));
    }

    @Override
    public Cargo desactivarCargo(String codigo) {

        Cargo cargo = cargoRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.CARGO_NO_ENCONTRADO));

        cargo.setEstado(false);
        return cargoRepository.save(cargo);
    }


    private void validarNombreUnico(String nombre) {
        cargoRepository.findByNombre(nombre)
                .orElseThrow(()-> new ResourceAlreadyExistsException(NotFoundMessages.CARGO_NO_ENCONTRADO));
    }

}
