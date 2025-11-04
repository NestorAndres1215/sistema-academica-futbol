package com.naat.proyectofutbol.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static com.naat.proyectofutbol.constrainst.Mensajes.ARCHIVO_FERIADOS_NO_ENCONTRADO;

@Service
@RequiredArgsConstructor   // <-- Lombok genera el constructor
public class FeriadoService {

    private final ObjectMapper objectMapper; // final → inyección automática

    public List<Feriado> obtenerFeriados() throws IOException {
        try (InputStream inputStream = getClass()
                .getClassLoader()
                .getResourceAsStream("feriados.json")) {

            if (inputStream == null) {
                throw new IOException(ARCHIVO_FERIADOS_NO_ENCONTRADO);
            }

            return objectMapper.readValue(
                    inputStream,
                    objectMapper.getTypeFactory()
                            .constructCollectionType(List.class, Feriado.class)
            );
        }
    }
}