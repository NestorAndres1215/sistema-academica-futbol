package com.naat.proyectofutbol.exportacion.pdf;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.repositorios.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminPDFService {

    private final AdminRepository adminRepository;


    public byte[] generarInformePdf() throws DocumentException {
        // Obtener la lista de datos de la base de datos
        List<Admin> adminList = adminRepository.findByEstadoTrue();

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
        Paragraph title = new Paragraph("REPORTE DE ADMINISTRADORES", titleFont);
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

        // Crear una tabla con 6 columnas (estructura similar al HTML)
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);

        // Configurar el ancho de las columnas
        float[] columnWidths = {1f, 2f, 2f, 3f, 1f};
        table.setWidths(columnWidths);

        // Encabezados de la tabla
        String[] headers = {"N°", "DNI", "Nombre Completo", "Contacto", "Edad"};

        for (String headerText : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(headerText, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));  headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            headerCell.setBorderWidth(1f);
            headerCell.setBorderColor(new BaseColor(222, 226, 230)); // Borde gris claro
            table.addCell(headerCell);
        }

        // Agregar datos de Admin a la tabla
        int counter = 1;
        for (Admin admin : adminList) {
            // Celda N°
            addTableCell(table, String.valueOf(counter++), cellFont, Element.ALIGN_CENTER);

            // Celda DNI
            addTableCell(table, admin.getDni(), cellFont, Element.ALIGN_CENTER);

            // Celda Nombre Completo
            String nombreCompleto = String.format("%s %s %s %s",
                    admin.getPrimerNombre() != null ? admin.getPrimerNombre() : "",
                    admin.getSegundoNombre() != null ? admin.getSegundoNombre() : "",
                    admin.getApellidoPaterno() != null ? admin.getApellidoPaterno() : "",
                    admin.getApellidoMaterno() != null ? admin.getApellidoMaterno() : ""
            ).trim();
            addTableCell(table, nombreCompleto, cellFont, Element.ALIGN_LEFT);

            // Celda Contacto (teléfono y correo)
            String contacto = String.format("Tel: %s\nEmail: %s",
                    admin.getTelefono() != null ? admin.getTelefono() : "-",
                    admin.getCorreo() != null ? admin.getCorreo() : "-");
            addTableCell(table, contacto, cellFont, Element.ALIGN_LEFT);

            // Celda Edad
            addTableCell(table, String.valueOf(admin.getEdad()), cellFont, Element.ALIGN_CENTER);
        }

        // Agregar la tabla al documento
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
        cell.setBorderWidth(1f);
        cell.setBorderColor(new BaseColor(222, 226, 230)); // Borde gris claro
        table.addCell(cell);
    }

}
