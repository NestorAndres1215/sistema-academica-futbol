package com.naat.proyectofutbol.service.impl;


import com.naat.proyectofutbol.dto.request.ProfesorRequest;
import com.naat.proyectofutbol.exception.BadRequestException;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.*;
import com.naat.proyectofutbol.repository.CargoRepository;
import com.naat.proyectofutbol.repository.ProfesorRepository;
import com.naat.proyectofutbol.repository.SedeRepository;
import com.naat.proyectofutbol.repository.UsuarioRepository;
import com.naat.proyectofutbol.service.LoginService;
import com.naat.proyectofutbol.service.ProfesorService;
import com.naat.proyectofutbol.service.UsuarioService;
import com.naat.proyectofutbol.util.DocumentoValidator;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfesorServiceImpl implements ProfesorService {

    private final ProfesorRepository profesorRepository;
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final SedeRepository sedeRepository;
    private final CargoRepository cargoRepository;
    private final LoginService loginService;


    @Override
    public List<Profesor> listar() {
        return profesorRepository.findAll();
    }

    @Override
    public List<Profesor> findByTelefono(String telefono) {
        return profesorRepository.findByTelefono(telefono);
    }

    @Override
    public List<Profesor> findByDni(String dni) {
        return profesorRepository.findByDni(dni);
    }

    @Override
    public List<Profesor> findByCorreo(String correo) {
        return profesorRepository.findByCorreo(correo);
    }

    @Override
    public List<Profesor> findByNacionalidad(String nacionalidad) {
        return profesorRepository.findByNacionalidad(nacionalidad);
    }

    @Override
    public List<Profesor> findByEdad(String edad) {
        return profesorRepository.findByEdad(edad);
    }

    @Override
    public List<Profesor> findByApellidoPaterno(String apellidoPaterno) {
        return profesorRepository.findByApellidoPaterno(apellidoPaterno);
    }

    @Override
    public List<Profesor> findByPrimerNombre(String primerNombre) {
        return profesorRepository.findByPrimerNombre(primerNombre);
    }

    @Override
    public List<Profesor> getAdminsByUsuarioCodigo(String usuarioCodigo) {
        return profesorRepository.findByUsuario_Codigo(usuarioCodigo);
    }

    @Override
    public List<Profesor> findAdminsByEstadoTrue() {
        return profesorRepository.findByEstadoTrue();
    }

    @Override
    public List<Profesor> getAdminsByEstadoFalse() {
        return profesorRepository.findByEstadoFalse();
    }

    @Override
    public Profesor guardarProfesor(ProfesorRequest profesorDTO) {

        validarProfesor(profesorDTO);
        DocumentoValidator.validarDocumento(profesorDTO.getTipoDoc(), profesorDTO.getNacionalidad(), profesorDTO.getDni());

        String ultimoCodigo = obtenerUltimoCodigoProfesor();
        String nuevoCodigoProfesor = Utilitarios.incrementarSecuencia(ultimoCodigo);
        String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
        String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);

        usuarioService.registrar(nuevoCodigoUsuario, profesorDTO.getUsername(), profesorDTO.getPassword(), "0002");
        loginService.registrar(nuevoCodigoUsuario, profesorDTO.getUsername(), profesorDTO.getPassword(), "PROFESOR");
        Sede sede = sedeRepository.findById(profesorDTO.getSede())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + profesorDTO.getSede()));

        Cargo cargo = cargoRepository.findById(profesorDTO.getCargo())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + profesorDTO.getCargo()));

        Usuario usuario = usuarioRepository.findById(nuevoCodigoUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + nuevoCodigoUsuario));

        Profesor profesor = Profesor.builder()
                .codigo(nuevoCodigoProfesor)
                .primerNombre(profesorDTO.getPrimerNombre())
                .segundoNombre(profesorDTO.getSegundoNombre())
                .apellidoPaterno(profesorDTO.getApellidoPaterno())
                .apellidoMaterno(profesorDTO.getApellidoMaterno())
                .correo(profesorDTO.getCorreo())
                .tipo(profesorDTO.getTipoDoc())
                .dni(profesorDTO.getDni())
                .direccion(profesorDTO.getDireccion())
                .telefono(profesorDTO.getTelefono())
                .edad(profesorDTO.getEdad())
                .fechaNacimiento(profesorDTO.getNacimiento())
                .nacionalidad(profesorDTO.getNacionalidad())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .estado(true)
                .genero(profesorDTO.getGenero())
                .usuario(usuario)
                .sede(sede)
                .cargo(cargo)
                .usuarioCreacion(profesorDTO.getUsuarioCreacion())
                .build();

        return profesorRepository.save(profesor);
    }

    @Override
    public Profesor actualizarProfesor(ProfesorRequest profesorDTO) {

        Profesor profesor = profesorRepository.findById(profesorDTO.getCodigoProfesor())
                .orElseThrow(() ->
                        new ResourceNotFoundException("El estudiante con código " + profesorDTO.getCodigoProfesor() + " no existe")
                );
        DocumentoValidator.validarDocumento(profesorDTO.getTipoDoc(), profesorDTO.getNacionalidad(), profesorDTO.getDni());
        validarActualizacionProfesor(profesor, profesorDTO.getTelefono(), profesorDTO.getCorreo(), profesorDTO.getUsername(), profesorDTO.getDni());


        Sede sede = sedeRepository.findById(profesorDTO.getSede())
                .orElseThrow(() ->
                        new ResourceNotFoundException("La sede con código " + profesorDTO.getSede() + " no existe")
                );
        Cargo cargo = cargoRepository.findById(profesorDTO.getCargo())
                .orElseThrow(() ->
                        new ResourceNotFoundException("La sede con código " + profesorDTO.getCargo() + " no existe")
                );
        usuarioService.actualizar(profesorDTO.getCodigoUsuario(), profesorDTO.getUsername(), profesorDTO.getPassword(), "0003");
        loginService.actualizar(profesorDTO.getCodigoUsuario(), profesorDTO.getUsername(), profesorDTO.getPassword(), "PROFESOR");

        Usuario usuario = usuarioRepository.findById(profesorDTO.getCodigoUsuario())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Usuario no encontrado: " + profesorDTO.getCodigoUsuario())
                );

        profesor.setPrimerNombre(profesorDTO.getPrimerNombre());
        profesor.setSegundoNombre(profesorDTO.getSegundoNombre());
        profesor.setApellidoPaterno(profesorDTO.getApellidoPaterno());
        profesor.setApellidoMaterno(profesorDTO.getApellidoMaterno());
        profesor.setCorreo(profesorDTO.getCorreo());
        profesor.setDni(profesorDTO.getDni());
        profesor.setDireccion(profesorDTO.getDireccion());
        profesor.setTelefono(profesorDTO.getTelefono());
        profesor.setEdad(profesorDTO.getEdad());
        profesor.setFechaNacimiento(profesorDTO.getNacimiento());
        profesor.setNacionalidad(profesorDTO.getNacionalidad());
        profesor.setFechaActualizacion(LocalDate.now());
        profesor.setHoraActualizacion(LocalTime.now());
        profesor.setTipo(profesorDTO.getTipoDoc());
        profesor.setEstado(true);
        profesor.setGenero(profesorDTO.getGenero());
        profesor.setUsuario(usuario);
        profesor.setSede(sede);
        profesor.setCargo(cargo);
        profesor.setUsuarioActualizacion(profesorDTO.getUsuarioActualizacion());

        return profesorRepository.save(profesor);
    }

    @Override
    public Profesor desactivar(String usuarioCodigo) {
        Profesor profesor = profesorRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con el código: " + usuarioCodigo));
        usuarioService.desactivarUsuario(profesor.getUsuario().getCodigo());
        profesor.setEstado(false);
        return profesorRepository.save(profesor);
    }

    @Override
    public Profesor activar(String usuarioCodigo) {
        Profesor profesor = profesorRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException("Estudiante no encontrado con el código: " + usuarioCodigo));
        usuarioService.desactivarUsuario(profesor.getUsuario().getCodigo());
        profesor.setEstado(true);
        return profesorRepository.save(profesor);
    }

    @Override
    public List<Profesor> registrarProfesores(List<ProfesorRequest> profesorDTOs) {

        List<Profesor> profesoresGuardados = new ArrayList<>();
        for (ProfesorRequest profesorDTO : profesorDTOs) {
            validarProfesor(profesorDTO);
            DocumentoValidator.validarDocumento(profesorDTO.getTipoDoc(), profesorDTO.getNacionalidad(), profesorDTO.getDni());

            Sede sede = sedeRepository.findById(profesorDTO.getSede())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + profesorDTO.getSede()));

            Cargo cargo = cargoRepository.findById(profesorDTO.getCargo())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + profesorDTO.getCargo()));
            String ultimoCodigo = obtenerUltimoCodigoProfesor();
            String nuevoCodigoProfesor = Utilitarios.incrementarSecuencia(ultimoCodigo);
            String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
            String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);

            usuarioService.registrar(nuevoCodigoUsuario, profesorDTO.getUsername(), profesorDTO.getPassword(), "0002");
            loginService.registrar(nuevoCodigoUsuario, profesorDTO.getUsername(), profesorDTO.getPassword(), "PROFESOR");


            Usuario usuario = usuarioRepository.findById(nuevoCodigoUsuario)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + nuevoCodigoUsuario));


            Profesor profesor = Profesor.builder()
                    .codigo(nuevoCodigoProfesor)
                    .primerNombre(profesorDTO.getPrimerNombre())
                    .segundoNombre(profesorDTO.getSegundoNombre())
                    .apellidoPaterno(profesorDTO.getApellidoPaterno())
                    .apellidoMaterno(profesorDTO.getApellidoMaterno())
                    .correo(profesorDTO.getCorreo())
                    .tipo(profesorDTO.getTipoDoc())
                    .dni(profesorDTO.getDni())
                    .direccion(profesorDTO.getDireccion())
                    .telefono(profesorDTO.getTelefono())
                    .edad(profesorDTO.getEdad())
                    .fechaNacimiento(profesorDTO.getNacimiento())
                    .nacionalidad(profesorDTO.getNacionalidad())
                    .fechaCreacion(LocalDate.now())
                    .horaCreacion(LocalTime.now())
                    .estado(true)
                    .genero(profesorDTO.getGenero())
                    .usuario(usuario)
                    .sede(sede)
                    .cargo(cargo)
                    .usuarioCreacion(profesorDTO.getUsuarioCreacion())
                    .build();

            profesoresGuardados.add(profesorRepository.save(profesor));
        }
        return profesoresGuardados;
    }

    @Override
    public Profesor actualizarImagen(String codigoUsuario, String codigoProfesor, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String direccion, MultipartFile archivo) {

        Profesor profesor = profesorRepository.findById(codigoProfesor)
                .orElseThrow(() -> new ResourceNotFoundException("El estudiante con código " + codigoProfesor + " no existe"));

        validarActualizacionProfesor(profesor, telefono, email, username, "");

        Usuario usuario = usuarioRepository.findById(codigoUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + codigoUsuario));
        Sede sede = sedeRepository.findById(profesor.getSede().getCodigo())
                .orElseThrow(() ->
                        new ResourceNotFoundException("La sede con código " + profesor.getSede().getCodigo() + " no existe")
                );
        Cargo cargo = cargoRepository.findById(profesor.getCargo().getCodigo())
                .orElseThrow(() ->
                        new ResourceNotFoundException("La sede con código " + profesor.getCargo().getCodigo() + " no existe")
                );
        profesor.setPrimerNombre(primerNombre);
        profesor.setSegundoNombre(segundoNombre);
        profesor.setApellidoPaterno(apellidoPaterno);
        profesor.setApellidoMaterno(apellidoMaterno);
        profesor.setCorreo(email);
        profesor.setDireccion(direccion);
        profesor.setTelefono(telefono);
        profesor.setSede(sede);
        profesor.setCargo(cargo);
        profesor.setFechaActualizacion(LocalDate.now());
        profesor.setHoraActualizacion(LocalTime.now());
        profesor.setUsuario(usuario);

        // 🖼️ Imagen
        if (archivo != null && !archivo.isEmpty()) {
            try {
                profesor.setPerfil(archivo.getBytes());
            } catch (IOException e) {
                throw new BadRequestException("Error al procesar la imagen del profesor");
            }
        }
        return profesorRepository.save(profesor);
    }

    private void validarActualizacionProfesor(Profesor profesor, String telefono, String correo, String username, String dni) {

        if (!profesor.getTelefono().equals(telefono)
                && ExistePorTelefono(telefono)) {
            throw new ResourceAlreadyExistsException("El teléfono ya existe");
        }

        if (!profesor.getDni().equals(dni)
                && ExistePorDNI(dni)) {
            throw new ResourceAlreadyExistsException("El DNI ya existe");
        }

        if (!profesor.getCorreo().equals(correo)
                && ExistePorEmail(correo)) {
            throw new ResourceAlreadyExistsException("El correo ya existe");
        }

        String usernameActual = profesor.getUsuario().getUsername();

        if (!usernameActual.equals(username)
                && usuarioService.usuarioExistePorUsername(username)) {
            throw new ResourceAlreadyExistsException("El usuario ya existe");
        }
    }

    private void validarProfesor(ProfesorRequest profesorDTO) {

        if (usuarioService.usuarioExistePorUsername(profesorDTO.getUsername())) {
            throw new ResourceAlreadyExistsException("USUARIO YA EXISTE");
        }

        if (ExistePorEmail(profesorDTO.getCorreo())) {
            throw new ResourceAlreadyExistsException("CORREO YA EXISTE");
        }

        if (ExistePorDNI(profesorDTO.getDni())) {
            throw new ResourceAlreadyExistsException("DNI YA EXISTE");
        }

        if (ExistePorTelefono(profesorDTO.getTelefono())) {
            throw new ResourceAlreadyExistsException("TELEFONO YA EXISTE");
        }
    }

    public boolean ExistePorEmail(String email) {
        return profesorRepository.existsByCorreo(email);
    }

    public boolean ExistePorTelefono(String telefono) {
        return profesorRepository.existsByTelefono(telefono);
    }

    public boolean ExistePorDNI(String dni) {
        return profesorRepository.existsByDni(dni);
    }

    public String obtenerUltimoCodigoProfesor() {
        return profesorRepository.obtenerUltimoCodigoProfesor();
    }

    public String ObtenerUltimoCodigoUsuario() {
        return profesorRepository.obtenerUltimoCodigoUsuario();
    }

}
