package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Profesor;
import com.naat.proyectofutbol.repositorios.ProfesorRepository;
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
public class ProfesorExcelService {
@Autowired
private ProfesorRepository profesorRepository;

    public ResponseEntity<byte[]> exportToExcelProfesor(String fileName) throws IOException {

        List<Profesor> profesorList = profesorRepository.findByEstadoTrue();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de Profesor");

            // Crear estilo para el encabezado
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            // Crear estilo para las celdas de datos
            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setAlignment(HorizontalAlignment.CENTER);
            dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);

            // Crear encabezados
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
            headerRow.createCell(9).setCellValue("Cargo");
            headerRow.createCell(10).setCellValue("Sede");

            // Aplicar el estilo de encabezado
            for (int i = 0; i <= 10; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            // Llenar con los datos de los profesores
            int rowNum = 1;
            for (Profesor profesor : profesorList) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(profesor.getCodigo());
                row.createCell(1).setCellValue(profesor.getPrimerNombre());
                row.createCell(2).setCellValue(profesor.getSegundoNombre());
                row.createCell(3).setCellValue(profesor.getApellidoPaterno());
                row.createCell(4).setCellValue(profesor.getApellidoMaterno());
                row.createCell(5).setCellValue(profesor.getCorreo());
                row.createCell(6).setCellValue(profesor.getTelefono());
                row.createCell(7).setCellValue(profesor.getEdad());
                row.createCell(8).setCellValue(profesor.getDireccion());

                // Agregar los valores de Cargo y Sede
                if (profesor.getCargo() != null) {
                    row.createCell(9).setCellValue(profesor.getCargo().getNombre()); // Cargo
                } else {
                    row.createCell(9).setCellValue("No asignado");
                }

                if (profesor.getSede() != null) {
                    row.createCell(10).setCellValue(profesor.getSede().getNombre()); // Sede
                } else {
                    row.createCell(10).setCellValue("No asignada");
                }

                // Aplicar el estilo de datos
                for (int i = 0; i <= 10; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }

            // Ajustar el tamaño de las columnas
            for (int i = 0; i <= 10; i++) {
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
