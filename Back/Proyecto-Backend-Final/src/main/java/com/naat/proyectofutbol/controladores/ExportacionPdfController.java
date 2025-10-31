package com.naat.proyectofutbol.controladores;


import com.naat.proyectofutbol.exportacion.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.itextpdf.text.DocumentException;

import java.io.IOException;
@RestController
@RequestMapping("/exportacion/pdf")
public class ExportacionPdfController {
    @Autowired
    private AdminPDFService adminPDFService;
    @Autowired
    private SedePDFService sedePDFService;
    @Autowired
    private CargoPDFService cargoPDFService;
    @Autowired
    private ProfesorPDFService profesorPDFService;
    @Autowired
    private EstudiantePDFService estudiantePDFService;
    @Autowired
    private EquipoPDFService equipoPDFService;
    @Autowired
    private ClasePDFService clasePDFService;
    @Autowired
    private PartidoPDFService partidoPDFService;
    @GetMapping("/usuario")
    public ResponseEntity<byte[]> generarInformePdfUsuarios() throws IOException, DocumentException {
        byte[] pdfBytes = adminPDFService.generarInformePdf();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "informe_usuarios.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }


    @GetMapping("/sede")
    public ResponseEntity<byte[]> generarInformePdfSedes() throws IOException, DocumentException {
        byte[] pdfBytes = sedePDFService.generarInformePdfSede();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "informe_sedes.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/cargo")
    public ResponseEntity<byte[]> generarInformePdfCargo() throws IOException, DocumentException {
        byte[] pdfBytes = cargoPDFService.generarInformePdfCargo();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "informe_cargo.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }


    @GetMapping("/profesor")
    public ResponseEntity<byte[]> generarInformePdfProfersor() throws IOException, DocumentException {

        byte[] pdfBytes = profesorPDFService.generarInformePdfProfesor();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "informe_profesor.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/estudiante")
    public ResponseEntity<byte[]> generarInformePdfEstudiante() throws IOException, DocumentException {
        byte[] pdfBytes = estudiantePDFService.generarInformePdfProfesor();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "informe_estudiante.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
    @GetMapping("/equipo")
    public ResponseEntity<byte[]> generarInformePdfEquipo() throws IOException, DocumentException {
        byte[] pdfBytes = equipoPDFService.generarInformePdfEquipos();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "equipo.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
    @GetMapping("/clase")
    public ResponseEntity<byte[]> generarInformePdfClase() throws IOException, DocumentException {
        byte[] pdfBytes = clasePDFService.generarInformePdfClases();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "clase.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
    @GetMapping("/partido/activo")
    public ResponseEntity<byte[]> generarInformePdfPartidoActivo() throws IOException, DocumentException {
        byte[] pdfBytes = partidoPDFService.generarInformePartidosPdf();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "partido.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
    @GetMapping("/partido/desactivo")
    public ResponseEntity<byte[]> generarInformePdfPartidoDesactivo() throws IOException, DocumentException {
        byte[] pdfBytes = partidoPDFService.generarInformePartidosDesactivadosPdf();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "partido.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
