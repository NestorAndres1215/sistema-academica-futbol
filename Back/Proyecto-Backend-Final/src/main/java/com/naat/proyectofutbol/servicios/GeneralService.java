package com.naat.proyectofutbol.servicios;


import com.naat.proyectofutbol.dto.GeneralDevDTO;
import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.General;
import com.naat.proyectofutbol.entidades.GeneralDev;
import com.naat.proyectofutbol.entidades.Sede;

import java.util.List;

public interface GeneralService {
    List<General> listarGeneral();

    List<GeneralDev> findGeneralDevByEstadoTrueAndCodigo(String codigo);

    General guardarGeneral(General general) throws Exception;

    General actualizarGeneral(General general);

    boolean existsByCodigo(String codigo);

    boolean existsByClave(String clave);

    boolean existsByDescripcion(String Descripcion);

    List<General> findGeneralByEstadoTrue();

    List<General> findGeneralByEstadoFalse();

    List<GeneralDev> desactivar(String generalCodigo);

    List<GeneralDev> activar(String generalCodigo);

    String obtenerUltimoCodigo();


    GeneralDev guardarGeneralDev(GeneralDevDTO general) throws Exception;

    GeneralDev actualizarGeneralDev(GeneralDevDTO general);

    boolean existsByCodigoDev(String codigo);

    boolean existsByClaveDev(String clave);

    boolean existsByClaveAndCodigo(String clave, String codigo);

    List<GeneralDev> findGeneralDevByEstadoTrue();

    List<GeneralDev> findGeneralDevByEstadoFalse();

    String UltimoCodigo();

    GeneralDev desactivarGen(String generalCodigo);

    GeneralDev activarGen(String generalCodigo);

    List<General> desactivarGenrales(String generalCodigo);

    List<General> activarGenrales(String generalCodigo);

}
