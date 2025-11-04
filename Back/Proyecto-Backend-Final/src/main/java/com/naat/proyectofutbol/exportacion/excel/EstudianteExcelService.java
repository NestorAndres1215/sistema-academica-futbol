package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Estudiante;
import com.naat.proyectofutbol.entidades.Profesor;
import com.naat.proyectofutbol.repositorios.EstudianteRepository;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EstudianteExcelService {

    private final EstudianteRepository estudianteRepository;

    public ResponseEntity<byte[]> exportToExcelProfesor(String fileName) throws IOException {

        List<Estudiante> estudianteList = estudianteRepository.findByEstadoTrue();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de Estudiante");
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setAlignment(HorizontalAlignment.CENTER);
            dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);

            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Código");
            headerRow.createCell(1).setCellValue("Primer Nombre");
            headerRow.createCell(2).setCellValue("Segundo Nombre");
            headerRow.createCell(3).setCellValue("Apellido Paterno");
            headerRow.createCell(4).setCellValue("Apellido Materno");
            headerRow.createCell(5).setCellValue("Correo");
            headerRow.createCell(6).setCellValue("Teléfono");
            headerRow.createCell(7).setCellValue("Edad");
            headerRow.createCell(8).setCellValue("Dirección");
            headerRow.createCell(9).setCellValue("Sede");


            // Aplicar el estilo de encabezado
            for (int i = 0; i <= 9; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            // Llenar con los datos de los profesores
            int rowNum = 1;
            for (Estudiante estudiante : estudianteList) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(estudiante.getCodigo());
                row.createCell(1).setCellValue(estudiante.getPrimerNombre());
                row.createCell(2).setCellValue(estudiante.getSegundoNombre());
                row.createCell(3).setCellValue(estudiante.getApellidoPaterno());
                row.createCell(4).setCellValue(estudiante.getApellidoMaterno());
                row.createCell(5).setCellValue(estudiante.getCorreo());
                row.createCell(6).setCellValue(estudiante.getTelefono());
                row.createCell(7).setCellValue(estudiante.getEdad());
                row.createCell(8).setCellValue(estudiante.getDireccion());


                if (estudiante.getSede() != null) {
                    row.createCell(9).setCellValue(estudiante.getSede().getNombre()); // Sede
                } else {
                    row.createCell(9).setCellValue("No asignada");
                }

                // Aplicar el estilo de datos
                for (int i = 0; i <= 9; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }

            // Ajustar el tamaño de las columnas
            for (int i = 0; i <= 9; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(byteArrayOutputStream);

        }

        // Preparar la respuesta HTTP con el archivo Excel
        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

        return ResponseEntity.ok()
                .headers(headers)
                .body(excelBytes);

    }
}
