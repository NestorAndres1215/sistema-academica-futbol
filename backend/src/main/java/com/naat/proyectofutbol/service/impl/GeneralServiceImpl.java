package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.AlreadyExistsMessages;
import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.dto.request.GeneralDevRequest;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.General;
import com.naat.proyectofutbol.model.GeneralDev;
import com.naat.proyectofutbol.repository.GeneralDevRepository;
import com.naat.proyectofutbol.repository.GeneralRepository;
import com.naat.proyectofutbol.service.GeneralService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneralServiceImpl implements GeneralService {

    private final GeneralRepository generalRepository;

    private final GeneralDevRepository generalDevRepository;

    @Override
    public List<General> listarGeneral() {
        return generalRepository.findAll();
    }

    @Override
    public List<GeneralDev> findGeneralDevByEstadoTrueAndCodigo(String codigo) {
        return generalDevRepository.findByEstadoTrueAndCodigo(codigo);
    }

    @Override
    public General guardarGeneral(General general) {

        if (existsByDescripcion(general.getDescripcion1())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DESCRIPCION_YA_EXISTE);
        }

        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);


        general.setCodigo(nuevoCodigo);
        general.setClave(nuevoCodigo);
        general.setEstado(true);
        general.setFechaCreacion(LocalDate.now());
        general.setHoraCreacion(LocalTime.now());
        general.setUsuarioCreacion(general.getUsuarioCreacion());

        return generalRepository.save(general);
    }

    @Override
    public General actualizarGeneral(General general) {

        General generalExistente = generalRepository.findById(general.getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.GENERAL_NO_ENCONTRADO));

        if (!general.getDescripcion1().equals(generalExistente.getDescripcion1()) && existsByDescripcion(general.getDescripcion1())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DESCRIPCION_YA_EXISTE);
        }
        generalExistente.setDescripcion1(general.getDescripcion1());
        generalExistente.setEstado(true);
        generalExistente.setUsuarioActualizacion(general.getUsuarioActualizacion());
        generalExistente.setFechaActualizacion(LocalDate.now());
        generalExistente.setHoraActualizacion(LocalTime.now());
        return generalRepository.save(generalExistente);
    }

    @Override
    public List<General> findGeneralByEstadoTrue() {
        return generalRepository.findByEstadoTrue();
    }

    @Override
    public List<General> findGeneralByEstadoFalse() {
        return generalRepository.findByEstadoFalse();
    }


    @Override
    public List<GeneralDev> cambiarListaGen(String generalCodigo, boolean estado) {
        List<GeneralDev> generales = generalDevRepository.findByGeneralCodigo(generalCodigo);

        if (generales.isEmpty()) {
            throw new ResourceNotFoundException(NotFoundMessages.GENERAL_NO_ENCONTRADO);
        }

        generales.forEach(g -> g.setEstado(estado));

        return generalDevRepository.saveAll(generales);
    }

    @Override
    public GeneralDev cambiarEstadoGen(String generalCodigo, boolean estado) {
        GeneralDev general = generalDevRepository.findById(generalCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.GENERAL_NO_ENCONTRADO));

        general.setEstado(estado);

        return generalDevRepository.save(general);
    }

    @Override
    public List<General> cambiarEstadoGenerales(String generalCodigo, boolean estado) {

        List<General> generales = generalRepository.findByCodigo(generalCodigo);

        if (generales.isEmpty()) {
            throw new ResourceNotFoundException(NotFoundMessages.GENERAL_NO_ENCONTRADO);
        }

        generales.forEach(g -> g.setEstado(estado));

        return generalRepository.saveAll(generales);
    }

    @Override
    public List<GeneralDev> findGeneralDevByEstadoFalse() {
        return generalDevRepository.findByEstadoFalse();
    }

    @Override
    public GeneralDev guardarGeneralDev(GeneralDevRequest generalDTO) {

        General general = generalRepository.findById(generalDTO.getGeneral())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.GENERAL_NO_ENCONTRADO));

        validarGeneralDev(generalDTO);

        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        GeneralDev generalDev = GeneralDev.builder()
                .codigo(nuevoCodigo)
                .clave(generalDTO.getClave())
                .descripcion1(generalDTO.getDescripcionPrimero())
                .estado(true)
                .usuarioCreacion(general.getUsuarioCreacion())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .general(general)
                .build();

        return generalDevRepository.save(generalDev);
    }

    @Override
    public GeneralDev actualizarGeneralDev(GeneralDevRequest generalDTO) {

        GeneralDev generalExist = generalDevRepository.findById(generalDTO.getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.GENERAL_NO_ENCONTRADO));

        validarGeneralDevActualizar(generalDTO, generalExist);


        generalExist.setDescripcion1(generalDTO.getDescripcionPrimero());
        generalExist.setClave(generalDTO.getClave());
        generalExist.setUsuarioActualizacion(generalDTO.getUsuarioActualizacion());
        generalExist.setFechaActualizacion(LocalDate.now());
        generalExist.setHoraActualizacion(LocalTime.now());


        return generalDevRepository.save(generalExist);
    }

    @Override
    public List<General> listarPorClave(String clave) {
        return generalRepository.findByClave(clave);
    }

    @Override
    public List<General> listarPorDescripcion1(String descripcion1) {
        return generalRepository.findByDescripcion1(descripcion1);
    }

    @Override
    public List<General> findByClaveAndEstadoTrue(String clave) {
        return generalRepository.findByClaveAndEstadoTrue(clave);
    }

    @Override
    public List<General> findByClaveAndEstadoFalse(String clave) {
        return generalRepository.findByClaveAndEstadoFalse(clave);
    }

    private void validarGeneralDev(GeneralDevRequest generalDTO) {

        if (existsByDescripcion(generalDTO.getDescripcionPrimero())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DESCRIPCION_YA_EXISTE);
        }

        if (existsByClave(generalDTO.getClave())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CLAVE_YA_EXISTE);
        }
    }

    private void validarGeneralDevActualizar(GeneralDevRequest generalDTO, GeneralDev generalExist) {

        if (!generalExist.getDescripcion1().equals(generalDTO.getDescripcionPrimero()) && existsByDescripcion(generalDTO.getDescripcionPrimero())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DESCRIPCION_YA_EXISTE);
        }

        if (!generalExist.getClave().equals(generalDTO.getClave()) && existsByClave(generalDTO.getClave())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CLAVE_YA_EXISTE);
        }
    }


    public String obtenerUltimoCodigo() {
        return generalRepository.obtenerUltimoCodigo();
    }

    public boolean existsByClave(String clave) {
        return generalRepository.existsByClave(clave);
    }


    public boolean existsByDescripcion(String Descripcion) {
        return generalRepository.existsByDescripcion1(Descripcion);
    }


}
