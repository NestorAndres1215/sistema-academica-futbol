package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.entidades.Horario;
import com.naat.proyectofutbol.repositorios.HorarioRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class  HorarioService {


    private final HorarioRepository horarioRepository;


    public String obtenerUltimoCodigo() {
        return horarioRepository.obtenerUltimoCodigo();
    }


    public List<Horario> listarHorarioActivado() {
        return horarioRepository.findByEstadoTrue();
    }


    public List<Horario> listarHorarioDesactivado() {
        return horarioRepository.findByEstadoFalse();
    }


    public Horario RegistrarHorario(Horario horario) {
        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        if (verificarExistenciaHorario(horario.getInicioHora(), horario.getFinHora())) {
            // Aquí lanzamos una excepción o retornamos un mensaje indicando que ya existe.
            throw new IllegalArgumentException("El rango de horario ya existe: "
                    + horario.getInicioHora() + " - " + horario.getFinHora());
        }
        Horario horario1  =  new Horario();
        horario1.setCodigo(nuevoCodigo);

        horario1.setInicioHora(horario.getInicioHora());
        horario1.setFinHora(horario.getFinHora());
        horario1.setUsuarioRegistro(horario.getUsuarioRegistro());
        horario1.setFechaCreacion(LocalDate.now());
        horario1.setHoraCreacion(LocalTime.now());
        horario1.setEstado(true);
        return horarioRepository.save(horario1);
    }

    public boolean verificarExistenciaHorario(LocalTime inicioHora, LocalTime finHora) {
        return horarioRepository.existsByInicioHoraAndFinHora(inicioHora, finHora);
    }

    public Horario actualizarHorario(Horario horario) {
        Optional<Horario> horarioOptional = horarioRepository.findById(horario.getCodigo());
        if (!horarioOptional.isPresent()) {
            throw new RuntimeException("La horario con código " + horario.getCodigo() + " no existe.");
        }

        Horario horario1 = horarioOptional.get();

        if (!horario1.getInicioHora().equals(horario.getInicioHora()) ||
                !horario1.getFinHora().equals(horario.getFinHora())) {
            if (verificarExistenciaHorario(horario.getInicioHora(), horario.getFinHora())) {
                throw new IllegalArgumentException("El rango de horario ya existe: "
                        + horario.getInicioHora() + " - " + horario.getFinHora());
            }
        }
        System.out.print(horario1.getInicioHora());
        System.out.print(horario1.getFinHora());
        System.out.print(horario.getFinHora());
        System.out.print(horario.getInicioHora());
        horario1.setCodigo(horario1.getCodigo());
   horario1.setInicioHora(horario.getInicioHora());

        horario1.setFinHora(horario.getFinHora());
        horario1.setUsuarioActualizacion(horario.getUsuarioRegistro());
        horario1.setHoraActualizacion(LocalTime.now());
        horario1.setFechaActualizacion(LocalDate.now());
        horario1.setEstado(true);
        return horarioRepository.save(horario1);
    }


}
