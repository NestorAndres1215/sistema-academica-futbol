package com.naat.proyectofutbol.servicios;


import com.naat.proyectofutbol.entidades.Sede;
import com.naat.proyectofutbol.repositorios.SedeRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class SedeServiceImpl implements SedeService{

    @Autowired
    private SedeRepository sedeRepository;



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
        try {

            String ultimoCodigo = obtenerUltimoCodigo();

            String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
            if (ExistePorTelefono(sede.getTelefono())) {
                throw new IllegalArgumentException("TELEFONO YA EXISTE");
            }
            if (!telefonoEsValido(sede.getTelefono())) {
                throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
            }

            sede.setCodigo(nuevoCodigo);
            sede.setEstado(true);
            sede.setUsuarioCreacion(sede.getUsuarioCreacion());
            sede.setFechaCreacion(LocalDate.now());
            sede.setHoraCreacion(LocalTime.now());



            return sedeRepository.save(sede);
        } catch (Exception e) {
            e.printStackTrace();  // Imprimir el stack trace completo para depuración
            throw new RuntimeException("No se pudo guardar la sede: " + e.getMessage(), e);  // Relanzar la excepción o manejarla según sea necesario
        }
    }

    @Override
    public Sede actualizarSede(Sede sede) {
        try {

            Optional<Sede> sedeOptional = sedeRepository.findById(sede.getCodigo());
            if (!sedeOptional.isPresent()) {
                throw new RuntimeException("La sede con código " + sede.getCodigo() + " no existe.");
            }

            Sede sedeExistente = sedeOptional.get();

            if (!sede.getTelefono().equals(sedeExistente.getTelefono())) {

                if (ExistePorTelefono(sede.getTelefono())) {
                    throw new IllegalArgumentException("TELEFONO YA EXISTE");
                }
            }
            sedeExistente.setTelefono(sede.getTelefono());
            sedeExistente.setNombre(sede.getNombre());
            sedeExistente.setDireccion(sede.getDireccion());
            sedeExistente.setEstado(true);
            sedeExistente.setUsuarioActualizacion(sede.getUsuarioActualizacion());
            sedeExistente.setFechaActualizacion(LocalDate.now());
            sedeExistente.setHoraActualizacion(LocalTime.now());
            return sedeRepository.save(sedeExistente);

        } catch (Exception e) {

            throw new RuntimeException("No se pudo actualizar la sede: " + e.getMessage(), e);
        }
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
    public Sede desactivarSede(String sedeCodigo) {
        Optional<Sede> sedeExistenteOpt = sedeRepository.findById(sedeCodigo);
        if (sedeExistenteOpt.isPresent()) {
            Sede sede = sedeExistenteOpt.get();
            sede.setEstado(false);
            return sedeRepository.save(sede);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + sedeCodigo);
        }
    }

    @Override
    public Sede activarSede(String sedeCodigo) {
        Optional<Sede> sedeExistenteOpt = sedeRepository.findById(sedeCodigo);
        if (sedeExistenteOpt.isPresent()) {
            Sede sede = sedeExistenteOpt.get();
            sede.setEstado(true);
            return sedeRepository.save(sede);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + sedeCodigo);
        }
    }
    @Override
    public boolean ExistePorTelefono(String telefono) {
        return sedeRepository.existsByTelefono(telefono);
    }
    @Override
    public boolean telefonoEsValido(String telefono) {
        return telefono != null && telefono.matches("\\d{9}");
    }

}
