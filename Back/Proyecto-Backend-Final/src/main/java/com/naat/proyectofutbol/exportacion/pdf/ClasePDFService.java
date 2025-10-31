package com.naat.proyectofutbol.exportacion.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.naat.proyectofutbol.entidades.Clase;
import com.naat.proyectofutbol.repositorios.ClaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ClasePDFService {
    @Autowired
    private ClaseRepository claseRepository;
    public byte[] generarInformePdfClases() throws DocumentException {
        // Obtener la lista de clases desde la base de datos
        List<Clase> claseList = claseRepository.findByEstadoTrue();

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
        Paragraph title = new Paragraph("REPORTE DE CLASE", titleFont);
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

        PdfPTable table = new PdfPTable(9);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);


        // Configurar el ancho de las columnas (en porcentaje)
        float[] columnWidths = {10f, 15f, 15f, 10f, 10f, 10f, 12f, 12f, 12f};
        table.setWidths(columnWidths);


        String[] headers = {
                "Código", "Nombre", "Equipo", "Género", "Inicio Hora", "Fin Hora",
                "Fecha Inicio", "Fecha Fin", "Día"
        };

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            table.addCell(headerCell);
        }

        for (Clase clase : claseList) {
            // Agregar las celdas para 'cargo' (asumido que cargo es un objeto previamente definido)

            // Código
            addTableCell(table, clase.getCodigo(), cellFont, Element.ALIGN_CENTER);

            // Nombre
            addTableCell(table, clase.getNombre(), cellFont, Element.ALIGN_CENTER);

            // Equipo
            addTableCell(table, clase.getEquipo().getNombre(), cellFont, Element.ALIGN_CENTER);

            // Género
            addTableCell(table, clase.getEquipo().getGenero(), cellFont, Element.ALIGN_CENTER);

            // Hora Inicio con verificación de nulos
            addTableCell(table,
                    clase.getHorario().getInicioHora() != null ? clase.getHorario().getInicioHora().toString() : "No asignada",
                    cellFont, Element.ALIGN_CENTER);

            // Hora Fin con verificación de nulos
            addTableCell(table,
                    clase.getHorario().getFinHora() != null ? clase.getHorario().getFinHora().toString() : "No asignada",
                    cellFont, Element.ALIGN_CENTER);

            // Fechas
            addTableCell(table, clase.getInicio().toString(), cellFont, Element.ALIGN_CENTER);
            addTableCell(table, clase.getFin().toString(), cellFont, Element.ALIGN_CENTER);

            // Día
            addTableCell(table, clase.getDia(), cellFont, Element.ALIGN_CENTER);
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