package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Clase;

import com.naat.proyectofutbol.repositorios.ClaseRepository;
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
public class ClaseExcelService {

    private final ClaseRepository claseRepository;
    public ResponseEntity<byte[]> exportToExcel(String fileName) throws IOException {

        List<Clase> claseList = claseRepository.findAll(); // Obtener la lista de clases

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de Clases");

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
            headerRow.createCell(1).setCellValue("Nombre");
            headerRow.createCell(2).setCellValue("Equipo");
            headerRow.createCell(3).setCellValue("Género");
            headerRow.createCell(4).setCellValue("Inicio Hora");
            headerRow.createCell(5).setCellValue("Fin Hora");
            headerRow.createCell(6).setCellValue("Fecha Inicio");
            headerRow.createCell(7).setCellValue("Fecha Fin");
            headerRow.createCell(8).setCellValue("Día");


            // Aplicar el estilo de encabezado
            for (int i = 0; i <= 8; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            // Llenar con los datos de las clases
            int rowNum = 1;
            for (Clase clase : claseList) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(clase.getCodigo());
                row.createCell(1).setCellValue(clase.getNombre());
                row.createCell(2).setCellValue(clase.getEquipo().getNombre()); // Asumimos que Equipo tiene un campo 'nombre'
                row.createCell(3).setCellValue(clase.getEquipo().getGenero()); // Asumimos que Equipo tiene un campo 'genero'

                // Formatear el inicioHora y finHora como hora en formato HH:mm:ss
                if (clase.getHorario().getInicioHora() != null) {
                    row.createCell(4).setCellValue(clase.getHorario().getInicioHora().toString());  // Inicio Hora
                }
                if (clase.getHorario().getFinHora() != null) {
                    row.createCell(5).setCellValue(clase.getHorario().getFinHora().toString());  // Fin Hora
                }

                row.createCell(6).setCellValue(clase.getInicio().toString()); // Fecha Inicio
                row.createCell(7).setCellValue(clase.getFin().toString()); // Fecha Fin
                row.createCell(8).setCellValue(clase.getDia());


                // Aplicar el estilo de datos
                for (int i = 0; i <= 8; i++) {
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
