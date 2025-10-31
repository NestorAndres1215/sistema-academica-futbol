package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.HistorialDTO;
import com.naat.proyectofutbol.entidades.Historial;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.repositorios.HistorialRepository;
import com.naat.proyectofutbol.repositorios.UsuarioRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class HistorialServiceImpl implements  HistorialService{

    @Autowired
    private HistorialRepository historialRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Historial> obtenerHistorialPorUsuario(Usuario usuario) {
        return historialRepository.findByUsuario(usuario);
    }
    public Usuario findById(String codigo) {
        return usuarioRepository.findByCodigo(codigo);
    }

    @Override
    public Historial guardar(HistorialDTO historial) {
        String ultimoCodigo = UltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        List<Usuario> usuarioExistente = usuarioRepository.findByUsername(historial.getUsuario());
        Usuario usuario = usuarioExistente.get(0);
        String codigoUsuario = usuario.getCodigo();

        Historial historial1  =  new Historial();
        historial1.setCodigo(nuevoCodigo);
        historial1.setHora(LocalTime.now());
        historial1.setFecha(LocalDate.now());
        historial1.setDetalle(historial.getDetalle());
        historial1.setUsuario(codigoUsuario);


        return historialRepository.save(historial1);
    }
    @Override
    public String UltimoCodigo() {
        return historialRepository.obtenerUltimoCodigo();
    }

}
