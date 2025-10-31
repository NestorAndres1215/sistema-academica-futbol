package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.PartidoDTO;
import com.naat.proyectofutbol.entidades.ClaseDev;
import com.naat.proyectofutbol.entidades.Equipo;
import com.naat.proyectofutbol.entidades.EquipoDev;
import com.naat.proyectofutbol.entidades.Partido;
import com.naat.proyectofutbol.repositorios.EquipoRepository;
import com.naat.proyectofutbol.repositorios.PartidoRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class PartidoServiceImpl implements PartidoService{

    @Autowired
    private PartidoRepository partidoRepository;
    @Autowired
    private EquipoRepository equipoRepository;


    @Override
    public List<Partido> findAdminsByEstadoTrue() {
        return partidoRepository.findByEstadoTrue();
    }

    @Override
    public List<Partido> findAdminsByEstadoFalse() {
        return partidoRepository.findByEstadoFalse();
    }

    @Override
    public List<Partido> listar() {
        return partidoRepository.findAll();
    }

    @Override
    public String obtenerUltimoCodigoPartido() {
        return partidoRepository.obtenerUltimoCodigoPartido();
    }

    @Override
    public Partido RegistrarPartido(PartidoDTO partidoDTO) {
        String ultimoCodigo = obtenerUltimoCodigoPartido();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);

        if (validar(partidoDTO.getFecha(), partidoDTO.getHora(), partidoDTO.getEquipo())) {
            throw new IllegalArgumentException("Ya existe un partido registrado con la misma fecha, hora y equipo.");
        }
        Partido partido =new Partido();
        partido.setCodigo(nuevoCodigo);
        partido.setEquipoRival(partidoDTO.getEquipoRival());
        partido.setDerrota(partidoDTO.getDerrota());
        partido.setVictoria(partidoDTO.getVictoria());
        partido.setMarcadorLocal(partidoDTO.getMarcadorLocal());
        partido.setMarcadorVisita(partidoDTO.getMarcadorVisita());
        partido.setTipoPartido(partidoDTO.getTipoPartido());
        partido.setLugar(partidoDTO.getLugar());
        partido.setHora(partidoDTO.getHora());
        partido.setFecha(partidoDTO.getFecha());
        partido.setEstado(true);
        partido.setUsuarioCreacion(partidoDTO.getUsuarioCreacion());
        partido.setFechaCreacion(LocalDate.now());
        partido.setHoraCreacion(LocalTime.now());
        partido.setEquipo(partidoDTO.getEquipo());
        partido.setComentarios(partidoDTO.getComentarios());
        return partidoRepository.save(partido);
    }

    @Override
    public Partido actualizarPartido(PartidoDTO partidoDTO) {
        try {
            Optional<Partido> optionalPartido = partidoRepository.findById(partidoDTO.getCodigo());
            if (!optionalPartido.isPresent()) {
                throw new RuntimeException("La clase con código " + partidoDTO.getCodigo() + " no existe.");
            }



            Partido partido = new Partido();
            partido.setCodigo(partidoDTO.getCodigo());
            partido.setEquipoRival(partidoDTO.getEquipoRival());
            partido.setDerrota(partidoDTO.getDerrota());
            partido.setVictoria(partidoDTO.getVictoria());
            partido.setMarcadorLocal(partidoDTO.getMarcadorLocal());
            partido.setMarcadorVisita(partidoDTO.getMarcadorVisita());
            partido.setTipoPartido(partidoDTO.getTipoPartido());
            partido.setLugar(partidoDTO.getLugar());
            partido.setHora(partidoDTO.getHora());
            partido.setFecha(partidoDTO.getFecha());
            partido.setEstado(true);
            partido.setUsuarioCreacion(partidoDTO.getUsuarioCreacion());
            partido.setUsuarioActualizacion(partidoDTO.getUsuarioActualizacion());
            partido.setFechaActualizacion(LocalDate.now());
            partido.setHoraActualizacion(LocalTime.now());
            partido.setEquipo(partidoDTO.getEquipo());
            partido.setComentarios(partidoDTO.getComentarios());

            return null;//partidoRepository.save(partido);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public Partido actualizarPartidoSegundo(PartidoDTO partidoDTO) {
        try {
            Optional<Partido> optionalPartido = partidoRepository.findById(partidoDTO.getCodigo());
            if (!optionalPartido.isPresent()) {
                throw new RuntimeException("La clase con código " + partidoDTO.getCodigo() + " no existe.");
            }

            Partido partido = new Partido();
            partido.setCodigo(partidoDTO.getCodigo());
            partido.setEquipoRival(partidoDTO.getEquipoRival());
            partido.setDerrota(partidoDTO.getDerrota());
            partido.setVictoria(partidoDTO.getVictoria());
            partido.setMarcadorLocal(partidoDTO.getMarcadorLocal());
            partido.setMarcadorVisita(partidoDTO.getMarcadorVisita());
            partido.setTipoPartido(partidoDTO.getTipoPartido());
            partido.setLugar(partidoDTO.getLugar());
            partido.setHora(partidoDTO.getHora());
            partido.setFecha(partidoDTO.getFecha());
            partido.setEstado(false);
            partido.setUsuarioCreacion(partidoDTO.getUsuarioCreacion());
            partido.setUsuarioActualizacion(partidoDTO.getUsuarioActualizacion());
            partido.setFechaActualizacion(LocalDate.now());
            partido.setHoraActualizacion(LocalTime.now());
            partido.setEquipo(partidoDTO.getEquipo());
            partido.setComentarios(partidoDTO.getComentarios());

            return partidoRepository.save(partido);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Scheduled(fixedRate = 60000)
    public void desactivarPartidosPasados() {
        List<Partido> partidos = partidoRepository.findByEstadoTrue();
        LocalDateTime ahora = LocalDateTime.now();

        for (Partido partido : partidos) {
            LocalDateTime fechaHoraPartido = LocalDateTime.of(partido.getFecha(), partido.getHora());
            if (fechaHoraPartido.isBefore(ahora)) {
                partido.setEstado(false);
                partidoRepository.save(partido);
                System.out.println("⏳ Partido " + partido.getCodigo() + " desactivado.");
            }
        }
    }
    public boolean validar(LocalDate fecha, LocalTime hora, String codigoEquipo) {
        Optional<Equipo> equipoExistente = equipoRepository.findById(codigoEquipo);


        return equipoExistente.filter(equipo -> existsByFechaAndHoraAndEquipo(fecha, hora, equipo)).isPresent();
    }

    @Override
    public boolean existsByFechaAndHoraAndEquipo(LocalDate fecha, LocalTime hora, Equipo equipo) {
        return partidoRepository.existsByFechaAndHoraAndEquipo(fecha, hora, equipo);
    }


}
