package com.naat.proyectofutbol.exportacion.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.Partido;
import com.naat.proyectofutbol.repositorios.PartidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidoPDFService {

    private final PartidoRepository partidoRepository;
    public byte[] generarInformePartidosPdf() throws DocumentException {
        // Obtener la lista de partidos activos desde la base de datos
        List<Partido> partidoList = partidoRepository.findByEstadoTrue();

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
        Paragraph title = new Paragraph("REPORTE DE PROXIMOS PARTIDOS", titleFont);
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


        // Crear una tabla con 8 columnas

        PdfPTable table = new PdfPTable(8);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);
        // Configurar el ancho de las columnas
        float[] columnWidths = {10f, 20f, 5f, 20f, 15f, 15f, 10f, 10f};
        table.setWidths(columnWidths);


        String[] headers = {
                "Código", "Equipo", " ", "Equipo Rival", "Tipo de Partido",
                "Lugar", "Fecha", "Hora"
        };

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            table.addCell(headerCell);
        }

        for (Partido partido : partidoList) {
            table.addCell(createCell(String.valueOf(partido.getCodigo()), cellFont));
            table.addCell(createCell(partido.getEquipo().getNombre(), cellFont));
            table.addCell(createCell("VS", cellFont));
            table.addCell(createCell(partido.getEquipoRival(), cellFont));
            table.addCell(createCell(partido.getTipoPartido(), cellFont));
            table.addCell(createCell(partido.getLugar(), cellFont));
            table.addCell(createCell(partido.getFecha().toString(), cellFont));
            table.addCell(createCell(partido.getHora().toString(), cellFont));
        }

        // Agregar la tabla al documento
        document.add(table);
        Paragraph footer = new Paragraph("Academia Santos FC © " + Calendar.getInstance().get(Calendar.YEAR), footerFont);
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();
        return byteArrayOutputStream.toByteArray();
    }

    private PdfPCell createCell(String content, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(content, font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }
    public byte[] generarInformePartidosDesactivadosPdf() throws DocumentException {
        // Obtener la lista de partidos desactivados desde la base de datos
        List<Partido> partidoList = partidoRepository.findByEstadoFalse();


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

        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);
        float[] columnWidths = {10f, 20f, 10f, 20f, 15f, 15f, 15f};
        table.setWidths(columnWidths);

        String[] headers = {
                "Código", "Equipo", " ", "Rival", "Estado", "Lugar",
                 "Rsultado"
        };

        for (String header : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(header, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));
            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            table.addCell(headerCell);
        }

        for (Partido partido : partidoList) {
            table.addCell(createCell(String.valueOf(partido.getCodigo()), cellFont));
            table.addCell(createCell(partido.getEquipo().getNombre(), cellFont));
            table.addCell(createCell(partido.getMarcadorLocal() + " - " + partido.getMarcadorVisita(), cellFont));
            table.addCell(createCell(partido.getEquipoRival(), cellFont));
            table.addCell(createCell(partido.getTipoPartido(), cellFont));
            table.addCell(createCell(partido.getLugar(), cellFont));

            // Manejo de valores nulos para evitar NumberFormatException
            int marcadorLocal = partido.getMarcadorLocal() != null ? Integer.parseInt(partido.getMarcadorLocal()) : 0;
            int marcadorVisita = partido.getMarcadorVisita() != null ? Integer.parseInt(partido.getMarcadorVisita()) : 0;

            // Determinar el resultado del partido
            String resultado;
            if (marcadorLocal > marcadorVisita) {
                resultado = "✅ Victoria";
            } else if (marcadorLocal < marcadorVisita) {
                resultado = "❌ Derrota";
            } else {
                resultado = "🔄 Empate";
            }

            table.addCell(createCell(resultado, cellFont));
        }


        document.add(table);

        // Pie de página
        Paragraph footer = new Paragraph("Academia Santos FC © " + Calendar.getInstance().get(Calendar.YEAR), footerFont);
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();
        return byteArrayOutputStream.toByteArray();
    }



}
