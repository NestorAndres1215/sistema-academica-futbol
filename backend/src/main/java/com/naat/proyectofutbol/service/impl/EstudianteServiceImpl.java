package com.naat.proyectofutbol.service.impl;


import com.naat.proyectofutbol.constants.AlreadyExistsMessages;
import com.naat.proyectofutbol.constants.GlobalErrorMessages;
import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.constants.Roles;
import com.naat.proyectofutbol.dto.request.EstudianteRequest;
import com.naat.proyectofutbol.exception.BadRequestException;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Admin;
import com.naat.proyectofutbol.model.Estudiante;
import com.naat.proyectofutbol.model.Sede;
import com.naat.proyectofutbol.model.Usuario;
import com.naat.proyectofutbol.repository.EstudianteRepository;
import com.naat.proyectofutbol.repository.SedeRepository;
import com.naat.proyectofutbol.repository.UsuarioRepository;
import com.naat.proyectofutbol.service.EstudianteService;
import com.naat.proyectofutbol.service.LoginService;
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
public class EstudianteServiceImpl implements EstudianteService {

    private final EstudianteRepository estudianteRepository;
    private final SedeRepository sedeRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;
    private final LoginService loginService;

    @Override
    public List<Estudiante> listar() {
        return estudianteRepository.findAll();
    }

    @Override
    public List<Estudiante> findByTelefono(String telefono) {
        return estudianteRepository.findByTelefono(telefono);
    }

    @Override
    public List<Estudiante> findByDni(String dni) {
        return estudianteRepository.findByDni( dni);
    }

    @Override
    public List<Estudiante> findByCorreo(String correo) {
        return estudianteRepository.findByCorreo( correo);
    }

    @Override
    public List<Estudiante> findByNacionalidad(String nacionalidad) {
        return estudianteRepository.findByNacionalidad( nacionalidad);
    }

    @Override
    public List<Estudiante> findByEdad(String edad) {
        return estudianteRepository.findByEdad(edad);
    }

    @Override
    public List<Estudiante> findByApellidoPaterno(String apellidoPaterno) {
        return estudianteRepository.findByApellidoPaterno(apellidoPaterno);
    }

    @Override
    public List<Estudiante> findByPrimerNombre(String primerNombre) {
        return estudianteRepository.findByPrimerNombre(primerNombre);
    }

    @Override
    public List<Estudiante> getAdminsByUsuarioCodigo(String usuarioCodigo) {
        return estudianteRepository.findByUsuario_Codigo(usuarioCodigo);
    }

    @Override
    public List<Estudiante> findProfesorByEstadoTrue() {
        return estudianteRepository.findByEstadoTrue();
    }

    @Override
    public List<Estudiante> findProfesorByEstadoFalse() {
        return estudianteRepository.findByEstadoFalse();
    }

    @Override
    public Estudiante guardarEstudiante(EstudianteRequest estudianteDTO) {

        validarEstudiante(estudianteDTO);
        DocumentoValidator.validarDocumento(estudianteDTO.getTipoDoc(), estudianteDTO.getNacionalidad(), estudianteDTO.getDni());

        String ultimoCodigo = obtenerUltimoCodigoEstudiante();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
        String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);


