package com.naat.proyectofutbol.util;

import com.naat.proyectofutbol.dto.request.EstudianteRequest;

import java.util.Map;

public class DocumentoValidator {

    private static final Map<String, Integer> CE_LENGTH_BY_COUNTRY = Map.ofEntries(
            Map.entry("Canadá", 8),
            Map.entry("México", 13),
            Map.entry("Estados Unidos", 9),
            Map.entry("Belice", 9),
            Map.entry("Costa Rica", 9),
            Map.entry("El Salvador", 9),
            Map.entry("Guatemala", 13),
            Map.entry("Honduras", 13),
            Map.entry("Nicaragua", 13),
            Map.entry("Panamá", 7),
            Map.entry("Cuba", 11),
            Map.entry("República Dominicana", 11),
            Map.entry("Jamaica", 8),
            Map.entry("Argentina", 8),
            Map.entry("Bolivia", 9),
            Map.entry("Brasil", 11),
            Map.entry("Chile", 9),
            Map.entry("Colombia", 10),
            Map.entry("Ecuador", 10),
            Map.entry("Paraguay", 9),
            Map.entry("Perú", 12),
            Map.entry("Uruguay", 8),
            Map.entry("Venezuela", 8),
            Map.entry("España", 9),
            Map.entry("Francia", 12),
            Map.entry("Alemania", 10),
            Map.entry("China", 18),
            Map.entry("India", 12),
            Map.entry("Japón", 8)
    );

    private static final Map<String, Integer> PS_LENGTH_BY_COUNTRY = Map.ofEntries(
            Map.entry("Canadá", 9),
            Map.entry("México", 9),
            Map.entry("Estados Unidos", 9),
            Map.entry("Belice", 8),
            Map.entry("Costa Rica", 8),
            Map.entry("El Salvador", 8),
            Map.entry("Guatemala", 8),
            Map.entry("Honduras", 8),
            Map.entry("Nicaragua", 8),
            Map.entry("Panamá", 8),
            Map.entry("Cuba", 7),
            Map.entry("República Dominicana", 7),
            Map.entry("Jamaica", 7),
            Map.entry("Argentina", 10),
            Map.entry("Bolivia", 10),
            Map.entry("Brasil", 10),
            Map.entry("Chile", 10),
            Map.entry("Colombia", 10),
            Map.entry("Ecuador", 10),
            Map.entry("Paraguay", 10),
            Map.entry("Perú", 10),
            Map.entry("Uruguay", 10),
            Map.entry("Venezuela", 10),
            Map.entry("España", 9),
            Map.entry("Francia", 9),
            Map.entry("Italia", 9),
            Map.entry("Alemania", 9),
            Map.entry("Portugal", 9),
            Map.entry("China", 18),
            Map.entry("Japón", 12),
            Map.entry("India", 12),
            Map.entry("Corea del Sur", 12),
            Map.entry("Singapur", 12)
    );

    public static void validarDocumento(String tipoDoc, String pais,String numeroDoc) {


        if (numeroDoc == null || numeroDoc.isBlank()) {
            throw new IllegalArgumentException("El número de documento no puede estar vacío.");
        }

        switch (tipoDoc) {
            case "CE":
                Integer ceLength = CE_LENGTH_BY_COUNTRY.get(pais);
                if (ceLength == null) {
                    throw new IllegalArgumentException("País no tiene validación configurada para CE.");
                }
                if (numeroDoc.length() != ceLength) {
                    throw new IllegalArgumentException(
                            "El Carné de Extranjería en " + pais + " debe tener " + ceLength + " dígitos."
                    );
                }
                break;

            case "PS":
                Integer psLength = PS_LENGTH_BY_COUNTRY.get(pais);
                if (psLength == null) {
                    throw new IllegalArgumentException("País no tiene validación configurada para Pasaporte.");
                }
                if (numeroDoc.length() != psLength) {
                    throw new IllegalArgumentException(
                            "El Pasaporte en " + pais + " debe tener " + psLength + " caracteres."
                    );
                }
                break;

            case "DNI":
                if (numeroDoc.length() != 8) {
                    throw new IllegalArgumentException("El DNI debe tener 8 dígitos.");
                }
                break;

            default:
                throw new IllegalArgumentException("Tipo de documento no válido: " + tipoDoc);
        }
    }
}
