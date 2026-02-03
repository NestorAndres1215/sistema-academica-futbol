package com.naat.proyectofutbol.service;


import com.naat.proyectofutbol.dto.request.GeneralDevRequest;
import com.naat.proyectofutbol.model.General;
import com.naat.proyectofutbol.model.GeneralDev;

import java.util.List;

public interface GeneralService {

    List<General> listarGeneral();

    List<GeneralDev> findGeneralDevByEstadoTrueAndCodigo(String codigo);

    General guardarGeneral(General general);

    General actualizarGeneral(General general);

    List<General> findGeneralByEstadoTrue();

    List<General> findGeneralByEstadoFalse();

    List<GeneralDev> cambiarListaGen(String generalCodigo, boolean estado);

    GeneralDev cambiarEstadoGen(String generalCodigo, boolean estado);

    List<General> cambiarEstadoGenerales(String generalCodigo, boolean estado);

    List<GeneralDev> findGeneralDevByEstadoFalse();

    GeneralDev guardarGeneralDev(GeneralDevRequest generalDTO);

    GeneralDev actualizarGeneralDev(GeneralDevRequest general);

    List<General> listarPorClave(String clave);

    List<General> listarPorDescripcion1(String descripcion1);

    List<General> findByClaveAndEstadoTrue(String clave);

    List<General> findByClaveAndEstadoFalse(String clave);
}
