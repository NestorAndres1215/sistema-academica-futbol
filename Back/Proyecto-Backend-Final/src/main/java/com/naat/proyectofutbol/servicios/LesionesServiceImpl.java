package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.DetalleLesionDTO;
import com.naat.proyectofutbol.dto.LesionesDTO;
import com.naat.proyectofutbol.entidades.*;
import com.naat.proyectofutbol.repositorios.EquipoDevRepository;
import com.naat.proyectofutbol.repositorios.LesionDevRepository;
import com.naat.proyectofutbol.repositorios.LesionesRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class LesionesServiceImpl implements LesionesService{

    @Autowired
    private LesionesRepository lesionesRepository;
    @Autowired
    private LesionDevRepository lesionDevRepository;
    @Autowired
    private EquipoDevRepository equipoDevRepository;
    @Override
    public List<Lesiones> findAdminsByEstadoTrue() {
        return lesionesRepository.findByEstadoTrue();
    }

    @Override
    public List<Lesiones> findAdminsByEstadoFalse() {
        return lesionesRepository.findByEstadoFalse();
    }

    @Override
    public List<LesionesDev> listar() {
        return lesionDevRepository.findAll();
    }



    public Lesiones registrarLesiones(LesionesDTO lesionesDTO) {
        try {
            String ultimoCodigo = obtenerUltimoCodigo();
            String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
            System.out.print(lesionesDTO.getEquipo());
            desactivar(lesionesDTO.getEquipo());
            Lesiones lesiones  =  new Lesiones();
            lesiones.setCodigo(nuevoCodigo);
            lesiones.setDescripcion(lesionesDTO.getDescripcion());
            lesiones.setComentarios(lesionesDTO.getComentarios());
            lesiones.setGravedad(lesionesDTO.getGravedad());
            lesiones.setFechaLesion(lesionesDTO.getFechaLesion());
            lesiones.setFechaRecuperacion(lesionesDTO.getFechaRecuperacion());
            lesiones.setTiempoRecuperacion(lesionesDTO.getTiempoRecuperacion());
            lesiones.setTipoLesion(lesionesDTO.getTipoLesion());
            lesiones.setEstudiante(lesionesDTO.getEstudiante());
            lesiones.setFechaCreacion(LocalDate.now());
            lesiones.setHoraCreacion(LocalTime.now());
            lesiones.setEstado(true);
            return lesionesRepository.save(lesiones);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error al registrar lesión: " + e.getMessage());
            throw new RuntimeException("No se pudo registrar la lesión", e);
        }
    }


    @Override
    public String obtenerUltimoCodigo() {
        return lesionesRepository.obtenerUltimoCodigo();
    }

    @Override
    public EquipoDev desactivar(String usuarioCodigo) {
        Optional<EquipoDev> equipoOptional = equipoDevRepository.findById(usuarioCodigo);
        if (equipoOptional.isPresent()) {
            EquipoDev equipo = equipoOptional.get();
            equipo.setEstado(false);
            return equipoDevRepository.save(equipo);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + usuarioCodigo);
        }
    }

    @Override
    public LesionesDev registrarLesionesDev(DetalleLesionDTO detalleLesionDTO) {
        String ultimoCodigo = lesionDevRepository.obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        LesionesDev lesiones  =  new LesionesDev();
        lesiones.setCodigo(nuevoCodigo);
        lesiones.setDescripcion(detalleLesionDTO.getDescripcion());
        lesiones.setLesiones(detalleLesionDTO.getLesiones());
        lesiones.setObservaciones(detalleLesionDTO.getObservaciones());
        lesiones.setFecha(LocalDate.now());
        lesiones.setHora(LocalTime.now());

        lesiones.setFechaCreacion(LocalDate.now());
        lesiones.setHoraCreacion(LocalTime.now());

        return lesionDevRepository.save(lesiones);
    }


}
