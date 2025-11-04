package com.naat.proyectofutbol.json;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/feriados")
@RequiredArgsConstructor
public class FeriadoController {

    private final FeriadoService feriadoService;

    @GetMapping
    public List<Feriado> obtenerFeriados() throws IOException {
        return feriadoService.obtenerFeriados();
    }
}