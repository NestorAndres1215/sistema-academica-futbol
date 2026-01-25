package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Cargo;
import com.naat.proyectofutbol.repositorios.CargoRepository;
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
public class CargoService{


    private final CargoRepository cargoRepository;



    // Guardar un nuevo cargo o actualizar uno existente
    public Cargo guardarCargo(Cargo cargo) {
        try {

            String ultimoCodigo = obtenerUltimoCodigo();

            String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
            if (ExistePorNombre(cargo.getNombre())) {
                throw new IllegalArgumentException("NOMBRE YA EXISTE");
            }
            cargo.setCodigo(nuevoCodigo);

            cargo.setEstado(true);
            cargo.setUsuarioCreacion(cargo.getUsuarioCreacion());
            cargo.setFechaCreacion(LocalDate.now());
            cargo.setHoraCreacion(LocalTime.now());
            return cargoRepository.save(cargo);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("No se pudo guardar la sede: " + e.getMessage(), e);
        }
    }

    // Actualizar un cargo existente
    public Cargo actualizarCargo( Cargo cargo) {
        try {

            Optional<Cargo> cargoOptional = cargoRepository.findById(cargo.getCodigo());
            if (!cargoOptional.isPresent()) {
                throw new RuntimeException("La sede con código " + cargo.getCodigo() + " no existe.");
            }

            Cargo cargoExistente = cargoOptional.get();

            if (!cargo.getNombre().equals(cargoExistente.getNombre())) {

                if (ExistePorNombre(cargo.getNombre())) {
                    throw new IllegalArgumentException("NOMBRE YA EXISTE");
                }
            }

            cargoExistente.setNombre(cargo.getNombre());
            cargoExistente.setDescripcion(cargo.getDescripcion());
            cargoExistente.setEstado(true);
            cargoExistente.setUsuarioActualizacion(cargo.getUsuarioActualizacion());
            cargoExistente.setFechaActualizacion(LocalDate.now());
            cargoExistente.setHoraActualizacion(LocalTime.now());
            return cargoRepository.save(cargoExistente);

        } catch (Exception e) {

            throw new RuntimeException("No se pudo actualizar la sede: " + e.getMessage(), e);
        }
    }




    public String obtenerUltimoCodigo() {
        return cargoRepository.obtenerUltimoCodigo();
    }


    public List<Cargo> findAdminsByEstadoTrue() {
        return cargoRepository.findByEstadoTrue();
    }


    public List<Cargo> findAdminsByEstadoFalse() {
        return cargoRepository.findByEstadoFalse();
    }


    public Cargo desactivarSede(String sedeCodigo) {
        Optional<Cargo> cargoExistenteOpt = cargoRepository.findById(sedeCodigo);
        if (cargoExistenteOpt.isPresent()) {
            Cargo cargo = cargoExistenteOpt.get();
            cargo.setEstado(false);
            return cargoRepository.save(cargo);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + sedeCodigo);
        }
    }

    public Cargo activarSede(String sedeCodigo) {
        Optional<Cargo> cargoExistenteOpt = cargoRepository.findById(sedeCodigo);
        if (cargoExistenteOpt.isPresent()) {
            Cargo cargo = cargoExistenteOpt.get();
            cargo.setEstado(true);
            return cargoRepository.save(cargo);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + sedeCodigo);
        }
    }


    public boolean ExistePorNombre(String nombre) {
        return cargoRepository.existsByNombre(nombre);
    }


    public List<Cargo> findByNombre(String nombre) {
        return cargoRepository.findByNombre(nombre);
    }
}