        usuarioService.registrar(nuevoCodigoUsuario, estudianteDTO.getUsername(), estudianteDTO.getPassword(), Roles.CODIGO_ESTUDIANTE);
        loginService.registrar(nuevoCodigoUsuario, estudianteDTO.getUsername(), estudianteDTO.getPassword(), Roles.ROLE_ESTUDIANTE);
        Sede sede = sedeRepository.findById(estudianteDTO.getSede())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.SEDE_NO_ENCONTRADO));

        Usuario usuario = usuarioRepository.findById(nuevoCodigoUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        Estudiante estudiante = Estudiante.builder()
                .codigo(nuevoCodigo)
                .primerNombre(estudianteDTO.getPrimerNombre())
                .segundoNombre(estudianteDTO.getSegundoNombre())
                .apellidoPaterno(estudianteDTO.getApellidoPaterno())
                .apellidoMaterno(estudianteDTO.getApellidoMaterno())
                .correo(estudianteDTO.getCorreo())
                .dni(estudianteDTO.getDni())
                .tipo(estudianteDTO.getTipoDoc())
                .direccion(estudianteDTO.getDireccion())
                .telefono(estudianteDTO.getTelefono())
                .edad(estudianteDTO.getEdad())
                .fechaNacimiento(estudianteDTO.getNacimiento())
                .nacionalidad(estudianteDTO.getNacionalidad())
                .genero(estudianteDTO.getGenero())
                .estado(true)
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .usuario(usuario)
                .sede(sede)
                .usuarioCreacion(estudianteDTO.getUsuarioCreacion())
                .build();

        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante actualizarEstudiante(EstudianteRequest estudianteDTO) {

        Estudiante estudiante = estudianteRepository.findById(estudianteDTO.getCodigoEstudiante())
                .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

        DocumentoValidator.validarDocumento(estudianteDTO.getTipoDoc(), estudianteDTO.getNacionalidad(), estudianteDTO.getDni());
        validarActualizacionEstudiante(estudiante, estudianteDTO.getTelefono(), estudianteDTO.getCorreo(), estudianteDTO.getUsername(), estudianteDTO.getDni());


        Sede sede = sedeRepository.findById(estudianteDTO.getSede())
                .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.SEDE_NO_ENCONTRADO));

        usuarioService.actualizar(estudianteDTO.getCodigoUsuario(), estudianteDTO.getUsername(), estudianteDTO.getPassword(), "0001");
        loginService.actualizar(estudianteDTO.getCodigoUsuario(), estudianteDTO.getUsername(), estudianteDTO.getPassword(), "ESTUDIANTE");

        Usuario usuario = usuarioRepository.findById(estudianteDTO.getCodigoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.USUARIO_NO_ENCONTRADO));

        if (!usuario.getUsername().equals(estudianteDTO.getUsername())
                && usuarioService.usuarioExistePorUsername(estudianteDTO.getUsername())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.USUARIO_YA_EXISTE);
        }
        estudiante.setPrimerNombre(estudianteDTO.getPrimerNombre());
        estudiante.setSegundoNombre(estudianteDTO.getSegundoNombre());
        estudiante.setApellidoPaterno(estudianteDTO.getApellidoPaterno());
        estudiante.setApellidoMaterno(estudianteDTO.getApellidoMaterno());
        estudiante.setCorreo(estudianteDTO.getCorreo());
        estudiante.setDni(estudianteDTO.getDni());
        estudiante.setDireccion(estudianteDTO.getDireccion());
        estudiante.setTelefono(estudianteDTO.getTelefono());
        estudiante.setEdad(estudianteDTO.getEdad());
        estudiante.setFechaNacimiento(estudianteDTO.getNacimiento());
        estudiante.setNacionalidad(estudianteDTO.getNacionalidad());
        estudiante.setGenero(estudianteDTO.getGenero());
        estudiante.setSede(sede);
        estudiante.setUsuario(usuario);
        estudiante.setEstado(true);
        estudiante.setFechaActualizacion(LocalDate.now());
        estudiante.setHoraActualizacion(LocalTime.now());
        estudiante.setUsuarioActualizacion(estudianteDTO.getUsuarioActualizacion());

        return estudianteRepository.save(estudiante);
    }

    @Override
    public List<Estudiante> reEstudiantes(List<EstudianteRequest> estudianteDTOS) {
        List<Estudiante> estudianteGuardado = new ArrayList<>();


        for (EstudianteRequest estudianteDTO : estudianteDTOS) {
            DocumentoValidator.validarDocumento(estudianteDTO.getTipoDoc(), estudianteDTO.getNacionalidad(), estudianteDTO.getDni());
            validarEstudiante(estudianteDTO);

            Sede sede = sedeRepository.findById(estudianteDTO.getSede())
                    .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.SEDE_NO_ENCONTRADO));

            String ultimoCodigo = obtenerUltimoCodigoEstudiante();
            String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
            String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
            String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);

            usuarioService.registrar(nuevoCodigoUsuario, estudianteDTO.getUsername(), estudianteDTO.getPassword(), Roles.CODIGO_ESTUDIANTE);
            loginService.registrar(nuevoCodigoUsuario, estudianteDTO.getUsername(), estudianteDTO.getPassword(), Roles.ROLE_ESTUDIANTE);

            Usuario usuario = usuarioRepository.findById(nuevoCodigoUsuario)
                    .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.USUARIO_NO_ENCONTRADO));

            Estudiante estudiante = Estudiante.builder()
                    .codigo(nuevoCodigo)
                    .primerNombre(estudianteDTO.getPrimerNombre())
                    .segundoNombre(estudianteDTO.getSegundoNombre())
                    .apellidoPaterno(estudianteDTO.getApellidoPaterno())
                    .apellidoMaterno(estudianteDTO.getApellidoMaterno())
                    .correo(estudianteDTO.getCorreo())
                    .tipo(estudianteDTO.getTipoDoc())
                    .dni(estudianteDTO.getDni())
                    .direccion(estudianteDTO.getDireccion())
                    .telefono(estudianteDTO.getTelefono())
                    .edad(estudianteDTO.getEdad())
                    .fechaNacimiento(estudianteDTO.getNacimiento())
                    .nacionalidad(estudianteDTO.getNacionalidad())
                    .fechaCreacion(LocalDate.now())
                    .horaCreacion(LocalTime.now())
                    .estado(true)
                    .genero(estudianteDTO.getGenero())
                    .usuario(usuario)
                    .sede(sede)
                    .usuarioCreacion(estudianteDTO.getUsuarioCreacion())
                    .build();

            estudianteGuardado.add(estudianteRepository.save(estudiante));
        }
        return estudianteGuardado;
    }

    @Override
    public Estudiante actualizarImagen(String codigoUsuario, String codigoEstudiante, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String direccion, MultipartFile archivo) {

        Estudiante estudiante = estudianteRepository.findById((codigoEstudiante))
                .orElseThrow(() ->
                        new RuntimeException( NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO)
                );
        validarActualizacionEstudiante(estudiante, telefono, email, username, "");
        usuarioService.actualizar(codigoUsuario, username, estudiante.getUsuario().getPassword(), Roles.CODIGO_ESTUDIANTE);
        loginService.actualizar(codigoUsuario, username, estudiante.getUsuario().getPassword(), Roles.ROLE_ESTUDIANTE);

        Usuario usuario = usuarioRepository.findById(codigoUsuario)
                .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.USUARIO_NO_ENCONTRADO));

        Sede sede = sedeRepository.findById(estudiante.getSede().getCodigo())
                .orElseThrow(() -> new ResourceNotFoundException( NotFoundMessages.SEDE_NO_ENCONTRADO));


        estudiante.setPrimerNombre(primerNombre);
        estudiante.setSegundoNombre(segundoNombre);
        estudiante.setApellidoPaterno(apellidoPaterno);
        estudiante.setApellidoMaterno(apellidoMaterno);
        estudiante.setTelefono(telefono);
        estudiante.setCorreo(email);
        estudiante.setDireccion(direccion);
        estudiante.setDni(estudiante.getDni());
        estudiante.setEdad(estudiante.getEdad());
        estudiante.setFechaNacimiento(estudiante.getFechaNacimiento());
        estudiante.setNacionalidad(estudiante.getNacionalidad());
        estudiante.setGenero(estudiante.getGenero());
        estudiante.setSede(sede);
        estudiante.setUsuario(usuario);
        estudiante.setEstado(true);
        estudiante.setFechaActualizacion(LocalDate.now());
        estudiante.setHoraActualizacion(LocalTime.now());

        if (archivo != null && !archivo.isEmpty()) {
            try {
                estudiante.setPerfil(archivo.getBytes());
            } catch (IOException e) {
                throw new BadRequestException(GlobalErrorMessages.IMAGEN_ERROR);
            }
        }

        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante desactivar(String usuarioCodigo) {

        Estudiante estudiante = estudianteRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

        usuarioService.desactivarUsuario(estudiante.getUsuario().getCodigo());
        estudiante.setEstado(false);
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante activar(String usuarioCodigo) {

        Estudiante estudiante = estudianteRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ESTUDIANTE_NO_ENCONTRADO));

        usuarioService.desactivarUsuario(estudiante.getUsuario().getCodigo());
        estudiante.setEstado(true);
        return estudianteRepository.save(estudiante);
    }

    private void validarEstudiante(EstudianteRequest estudianteDTO) {

        if (usuarioService.usuarioExistePorUsername(estudianteDTO.getUsername())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.USUARIO_YA_EXISTE);
        }

        if (ExistePorEmail(estudianteDTO.getCorreo())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CORREO_YA_EXISTE);
        }

        if (ExistePorDNI(estudianteDTO.getDni())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DNI_YA_EXISTE);
        }

        if (ExistePorTelefono(estudianteDTO.getTelefono())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.TELEFONO_YA_EXISTE);
        }

    }

    private void validarActualizacionEstudiante(Estudiante estudiante, String telefono, String correo, String username, String dni) {

        if (!estudiante.getTelefono().equals(telefono)
                && ExistePorTelefono(telefono)) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.TELEFONO_YA_EXISTE);
        }

        if (!estudiante.getDni().equals(dni)
                && ExistePorDNI(dni)) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DNI_YA_EXISTE);
        }

        if (!estudiante.getCorreo().equals(correo)
                && ExistePorEmail(correo)) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CORREO_YA_EXISTE);
        }

        String usernameActual = estudiante.getUsuario().getUsername();

        if (!usernameActual.equals(username)
                && usuarioService.usuarioExistePorUsername(username)) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.USUARIO_YA_EXISTE);
        }
    }


    public boolean ExistePorEmail(String email) {
        return estudianteRepository.existsByCorreo(email);
    }

    public boolean ExistePorTelefono(String telefono) {
        return estudianteRepository.existsByTelefono(telefono);
    }

    public boolean ExistePorDNI(String dni) {
        return estudianteRepository.existsByDni(dni);
    }

    public String obtenerUltimoCodigoEstudiante() {
        return estudianteRepository.obtenerUltimoCodigoEstudiante();
    }

    public String ObtenerUltimoCodigoUsuario() {
        return estudianteRepository.obtenerUltimoCodigoUsuario();
    }

}

