package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.ClaseDTO;
import com.naat.proyectofutbol.dto.ClaseDevDTO;
import com.naat.proyectofutbol.dto.EquipoDTO;
import com.naat.proyectofutbol.entidades.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface ClaseService {
    List<Clase> listaractivados();
    List<Clase> listardesactivados();
    Clase registrar(ClaseDTO claseDTO) throws Exception;
    Clase actualizar (ClaseDTO claseDTO)throws  Exception;
    String obtenerCodigo();
    boolean existsByInicioAndFinAndHorarioAndDia(
            LocalDate inicio, LocalDate fin, Horario horario, String dia
    );
    List<ClaseDev> listarDevactivados();
    List<ClaseDev> listarDevdesactivados();
    ClaseDev registrardev(ClaseDevDTO claseDevDTO);
    String obtenerCodigoDev();
    ClaseDev actualizardev(ClaseDevDTO claseDevDTO);
}
