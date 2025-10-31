package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Cargo;
import com.naat.proyectofutbol.repositorios.CargoRepository;
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
public class CargoExcelService {


    @Autowired
    private CargoRepository cargoRepository;

    public ResponseEntity<byte[]> exportToExcelCargo(String fileName) throws IOException {

        List<Cargo> cargoList = cargoRepository.findByEstadoTrue();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de Cargo");

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
            headerRow.createCell(2).setCellValue("Descripción");

            // Aplicar el estilo de encabezado
            for (int i = 0; i <= 2; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            // Llenar con los datos de las sedes
            int rowNum = 1;
            for (Cargo cargo : cargoList) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(cargo.getCodigo());
                row.createCell(1).setCellValue(cargo.getNombre());
                row.createCell(2).setCellValue(cargo.getDescripcion());

                // Aplicar el estilo de datos
                for (int i = 0; i <= 2; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }

            // Ajustar el tamaño de las columnas
            for (int i = 0; i <= 2; i++) {
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
