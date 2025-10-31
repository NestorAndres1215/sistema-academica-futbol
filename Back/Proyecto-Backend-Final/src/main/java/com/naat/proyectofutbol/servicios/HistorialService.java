package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.HistorialDTO;
import com.naat.proyectofutbol.entidades.Historial;
import com.naat.proyectofutbol.entidades.Usuario;

import java.util.List;

public interface HistorialService {
    List<Historial> obtenerHistorialPorUsuario(Usuario usuario);
    Usuario findById(String codigo);
    Historial guardar(HistorialDTO historial);
    String UltimoCodigo();
}
