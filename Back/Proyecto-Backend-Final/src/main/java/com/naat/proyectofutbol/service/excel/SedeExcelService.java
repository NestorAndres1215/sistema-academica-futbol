package com.naat.proyectofutbol.service.excel;

import com.naat.proyectofutbol.model.Sede;

import com.naat.proyectofutbol.repository.SedeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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

        List<Sede> sedeList = sedeRepository.findByEstadoTrue();


        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos de Sedes");

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
        headerRow.createCell(1).setCellValue("Nombre");
        headerRow.createCell(2).setCellValue("Teléfono");
        headerRow.createCell(3).setCellValue("Dirección");

        for (int i = 0; i <= 3; i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        int rowNum = 1;
        for (Sede sede : sedeList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(sede.getCodigo());
            row.createCell(1).setCellValue(sede.getNombre());
            row.createCell(2).setCellValue(sede.getTelefono());
            row.createCell(3).setCellValue(sede.getDireccion());

            for (int i = 0; i <= 3; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        for (int i = 0; i <= 3; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        workbook.write(byteArrayOutputStream);
        workbook.close();

        byte[] excelBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return ResponseEntity.ok()
                .headers(headers)
                .body(excelBytes);
    }
}
