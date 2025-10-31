package com.naat.proyectofutbol.servicios;


import com.naat.proyectofutbol.entidades.Sede;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface SedeService {

    List<Sede> listarSedes();
    String obtenerUltimoCodigo();
    Sede guardarSede(Sede sede);
    Sede actualizarSede(Sede sede);
    List<Sede> findAdminsByEstadoTrue();
    List<Sede> findAdminsByEstadoFalse();
    Sede desactivarSede(String sedeCodigo);
    Sede activarSede(String sedeCodigo);
    boolean ExistePorTelefono(String telefono);
    boolean telefonoEsValido(String telefono);

}
