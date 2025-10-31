package com.naat.proyectofutbol.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class FeriadoService {

    private final ObjectMapper objectMapper;

    public FeriadoService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    public List<Feriado> obtenerFeriados() throws IOException {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("feriados.json")) {
            if (inputStream == null) {
                throw new IOException("No se pudo encontrar el archivo feriados.json en el classpath");
            }
            return objectMapper.readValue(inputStream, objectMapper.getTypeFactory().constructCollectionType(List.class, Feriado.class));
        }
    }

}
