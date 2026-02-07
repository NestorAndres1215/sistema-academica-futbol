package com.naat.proyectofutbol.service.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.naat.proyectofutbol.model.Admin;
import com.naat.proyectofutbol.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
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

        List<Admin> adminList = adminRepository.findByEstadoTrue();

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

        Paragraph title = new Paragraph("REPORTE DE ADMINISTRADORES", titleFont);
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

        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(30f);

        float[] columnWidths = {1f, 2f, 2f, 3f, 1f};
        table.setWidths(columnWidths);

        String[] headers = {"N°", "DNI", "Nombre Completo", "Contacto", "Edad"};

        for (String headerText : headers) {
            PdfPCell headerCell = new PdfPCell(new Phrase(headerText, headerFont));
            headerCell.setBackgroundColor(new BaseColor(0, 87, 146));  headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerCell.setPadding(8f);
            headerCell.setBorderWidth(1f);
            headerCell.setBorderColor(new BaseColor(222, 226, 230));
            table.addCell(headerCell);
        }

        int counter = 1;
        for (Admin admin : adminList) {

            addTableCell(table, String.valueOf(counter++), cellFont, Element.ALIGN_CENTER);

            addTableCell(table, admin.getDni(), cellFont, Element.ALIGN_CENTER);

            String nombreCompleto = String.format("%s %s %s %s",
                    admin.getPrimerNombre() != null ? admin.getPrimerNombre() : "",
                    admin.getSegundoNombre() != null ? admin.getSegundoNombre() : "",
                    admin.getApellidoPaterno() != null ? admin.getApellidoPaterno() : "",
                    admin.getApellidoMaterno() != null ? admin.getApellidoMaterno() : ""
            ).trim();
            addTableCell(table, nombreCompleto, cellFont, Element.ALIGN_LEFT);

            String contacto = String.format("Tel: %s\nEmail: %s",
                    admin.getTelefono() != null ? admin.getTelefono() : "-",
                    admin.getCorreo() != null ? admin.getCorreo() : "-");
            addTableCell(table, contacto, cellFont, Element.ALIGN_LEFT);

            addTableCell(table, String.valueOf(admin.getEdad()), cellFont, Element.ALIGN_CENTER);
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
        cell.setBorderWidth(1f);
        cell.setBorderColor(new BaseColor(222, 226, 230)); // Borde gris claro
        table.addCell(cell);
    }

}
