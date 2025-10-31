package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.exportacion.excel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@RestController
@RequestMapping("/exportacion/excel")
public class ExportacionExcelController {
    @Autowired
    private AdminExcelService adminExcelService;
    @Autowired
    private SedeExcelService sedeExcelService;
    @Autowired
    private CargoExcelService cargoExcelService;
    @Autowired
    private ProfesorExcelService profesorExcelService;
    @Autowired
    private  EquipoExcelService equipoExcelService;
    @Autowired
    private EstudianteExcelService estudianteExcelService;
    @Autowired ClaseExcelService claseExcelService;
    @Autowired PartidoExcelService partidoExcelService;
    @GetMapping("/usuario")
    public ResponseEntity<byte[]> exportToExcel() {
        try {
            String fileName = "datos_exportados.xlsx";
            return adminExcelService.exportToExcel(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/sede")
    public ResponseEntity<byte[]> exportarSedes() {
        try {
            String fileName = "datos_exportados_sedes.xlsx";
            return sedeExcelService.exportToExcelSede(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/cargo")
    public ResponseEntity<byte[]> exportarCargo() {
        try {
            String fileName = "datos_exportados_cargo.xlsx";
            return cargoExcelService.exportToExcelCargo(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/profesor")
    public ResponseEntity<byte[]> exportarProfesor() {
        try {
            String fileName = "datos_exportados_profesor.xlsx";
            return profesorExcelService.exportToExcelProfesor(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/estudiante")
    public ResponseEntity<byte[]> exportarEstudiante() {
        try {
            String fileName = "datos_exportados_estudiante.xlsx";
            return estudianteExcelService.exportToExcelProfesor(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/equipo")
    public ResponseEntity<byte[]> exportarEquipo() {
        try {
            String fileName = "datos_exportados_equipo.xlsx";
            return equipoExcelService.exportToExcelEquipos(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/clase")
    public ResponseEntity<byte[]> exportarClase() {
        try {
            String fileName = "datos_exportados_equipo.xlsx";
            return claseExcelService.exportToExcel(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/partido/activado")
    public ResponseEntity<byte[]> exportarPartidoActivados() {
        try {
            String fileName = "datos_exportados_partidos_activados.xlsx";
            return partidoExcelService.partidosExcelActivo(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/partido/desactivado")
    public ResponseEntity<byte[]> exportarPartidoDesactivados() {
        try {
            String fileName = "datos_exportados_partidos_activados.xlsx";
            return partidoExcelService.partidosExcelDesactivo(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
