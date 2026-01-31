package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.model.Feriado;

import java.io.IOException;
import java.util.List;

public interface FeriadoService {

    List<Feriado> obtenerFeriados() throws IOException;

}
