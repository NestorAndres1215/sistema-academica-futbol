package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.service.excel.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/exportacion/excel")
@RequiredArgsConstructor
public class ExcelController {

    private final AdminExcelService adminExcelService;
    private final SedeExcelService sedeExcelService;
    private final CargoExcelService cargoExcelService;
    private final ProfesorExcelService profesorExcelService;
    private final EquipoExcelService equipoExcelService;
    private final EstudianteExcelService estudianteExcelService;
    private final ClaseExcelService claseExcelService;
    private final PartidoExcelService partidoExcelService;

    @GetMapping("/usuario")
    public ResponseEntity<byte[]> exportToExcel() throws IOException {

        String fileName = "datos_exportados.xlsx";
        return adminExcelService.exportToExcel(fileName);

    }

    @GetMapping("/sede")
    public ResponseEntity<byte[]> exportarSedes() throws IOException {
        String fileName = "datos_exportados_sedes.xlsx";
        return sedeExcelService.exportToExcelSede(fileName);
    }

    @GetMapping("/cargo")
    public ResponseEntity<byte[]> exportarCargo() throws IOException {
        String fileName = "datos_exportados_cargo.xlsx";
        return cargoExcelService.exportToExcelCargo(fileName);
    }

    @GetMapping("/profesor")
    public ResponseEntity<byte[]> exportarProfesor() throws IOException {
        String fileName = "datos_exportados_profesor.xlsx";
        return profesorExcelService.exportToExcelProfesor(fileName);
    }

    @GetMapping("/estudiante")
    public ResponseEntity<byte[]> exportarEstudiante() throws IOException {
        String fileName = "datos_exportados_estudiante.xlsx";
        return estudianteExcelService.exportToExcelProfesor(fileName);
    }

    @GetMapping("/equipo")
    public ResponseEntity<byte[]> exportarEquipo() throws IOException {
        String fileName = "datos_exportados_equipo.xlsx";
        return equipoExcelService.exportToExcelEquipos(fileName);
    }

    @GetMapping("/clase")
    public ResponseEntity<byte[]> exportarClase() throws IOException {
        String fileName = "datos_exportados_equipo.xlsx";
        return claseExcelService.exportToExcel(fileName);
    }

    @GetMapping("/partido/activado")
    public ResponseEntity<byte[]> exportarPartidoActivados() throws IOException {
        String fileName = "datos_exportados_partidos_activados.xlsx";
        return partidoExcelService.partidosExcelActivo(fileName);
    }

    @GetMapping("/partido/desactivado")
    public ResponseEntity<byte[]> exportarPartidoDesactivados() throws IOException {

        String fileName = "datos_exportados_partidos_activados.xlsx";
        return partidoExcelService.partidosExcelDesactivo(fileName);

    }
}
