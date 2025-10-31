package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.repositorios.AdminRepository;
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
public class AdminExcelService {


    @Autowired
    private AdminRepository adminRepository;  // Inyectamos el repositorio

    public ResponseEntity<byte[]> exportToExcel(String fileName) throws IOException {
        // Obtener los datos de la base de datos
        List<Admin> dataList = adminRepository.findByEstadoTrue();

        // Crear el libro y la hoja Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Datos");

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
        headerRow.createCell(7).setCellValue("DNI");
        headerRow.createCell(8).setCellValue("Dirección");
        headerRow.createCell(9).setCellValue("Edad");
        headerRow.createCell(10).setCellValue("Fecha de Nacimiento");
        headerRow.createCell(11).setCellValue("Nacionalidad");
        headerRow.createCell(12).setCellValue("Estado");

        // Aplicar el estilo de encabezado
        for (int i = 0; i <= 12; i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        // Llenar con los datos
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

            // Aplicar el estilo de datos
            for (int i = 0; i <= 12; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Ajustar el tamaño de las columnas
        for (int i = 0; i <= 12; i++) {
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
