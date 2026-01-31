package com.naat.proyectofutbol.service.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.naat.proyectofutbol.model.Estudiante;
import com.naat.proyectofutbol.repository.EstudianteRepository;
import lombok.RequiredArgsConstructor;
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
public class EstudiantePDFService {

    private final EstudianteRepository estudianteRepository;

    public byte[] generarInformePdfProfesor() throws DocumentException {

        List<Estudiante> estudianteList = estudianteRepository.findByEstadoTrue();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);
        PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();

        Font companyFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.GRAY);
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, new BaseColor(0, 87, 146));
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
        Font cellFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK);
        Font footerFont = new Font(Font.FontFamily.HELVETICA, 8, Font.ITALIC, new BaseColor(108, 117, 125));

        PdfContentByte canvas = writer.getDirectContent();
        ColumnText.showTextAligned(canvas, Element.ALIGN_RIGHT, new Phrase("Academia Santos FC", companyFont),
                document.right(), document.top() + 10, 0);

        Paragraph title = new Paragraph("REPORTE DE ESTUDIANTE", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String fechaReporte = sdf.format(new Date());
        Paragraph fecha = new Paragraph("Generado el " + fechaReporte, new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.GRAY));
        fecha.setAlignment(Element.ALIGN_CENTER);
        fecha.setSpacingAfter(10f);
        document.add(fecha);

        LineSeparator lineSeparator = new LineSeparator();
        lineSeparator.setLineColor(new BaseColor(0, 87, 146));
        document.add(lineSeparator);

        PdfPTable table = new PdfPTable(6);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);

        float[] columnWidths = {12f, 20f, 15f, 15f, 10f, 15f};
        table.setWidths(columnWidths);


        String[] headers = {"Código", "Nombre Completo", "Correo", "Teléfono", "Edad", "Sede"};

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            table.addCell(headerCell);
        }


        for (Estudiante estudiante : estudianteList) {

            addTableCell(table, estudiante.getCodigo(), cellFont, Element.ALIGN_CENTER);

            String nombreCompleto = Stream.of(estudiante.getPrimerNombre(), estudiante.getSegundoNombre(),
                            estudiante.getApellidoPaterno(), estudiante.getApellidoMaterno())
                    .filter(Objects::nonNull)
                    .collect(Collectors.joining(" "));
            addTableCell(table, nombreCompleto, cellFont, Element.ALIGN_CENTER);
            addTableCell(table, estudiante.getCorreo(), cellFont, Element.ALIGN_CENTER);
            addTableCell(table, estudiante.getTelefono(), cellFont, Element.ALIGN_CENTER);
            addTableCell(table, String.valueOf(estudiante.getEdad()), cellFont, Element.ALIGN_CENTER);
            String sedeNombre = (estudiante.getSede() != null) ? estudiante.getSede().getNombre() : "No asignada";
            addTableCell(table, sedeNombre, cellFont, Element.ALIGN_CENTER);
        }

        document.add(table);
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
