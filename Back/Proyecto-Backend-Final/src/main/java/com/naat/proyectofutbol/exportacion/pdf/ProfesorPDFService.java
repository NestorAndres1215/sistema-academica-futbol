package com.naat.proyectofutbol.exportacion.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import com.itextpdf.text.pdf.draw.LineSeparator;
import com.naat.proyectofutbol.entidades.Profesor;
import com.naat.proyectofutbol.repositorios.ProfesorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ProfesorPDFService {

    private final ProfesorRepository profesorRepository;

    public byte[] generarInformePdfProfesor() throws DocumentException {
        // Obtener la lista de profesores desde la base de datos
        List<Profesor> profesorList = profesorRepository.findByEstadoTrue();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();

        // Configurar fuentes
        Font companyFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.GRAY);
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, new BaseColor(0, 87, 146));
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
        Font cellFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
        Font footerFont = new Font(Font.FontFamily.HELVETICA, 8, Font.ITALIC, new BaseColor(108, 117, 125));

        // Nombre de la empresa en la esquina superior derecha
        PdfContentByte canvas = writer.getDirectContent();
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase("Academia Santos FC", companyFont),
                document.right(), document.top() + 10, 0);

        // Título centrado
        Paragraph title = new Paragraph("REPORTE DE PROFESOR", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Fecha de generación del informe
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String fechaReporte = sdf.format(new Date());
        Paragraph fecha = new Paragraph("Generado el " + fechaReporte, new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.GRAY));
        fecha.setAlignment(Element.ALIGN_CENTER);
        fecha.setSpacingAfter(10f);
        document.add(fecha);

        // Línea separadora
        LineSeparator lineSeparator = new LineSeparator();
        lineSeparator.setLineColor(new BaseColor(0, 87, 146));
        document.add(lineSeparator);

        // Crear una tabla con 10 columnas (código, nombre completo, correo, teléfono, edad, dirección, cargo y sede)
        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);

        // Configurar el ancho de las columnas (en porcentaje)
        float[] columnWidths = {12f, 20f, 15f, 15f, 10f, 15f, 15f};
        table.setWidths(columnWidths);


        String[] headers = {"Código", "Nombre Completo", "Correo", "Teléfono", "Edad", "Cargo", "Sede"};

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            table.addCell(headerCell);
        }


        for (Profesor profesor : profesorList) {
            // Código
            addTableCell(table, profesor.getCodigo(), cellFont, Element.ALIGN_CENTER);

            // Nombre Completo (evitando espacios extra)
            String nombreCompleto = Stream.of(profesor.getPrimerNombre(), profesor.getSegundoNombre(),
                            profesor.getApellidoPaterno(), profesor.getApellidoMaterno())
                    .filter(Objects::nonNull)
                    .collect(Collectors.joining(" "));
            addTableCell(table, nombreCompleto, cellFont, Element.ALIGN_CENTER);

            // Correo
            addTableCell(table, profesor.getCorreo(), cellFont, Element.ALIGN_CENTER);

            // Teléfono
            addTableCell(table, profesor.getTelefono(), cellFont, Element.ALIGN_CENTER);

            // Edad
            addTableCell(table, String.valueOf(profesor.getEdad()), cellFont, Element.ALIGN_CENTER);
            String cargoNombre = (profesor.getCargo() != null) ? profesor.getCargo().getNombre() : "No asignada";
            addTableCell(table, cargoNombre, cellFont, Element.ALIGN_CENTER);
            // Sede (evitando errores si es null)
            String sedeNombre = (profesor.getSede() != null) ? profesor.getSede().getNombre() : "No asignada";
            addTableCell(table, sedeNombre, cellFont, Element.ALIGN_CENTER);
        }

        document.add(table);

        // Pie de página
        Paragraph footer = new Paragraph("Academia Santos FC © " + Calendar.getInstance().get(Calendar.YEAR), footerFont);
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();
        return byteArrayOutputStream.toByteArray();
    }

    private void addTableCell(PdfPTable table, String content, Font font, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(content, font));
        cell.setHorizontalAlignment(alignment);
        cell.setPadding(6f);
        table.addCell(cell);
    }
}
