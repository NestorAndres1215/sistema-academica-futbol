package com.naat.proyectofutbol.service.excel;

import com.naat.proyectofutbol.model.Profesor;
import com.naat.proyectofutbol.repository.ProfesorRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesorExcelService {

    private final ProfesorRepository profesorRepository;

    public ResponseEntity<byte[]> exportToExcelProfesor(String fileName) throws IOException {

        List<Profesor> profesorList = profesorRepository.findByEstadoTrue();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Datos de Profesor");

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
            headerRow.createCell(9).setCellValue("Cargo");
            headerRow.createCell(10).setCellValue("Sede");

            for (int i = 0; i <= 10; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

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

                if (profesor.getCargo() != null) {
                    row.createCell(9).setCellValue(profesor.getCargo().getNombre());
                } else {
                    row.createCell(9).setCellValue("No asignado");
                }

                if (profesor.getSede() != null) {
                    row.createCell(10).setCellValue(profesor.getSede().getNombre());
                } else {
                    row.createCell(10).setCellValue("No asignada");
                }

                for (int i = 0; i <= 10; i++) {
                    row.getCell(i).setCellStyle(dataStyle);
                }
            }

            for (int i = 0; i <= 10; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(byteArrayOutputStream);
        }

        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

        return ResponseEntity.ok()
                .headers(headers)
                .body(excelBytes);
    }
}
