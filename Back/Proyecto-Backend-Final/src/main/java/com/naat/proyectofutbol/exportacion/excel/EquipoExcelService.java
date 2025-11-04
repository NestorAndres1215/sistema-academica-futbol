package com.naat.proyectofutbol.exportacion.excel;


import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.repositorios.EquipoRepository;
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
public class EquipoExcelService {

    private final EquipoRepository equipoRepository;

    public ResponseEntity<byte[]> exportToExcelEquipos(String fileName) throws IOException {

        List<Equipo> equipoList = equipoRepository.findByEstadoTrue(); // Obtener la lista de equipos

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de Equipos");

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
            headerRow.createCell(0).setCellValue("Nombre del Equipo");
            headerRow.createCell(1).setCellValue("Categoría");
            headerRow.createCell(2).setCellValue("Sede");
            headerRow.createCell(3).setCellValue("Género");

            // Aplicar el estilo de encabezado
            for (int i = 0; i <= 3; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            // Llenar con los datos de los equipos
            int rowNum = 1;
            for (Equipo equipo : equipoList) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(equipo.getNombre());
                row.createCell(1).setCellValue(equipo.getCategoria());
                row.createCell(2).setCellValue(equipo.getSede());
                row.createCell(3).setCellValue(equipo.getGenero());

                // Aplicar el estilo de datos
                for (int i = 0; i <= 3; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }

            // Ajustar el tamaño de las columnas
            for (int i = 0; i <= 3; i++) {
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
