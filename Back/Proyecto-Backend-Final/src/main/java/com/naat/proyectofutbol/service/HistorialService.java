package com.naat.proyectofutbol.service;

import com.naat.proyectofutbol.dto.request.HistorialRequest;
import com.naat.proyectofutbol.model.Historial;
import com.naat.proyectofutbol.model.Usuario;

import java.util.List;

public interface HistorialService {
    Historial guardar(HistorialRequest historial);

    List<Historial> obtenerHistorialPorUsuario(String codigo);

    String UltimoCodigo();

    Usuario findById(String codigo);
}
