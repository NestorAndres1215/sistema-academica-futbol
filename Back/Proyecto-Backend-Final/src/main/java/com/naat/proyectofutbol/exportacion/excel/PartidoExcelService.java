package com.naat.proyectofutbol.exportacion.excel;

import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.Partido;
import com.naat.proyectofutbol.repositorios.AdminRepository;
import com.naat.proyectofutbol.repositorios.PartidoRepository;
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
public class PartidoExcelService {

    private final PartidoRepository partidoRepository;  // Inyectamos el repositorio

    public ResponseEntity<byte[]> partidosExcelActivo(String fileName) throws IOException {
        // Obtener los datos de la base de datos
        List<Partido> dataList = partidoRepository.findByEstadoTrue();

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
        headerRow.createCell(1).setCellValue("Equipo");
        headerRow.createCell(2).setCellValue(" ");
        headerRow.createCell(3).setCellValue("Equipo Rival");
        headerRow.createCell(4).setCellValue("Tipo de Partido");
        headerRow.createCell(5).setCellValue("Lugar");
        headerRow.createCell(6).setCellValue("Fecha");
        headerRow.createCell(7).setCellValue("Hora");


        // Aplicar el estilo de encabezado
        for (int i = 0; i <= 7; i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        // Llenar con los datos
        int rowNum = 1;
        for (Partido data : dataList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(data.getCodigo());
            row.createCell(1).setCellValue(data.getEquipo().getNombre());
            row.createCell(2).setCellValue("VS");
            row.createCell(3).setCellValue(data.getEquipoRival());
            row.createCell(4).setCellValue(data.getTipoPartido());
            row.createCell(5).setCellValue(data.getLugar());
            row.createCell(6).setCellValue(data.getFecha().toString());
            row.createCell(7).setCellValue(data.getHora().toString());

            // Aplicar el estilo de datos
            for (int i = 0; i <= 7; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Ajustar el tamaño de las columnas
        for (int i = 0; i <= 7; i++) {
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
    public ResponseEntity<byte[]> partidosExcelDesactivo(String fileName) throws IOException {
        // Obtener los datos de la base de datos
        List<Partido> dataList = partidoRepository.findByEstadoFalse();

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
        headerRow.createCell(1).setCellValue("Equipo");
        headerRow.createCell(2).setCellValue("");
        headerRow.createCell(3).setCellValue("Equipo Rival");
        headerRow.createCell(4).setCellValue("Tipo de Partido");
        headerRow.createCell(5).setCellValue("Lugar");
        headerRow.createCell(6).setCellValue("Fecha");
        headerRow.createCell(7).setCellValue("Hora");
        headerRow.createCell(8).setCellValue("Terminado");


        // Aplicar el estilo de encabezado
        for (int i = 0; i <= 8; i++) {
            headerRow.getCell(i).setCellStyle(headerStyle);
        }

        // Llenar con los datos
        int rowNum = 1;
        for (Partido data : dataList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(data.getCodigo());
            row.createCell(1).setCellValue(data.getEquipo().getNombre());
            row.createCell(2).setCellValue(data.getMarcadorLocal()+" - "+data.getMarcadorVisita());
            row.createCell(3).setCellValue(data.getEquipoRival());
            row.createCell(4).setCellValue(data.getTipoPartido());
            row.createCell(5).setCellValue(data.getLugar());
            row.createCell(6).setCellValue(data.getFecha().toString());
            row.createCell(7).setCellValue(data.getHora().toString());
            int marcadorLocal = Integer.parseInt(data.getMarcadorLocal());
            int marcadorVisita = Integer.parseInt(data.getMarcadorVisita());

            String resultado;

            if (marcadorLocal > marcadorVisita) {
                resultado = "✅ Victoria";
            } else if (marcadorLocal < marcadorVisita) {
                resultado = "❌ Derrota";
            } else {
                resultado = "🔄 Empate";
            }

            System.out.println("Resultado del partido: " + resultado);


            row.createCell(8).setCellValue(resultado);

            // Aplicar el estilo de datos
            for (int i = 0; i <= 8; i++) {
                row.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Ajustar el tamaño de las columnas
        for (int i = 0; i <= 8; i++) {
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
