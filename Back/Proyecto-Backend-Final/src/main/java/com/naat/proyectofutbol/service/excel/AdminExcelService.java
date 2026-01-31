package com.naat.proyectofutbol.service.excel;


import com.naat.proyectofutbol.model.Admin;
import com.naat.proyectofutbol.repository.AdminRepository;
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
public class AdminExcelService {


    private final AdminRepository adminRepository;

    public ResponseEntity<byte[]> exportToExcel(String fileName) throws IOException {

        List<Admin> dataList = adminRepository.findByEstadoTrue();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos");

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
        headerRow.createCell(7).setCellValue("DNI");
        headerRow.createCell(8).setCellValue("Dirección");
        headerRow.createCell(9).setCellValue("Edad");
        headerRow.createCell(10).setCellValue("Fecha de Nacimiento");
        headerRow.createCell(11).setCellValue("Nacionalidad");
        headerRow.createCell(12).setCellValue("Estado");

        for (int i = 0; i <= 12; i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        int rowNum = 1;
        for (Admin data : dataList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(data.getCodigo());
            row.createCell(1).setCellValue(data.getPrimerNombre());
            row.createCell(2).setCellValue(data.getSegundoNombre());
            row.createCell(3).setCellValue(data.getApellidoPaterno());
            row.createCell(4).setCellValue(data.getApellidoMaterno());
            row.createCell(5).setCellValue(data.getCorreo());
            row.createCell(6).setCellValue(data.getTelefono());
            row.createCell(7).setCellValue(data.getDni());
            row.createCell(8).setCellValue(data.getDireccion());
            row.createCell(9).setCellValue(data.getEdad());
            row.createCell(10).setCellValue(data.getFechaNacimiento().toString());
            row.createCell(11).setCellValue(data.getNacionalidad());
            row.createCell(12).setCellValue(data.isEstado() ? "Activo" : "Inactivo");

            for (int i = 0; i <= 12; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        for (int i = 0; i <= 12; i++) {
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
