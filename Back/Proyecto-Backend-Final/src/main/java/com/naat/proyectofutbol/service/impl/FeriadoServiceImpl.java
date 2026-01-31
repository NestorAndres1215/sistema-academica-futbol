package com.naat.proyectofutbol.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.naat.proyectofutbol.model.Feriado;
import com.naat.proyectofutbol.service.FeriadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static com.naat.proyectofutbol.constants.Mensajes.ARCHIVO_FERIADOS_NO_ENCONTRADO;

@Service
@RequiredArgsConstructor
public class FeriadoServiceImpl implements FeriadoService {

    private final ObjectMapper objectMapper;

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