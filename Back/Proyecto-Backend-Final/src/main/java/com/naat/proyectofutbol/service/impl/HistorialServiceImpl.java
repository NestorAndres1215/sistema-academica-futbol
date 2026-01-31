package com.naat.proyectofutbol.service.impl;

import com.naat.proyectofutbol.constants.AlreadyExistsMessages;
import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.dto.request.HistorialRequest;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Historial;
import com.naat.proyectofutbol.model.Usuario;
import com.naat.proyectofutbol.repository.HistorialRepository;
import com.naat.proyectofutbol.repository.UsuarioRepository;
import com.naat.proyectofutbol.service.HistorialService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HistorialServiceImpl implements HistorialService {

    private final HistorialRepository historialRepository;

    private final UsuarioRepository usuarioRepository;

    @Override
    public Historial guardar(HistorialRequest historialDTO) {
        String ultimoCodigo = UltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        Usuario usuario = usuarioRepository.findByUsername(historialDTO.getUsuario())
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        Historial historial = Historial.builder()
                .codigo(nuevoCodigo)
                .detalle(historialDTO.getDetalle())
                .fecha(LocalDate.now())
                .hora(LocalTime.now())
                .usuario(usuario)
                .build();
        return historialRepository.save(historial);
    }




    @Override
    public List<Historial> obtenerHistorialPorUsuario(String codigo) {
        Usuario usuario = findById(codigo);
        return historialRepository.findByUsuario(usuario);
    }

    @Override
    public String UltimoCodigo() {
        return historialRepository.obtenerUltimoCodigo();
    }

    @Override
    public Usuario findById(String codigo) {
        return usuarioRepository.findByCodigo(codigo);
    }
}
