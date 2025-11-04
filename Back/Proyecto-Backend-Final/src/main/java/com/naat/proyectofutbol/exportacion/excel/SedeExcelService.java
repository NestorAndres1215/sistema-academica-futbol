package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Sede;
import com.naat.proyectofutbol.repositorios.SedeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SedeExcelService {

    private final SedeRepository sedeRepository;

    public ResponseEntity<byte[]> exportToExcelSede(String fileName) throws IOException {
        // Obtener los datos de la base de datos
        List<Sede> sedeList = sedeRepository.findByEstadoTrue();

        // Crear el libro y la hoja Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos de Sedes");

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
        headerRow.createCell(2).setCellValue("Teléfono");
        headerRow.createCell(3).setCellValue("Dirección");

        // Aplicar el estilo de encabezado
        for (int i = 0; i <= 3; i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        // Llenar con los datos de las sedes
        int rowNum = 1;
        for (Sede sede : sedeList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(sede.getCodigo());
            row.createCell(1).setCellValue(sede.getNombre());
            row.createCell(2).setCellValue(sede.getTelefono());
            row.createCell(3).setCellValue(sede.getDireccion());

            // Aplicar el estilo de datos
            for (int i = 0; i <= 3; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Ajustar el tamaño de las columnas
        for (int i = 0; i <= 3; i++) {
            sheet.autoSizeColumn(i);
        }

        // Escribir el archivo Excel a un ByteArrayOutputStream
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        workbook.write(byteArrayOutputStream);
        workbook.close();

        // Preparar la respuesta HTTP con el archivo Excel
        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return ResponseEntity.ok()
                .headers(headers)
                .body(excelBytes);
    }
}
