package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.EstudianteDTO;
import com.naat.proyectofutbol.entidades.*;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.repositorios.EstudianteRepository;
import com.naat.proyectofutbol.repositorios.LoginRepository;
import com.naat.proyectofutbol.repositorios.SedeRepository;
import com.naat.proyectofutbol.repositorios.UsuarioRepository;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class  EstudianteService{

    private final EstudianteRepository estudianteRepository;

    private final UsuarioRepository usuarioRepository;

    private final LoginRepository loginRepository;

    private final SedeRepository sedeRepository;

    private final UsuarioService usuarioService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<Estudiante> findProfesorByEstadoTrue() {
        return estudianteRepository.findByEstadoTrue();
    }


    public List<Estudiante> findProfesorByEstadoFalse() {
        return estudianteRepository.findByEstadoFalse();
    }

    public Estudiante guardarEstudianter(EstudianteDTO estudianteDTO) throws Exception {
        validarEstudiante(estudianteDTO);
        validarDocumento(estudianteDTO);
        Optional<Sede> sedeExistente = sedeRepository.findById(estudianteDTO.getSede());
        Sede sede = sedeExistente.orElseThrow(() -> new Exception("La sede con el código " + estudianteDTO.getSede() + " no existe."));
        String ultimoCodigo = obtenerUltimoCodigoEstudiante();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        String ultimoCodigoUsuario= ObtenerUltimoCodigoUsuario();
        String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);
        Login login = new Login();
        login.setUl_codigo(nuevoCodigoUsuario);
        login.setUsername(estudianteDTO.getUsername());
        login.setPassword(this.bCryptPasswordEncoder.encode(estudianteDTO.getPassword()));
        login.setCorreo(estudianteDTO.getCorreo());
        login.setUl_rol("ESTUDIANTE");
        login.setEstado(true);
        Usuario usuario = new Usuario();
        usuario.setCodigo(nuevoCodigoUsuario);
        usuario.setUsername(estudianteDTO.getUsername());
        usuario.setPassword(estudianteDTO.getPassword());
        usuario.setFechaCreacion(LocalDate.now());
        usuario.setHoraCreacion(LocalTime.now());
        usuario.setEstado(true);
        usuario.setRol("0003");

        Estudiante estudiante = new Estudiante();
        estudiante.setCodigo(nuevoCodigo);
        estudiante.setPrimerNombre(estudianteDTO.getPrimerNombre());
        estudiante.setSegundoNombre(estudianteDTO.getSegundoNombre());
        estudiante.setApellidoPaterno(estudianteDTO.getApellidoPaterno());
        estudiante.setApellidoMaterno(estudianteDTO.getApellidoMaterno());
        estudiante.setCorreo(estudianteDTO.getCorreo());
        estudiante.setCorreo(estudianteDTO.getCorreo());
        estudiante.setDni(estudianteDTO.getDni());
        estudiante.setTipo(estudianteDTO.getTipoDoc());
        estudiante.setDireccion(estudianteDTO.getDireccion());
        estudiante.setTelefono(estudianteDTO.getTelefono());
        estudiante.setEdad(estudianteDTO.getEdad());
        estudiante.setFechaNacimiento(estudianteDTO.getNacimiento());
        estudiante.setNacionalidad(estudianteDTO.getNacionalidad());
        estudiante.setFechaCreacion(LocalDate.now());
        estudiante.setHoraCreacion(LocalTime.now());
        estudiante.setEstado(true);
        estudiante.setGenero(estudianteDTO.getGenero());
        estudiante.setUsuario(nuevoCodigoUsuario);
        estudiante.setSede(sedeExistente.get());
        estudiante.setUsuarioCreacion(estudianteDTO.getUsuarioCreacion());

        loginRepository.save(login);
        usuarioRepository.save(usuario);
        return estudianteRepository.save(estudiante);
    }


    public Estudiante actualizarEstudiante(EstudianteDTO estudianteDTO) throws Exception {
        try {
            Optional<Estudiante> estudianteOptional = estudianteRepository.findById(estudianteDTO.getCodigoProfesor());
            if (!estudianteOptional.isPresent()) {
                throw new RuntimeException("El Profesor con código " + estudianteDTO.getCodigoProfesor() + " no existe.");
            }
validarDocumento(estudianteDTO);
            Sede sede = sedeRepository.findById(estudianteDTO.getSede())
                    .orElseThrow(() -> new Exception("La sede con el código " + estudianteDTO.getSede() + " no existe."));

            // Validaciones de campos
            if (!telefonoEsValido(estudianteDTO.getTelefono())) {
                throw new IllegalArgumentException("El teléfono debe tener 9 dígitos");
            }
            if (!correoEsValido(estudianteDTO.getCorreo())) {
                throw new IllegalArgumentException("El correo no tiene un formato válido");
            }
            if (estudianteDTO.getEdad() < 18) {
                throw new IllegalArgumentException("La edad no es permitida");
            }
            Estudiante estudiante = estudianteOptional.get();
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
            estudiante.setFechaActualizacion(LocalDate.now());
            estudiante.setHoraActualizacion(LocalTime.now());
            estudiante.setEstado(true);
            estudiante.setGenero(estudianteDTO.getGenero());
            estudiante.setUsuario(estudianteDTO.getCodigoUsuario());
            estudiante.setSede(sede);
            estudiante.setUsuarioActualizacion(estudianteDTO.getUsuarioActualizacion());

            if (!estudiante.getTelefono().equals(estudianteDTO.getTelefono()) && ExistePorTelefono(estudianteDTO.getTelefono())) {
                throw new IllegalArgumentException("El teléfono ya existe");
            }
            if (!estudiante.getDni().equals(estudianteDTO.getDni()) && ExistePorDNI(estudianteDTO.getDni())) {
                throw new IllegalArgumentException("El DNI ya existe");
            }
            if (!estudiante.getCorreo().equals(estudianteDTO.getCorreo()) && ExistePorEmail(estudianteDTO.getCorreo())) {
                throw new IllegalArgumentException("El correo ya existe");
            }
            Login login = loginRepository.findById(estudianteDTO.getCodigoUsuario())
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + estudianteDTO.getCodigoUsuario() + " no existe."));

            if (!login.getUsername().equals(estudianteDTO.getUsername()) && usuarioService.usuarioExistePorUsername(estudianteDTO.getUsername())) {
                throw new IllegalArgumentException("El usuario ya existe");
            }
            if (!login.getCorreo().equals(estudianteDTO.getCorreo()) && ExistePorEmail(estudianteDTO.getCorreo())) {
                throw new IllegalArgumentException("El correo ya existe");
            }
            login.setUsername(estudianteDTO.getUsername());
            login.setCorreo(estudianteDTO.getCorreo());
            loginRepository.save(login);

            Usuario usuario = usuarioRepository.findById(estudianteDTO.getCodigoUsuario())
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + estudianteDTO.getCodigoUsuario() + " no existe."));
            usuario.setUsername(estudianteDTO.getUsername());
            usuarioRepository.save(usuario);


            return estudianteRepository.save(estudiante);

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Ocurrió un error al actualizar el profesor: " + e.getMessage(), e);
        }
    }


    public String obtenerUltimoCodigoEstudiante() {
        return estudianteRepository.obtenerUltimoCodigoEstudiante();
    }


    public String ObtenerUltimoCodigoUsuario() {
        return estudianteRepository.obtenerUltimoCodigoUsuario();
    }


    public boolean telefonoEsValido(String telefono) {
        // Verificar que el teléfono tiene 9 dígitos
        return telefono != null && telefono.matches("\\d{9}");
    }


    public boolean correoEsValido(String correo) {
        // Validar que el correo tiene un formato correcto
        return correo != null && correo.matches("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");
    }


    public boolean dniEsValido(String dni) {
        // Verificar que el DNI tiene exactamente 8 dígitos
        return dni != null && dni.matches("\\d{8}");
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


    public Estudiante desactivar(String usuarioCodigo) {
        Optional<Estudiante> adminExistenteOpt = estudianteRepository.findById(usuarioCodigo);

        if (adminExistenteOpt.isPresent()) {
            Estudiante estudiante = adminExistenteOpt.get();

            Optional<Usuario> usuario = usuarioRepository.findById(estudiante.getUsuario().getCodigo());

            if (usuario.isPresent()) {
                Usuario usuarioEntity = usuario.get();
                usuarioEntity.setEstado(false);
                usuarioRepository.save(usuarioEntity);
            }


            Optional<Login> login = loginRepository.findById(estudiante.getUsuario().getCodigo());

            if (login.isPresent()) {
                Login loginEntity = login.get();
                loginEntity.setEstado(false);
                loginRepository.save(loginEntity);
            }

            estudiante.setEstado(false);

            return estudianteRepository.save(estudiante);
        } else {
            throw new RuntimeException("Admin no encontrado con el código: " + usuarioCodigo);
        }
    }


    public Estudiante activar(String usuarioCodigo) {
        Optional<Estudiante> adminExistenteOpt = estudianteRepository.findById(usuarioCodigo);

        if (adminExistenteOpt.isPresent()) {
            Estudiante estudiante = adminExistenteOpt.get();

            Optional<Usuario> usuario = usuarioRepository.findById(estudiante.getUsuario().getCodigo());

            if (usuario.isPresent()) {
                Usuario usuarioEntity = usuario.get();
                usuarioEntity.setEstado(true);
                usuarioRepository.save(usuarioEntity);
            }


            Optional<Login> login = loginRepository.findById(estudiante.getUsuario().getCodigo());

            if (login.isPresent()) {
                Login loginEntity = login.get();
                loginEntity.setEstado(true);
                loginRepository.save(loginEntity);
            }

            estudiante.setEstado(true);

            return estudianteRepository.save(estudiante);
        } else {
            throw new RuntimeException("Admin no encontrado con el código: " + usuarioCodigo);
        }
    }


    private boolean validarEstudiante(EstudianteDTO estudianteDTO) {


        if (usuarioService.usuarioExistePorUsername(estudianteDTO.getUsername())) {
            throw new IllegalArgumentException("USUARIO YA EXISTE");
        }
        if (ExistePorEmail(estudianteDTO.getCorreo())) {
            throw new IllegalArgumentException("CORREO YA EXISTE");
        }
        if (ExistePorDNI(estudianteDTO.getDni())) {
            throw new IllegalArgumentException("DNI YA EXISTE");
        }
        if (ExistePorTelefono(estudianteDTO.getTelefono())) {
            throw new IllegalArgumentException("TELEFONO YA EXISTE");
        }
        if (!telefonoEsValido(estudianteDTO.getTelefono())) {
            throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
        }

        if (!correoEsValido(estudianteDTO.getCorreo())) {
            throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
        }



        return ResponseEntity.ok("Validación exitosa").hasBody();
    }



    public void validarDocumento(EstudianteDTO estudianteDTO) {

        String pais = estudianteDTO.getNacionalidad();
        String numeroDoc = estudianteDTO.getDni();

        switch (estudianteDTO.getTipoDoc()) {
            case "CE":
                switch (pais) {
                    case "Canadá":
                        if (numeroDoc == null || numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Canadá debe tener 8 dígitos.");
                        }
                        break;
                    case "México":
                        if (numeroDoc == null || numeroDoc.length() != 13) {
                            throw new IllegalArgumentException("El Carné de Extranjería en México debe tener 13 dígitos.");
                        }
                        break;
                    case "Estados Unidos":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Estados Unidos debe tener 9 dígitos.");
                        }
                        break;
                    case "Belice":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Belice debe tener 9 dígitos.");
                        }
                        break;
                    case "Costa Rica":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Costa Rica debe tener 9 dígitos.");
                        }
                        break;
                    case "El Salvador":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en El Salvador debe tener 9 dígitos.");
                        }
                        break;
                    case "Guatemala":
                        if (numeroDoc == null || numeroDoc.length() != 13) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Guatemala debe tener 13 dígitos.");
                        }
                        break;
                    case "Honduras":
                        if (numeroDoc == null || numeroDoc.length() != 13) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Honduras debe tener 13 dígitos.");
                        }
                        break;
                    case "Nicaragua":
                        if (numeroDoc == null || numeroDoc.length() != 13) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Nicaragua debe tener 13 dígitos.");
                        }
                        break;
                    case "Panamá":
                        if (numeroDoc == null || numeroDoc.length() != 7) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Panamá debe tener 7 dígitos.");
                        }
                        break;
                    case "Cuba":
                        if (numeroDoc == null || numeroDoc.length() != 11) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Cuba debe tener 11 dígitos.");
                        }
                        break;
                    case "República Dominicana":
                        if (numeroDoc == null || numeroDoc.length() != 11) {
                            throw new IllegalArgumentException("El Carné de Extranjería en República Dominicana debe tener 11 dígitos.");
                        }
                        break;
                    case "Jamaica":
                        if (numeroDoc == null || numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Jamaica debe tener 8 dígitos.");
                        }
                        break;
                    case "Argentina":
                        if (numeroDoc == null || numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Argentina debe tener 8 dígitos.");
                        }
                        break;
                    case "Bolivia":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Bolivia debe tener 9 dígitos.");
                        }
                        break;
                    case "Brasil":
                        if (numeroDoc == null || numeroDoc.length() != 11) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Brasil debe tener 11 dígitos.");
                        }
                        break;
                    case "Chile":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Chile debe tener 9 dígitos.");
                        }
                        break;
                    case "Colombia":
                        if (numeroDoc == null || numeroDoc.length() != 10) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Colombia debe tener 10 dígitos.");
                        }
                        break;
                    case "Ecuador":
                        if (numeroDoc == null || numeroDoc.length() != 10) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Ecuador debe tener 10 dígitos.");
                        }
                        break;
                    case "Paraguay":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Paraguay debe tener 9 dígitos.");
                        }
                        break;
                    case "Perú":
                        if (numeroDoc == null || numeroDoc.length() != 12) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Perú debe tener 12 dígitos.");
                        }
                        break;
                    case "Uruguay":
                        if (numeroDoc == null || numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Uruguay debe tener 8 dígitos.");
                        }
                        break;
                    case "Venezuela":
                        if (numeroDoc == null || numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Venezuela debe tener 8 dígitos.");
                        }
                        break;

                    // Europa
                    case "España":
                        if (numeroDoc == null || numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Carné de Extranjería en España debe tener 9 dígitos.");
                        }
                        break;
                    case "Francia":
                        if (numeroDoc == null || numeroDoc.length() != 12) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Francia debe tener 12 dígitos.");
                        }
                        break;
                    case "Alemania":
                        if (numeroDoc == null || numeroDoc.length() != 10) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Alemania debe tener 10 dígitos.");
                        }
                        break;
                    case "China":
                        if (numeroDoc == null || numeroDoc.length() != 18) {
                            throw new IllegalArgumentException("El Carné de Extranjería en China debe tener 18 dígitos.");
                        }
                        break;
                    case "India":
                        if (numeroDoc == null || numeroDoc.length() != 12) {
                            throw new IllegalArgumentException("El Carné de Extranjería en India debe tener 12 dígitos.");
                        }
                        break;
                    case "Japón":
                        if (numeroDoc == null || numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Carné de Extranjería en Japón debe tener 8 dígitos.");
                        }
                        break;
                    default:
                        throw new IllegalArgumentException("El país no tiene validación configurada para el Carné de Extranjería.");
                }
                break;
            case "PS":
                if (numeroDoc == null || numeroDoc.length() < 5 || numeroDoc.length() > 15) {
                    throw new IllegalArgumentException("El Pasaporte debe tener entre 5 y 15 caracteres.");
                }
                switch (pais) {
                    case "Canadá":
                    case "México":
                    case "Estados Unidos":
                        if (numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Pasaporte en " + pais + " debe tener 9 caracteres.");
                        }
                        break;
                    case "Belice":
                    case "Costa Rica":
                    case "El Salvador":
                    case "Guatemala":
                    case "Honduras":
                    case "Nicaragua":
                    case "Panamá":
                        if (numeroDoc.length() != 8) {
                            throw new IllegalArgumentException("El Pasaporte en " + pais + " debe tener 8 caracteres.");
                        }
                        break;
                    case "Cuba":
                    case "República Dominicana":
                    case "Jamaica":
                        if (numeroDoc.length() != 7) {
                            throw new IllegalArgumentException("El Pasaporte en " + pais + " debe tener 7 caracteres.");
                        }
                        break;
                    case "Argentina":
                    case "Bolivia":
                    case "Brasil":
                    case "Chile":
                    case "Colombia":
                    case "Ecuador":
                    case "Paraguay":
                    case "Perú":
                    case "Uruguay":
                    case "Venezuela":
                        if (numeroDoc.length() != 10) {
                            throw new IllegalArgumentException("El Pasaporte en " + pais + " debe tener 10 caracteres.");
                        }
                        break;

                    // Europa
                    case "España":
                    case "Francia":
                    case "Italia":
                    case "Alemania":
                    case "Portugal":
                        if (numeroDoc.length() != 9) {
                            throw new IllegalArgumentException("El Pasaporte en " + pais + " debe tener 9 caracteres.");
                        }
                        break;
                    case "China":
                        if (numeroDoc.length() != 18) {
                            throw new IllegalArgumentException("El Pasaporte en China debe tener 18 caracteres.");
                        }
                        break;
                    case "Japón":
                    case "India":
                    case "Corea del Sur":
                    case "Singapur":
                        if (numeroDoc.length() != 12) {
                            throw new IllegalArgumentException("El Pasaporte en " + pais + " debe tener 12 caracteres.");
                        }
                        break;

                    default:
                        throw new IllegalArgumentException("El país no tiene validación configurada para el Pasaporte.");
                }
                break;
            case "DNI":
                if (estudianteDTO.getDni() == null || estudianteDTO.getDni().length() != 8) {
                    throw new IllegalArgumentException("El DNI no es válido. Debe tener 8 dígitos.");
                }
                break;
            default:
                throw new IllegalArgumentException("El tipo de documento no es válido. Debe ser CE (Carné de Extranjería) o PS (Pasaporte).");
        }

    }


    public List<Estudiante> reEstudiantes(List<EstudianteDTO> estudianteDTOS) throws Exception {
        List<Estudiante> estudianteGuardado = new ArrayList<>();
        System.out.print(estudianteGuardado);

        try {
            for (EstudianteDTO estudianteDTO : estudianteDTOS) {
                // Validaciones
                validarDocumento(estudianteDTO);
                validarEstudiante(estudianteDTO);

                // Obtener Sede y Cargo
                Optional<Sede> sedeExistente = sedeRepository.findById(estudianteDTO.getSede());
                Sede sede = sedeExistente.orElseThrow(() -> new Exception("La sede con el código " + estudianteDTO.getSede() + " no existe."));


                // Generar códigos
                String ultimoCodigo = obtenerUltimoCodigoEstudiante();
                String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
                String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
                String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);

                // Crear Login
                Login login = new Login();
                login.setUl_codigo(nuevoCodigoUsuario);
                login.setUsername(estudianteDTO.getUsername());
                login.setPassword(this.bCryptPasswordEncoder.encode(estudianteDTO.getPassword()));
                login.setCorreo(estudianteDTO.getCorreo());
                login.setUl_rol("ESTUDIANTE");
                login.setEstado(true);

                // Crear Usuario
                Usuario usuario = new Usuario();
                usuario.setCodigo(nuevoCodigoUsuario);
                usuario.setUsername(estudianteDTO.getUsername());
                usuario.setPassword(estudianteDTO.getPassword());
                usuario.setFechaCreacion(LocalDate.now());
                usuario.setHoraCreacion(LocalTime.now());
                usuario.setEstado(true);
                usuario.setRol("0003");

                // Crear Estudiante
                Estudiante estudiante = new Estudiante(); // Cambié Profesor por Estudiante
                estudiante.setCodigo(nuevoCodigo);
                estudiante.setPrimerNombre(estudianteDTO.getPrimerNombre());
                estudiante.setSegundoNombre(estudianteDTO.getSegundoNombre());
                estudiante.setApellidoPaterno(estudianteDTO.getApellidoPaterno());
                estudiante.setApellidoMaterno(estudianteDTO.getApellidoMaterno());
                estudiante.setCorreo(estudianteDTO.getCorreo());
                estudiante.setTipo(estudianteDTO.getTipoDoc());
                estudiante.setDni(estudianteDTO.getDni());
                estudiante.setDireccion(estudianteDTO.getDireccion());
                estudiante.setTelefono(estudianteDTO.getTelefono());
                estudiante.setEdad(estudianteDTO.getEdad());
                estudiante.setFechaNacimiento(estudianteDTO.getNacimiento());
                estudiante.setNacionalidad(estudianteDTO.getNacionalidad());
                estudiante.setFechaCreacion(LocalDate.now());
                estudiante.setHoraCreacion(LocalTime.now());
                estudiante.setEstado(true);
                estudiante.setGenero(estudianteDTO.getGenero());
                estudiante.setUsuario(nuevoCodigoUsuario);
                estudiante.setSede(sede);

                estudiante.setUsuarioCreacion(estudianteDTO.getUsuarioCreacion());


                // Guardar los objetos
                loginRepository.save(login);
                usuarioRepository.save(usuario);
                Estudiante estudiante1 = estudianteRepository.save(estudiante);
                estudianteGuardado.add(estudiante1);
            }
        } catch (Exception e) {
            throw new Exception("Error al registrar los profesores: " + e.getMessage(), e);
        }

        return estudianteGuardado;
    }


    public List<Estudiante> listar() {
        return estudianteRepository.findAll();
    }


    public List<Estudiante> getAdminsByUsuarioCodigo(String usuarioCodigo) {
        return estudianteRepository.findByUsuario_Codigo(usuarioCodigo);
    }


    public Estudiante actualizarImagen(String codigoUsuario, String codigoAdmin, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String direccion, MultipartFile archivo) throws IOException {

        Optional<Estudiante> adminExistenteOpt = estudianteRepository.findById(codigoAdmin);
        System.out.print(codigoUsuario);
        System.out.print(codigoAdmin);
        System.out.print(adminExistenteOpt.isPresent());
        if (!adminExistenteOpt.isPresent()) {
            throw new RuntimeException("El Profesor con codigo " + adminExistenteOpt.get() + " no existe.");
        }
        try{

            if (!telefonoEsValido(telefono)) {
                throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
            }
            if (!correoEsValido(email)) {
                throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
            }

            // Si existe, obtenemos el Admin y lo actualizamos
            Estudiante profesor = adminExistenteOpt.get();

            // Actualizar los campos con los nuevos valores
            profesor.setPrimerNombre(primerNombre);
            profesor.setSegundoNombre(segundoNombre);
            profesor.setApellidoPaterno(apellidoPaterno);
            profesor.setApellidoMaterno(apellidoMaterno);
            profesor.setCorreo(email);
            profesor.setDireccion(direccion);
            profesor.setTelefono(telefono);
            profesor.setFechaActualizacion(LocalDate.now());
            profesor.setHoraActualizacion(LocalTime.now());
            profesor.setUsuario(codigoUsuario); // Si esto necesita actualizarse también
            String archivoBase64 = convertirArchivoABase64(archivo);
            System.out.print(archivoBase64);
            System.out.print(profesor.getPerfil());
            if (archivoBase64.isEmpty()) {
                profesor.setPerfil(profesor.getPerfil()); ;
            } else {
                profesor.setPerfil(archivo.getBytes());
            }
            if (!profesor.getTelefono().equals(telefono)) {
                if (ExistePorTelefono(telefono)) {
                    throw new IllegalArgumentException("TELEFONO YA EXISTE");
                }
            }


            Login login = loginRepository.findById(codigoUsuario)
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + codigoUsuario+ " no existe."));

            if (!login.getUsername().equals(username)) {
                if (usuarioService.usuarioExistePorUsername(username)) {
                    throw new IllegalArgumentException("USUARIO YA EXISTE");
                }
            }
            if (!login.getCorreo().equals(email)) {
                if (ExistePorEmail(email)) {
                    throw new IllegalArgumentException("CORREO YA EXISTE");
                }
            }
            login.setUsername(username);
            login.setCorreo(email);
            Usuario usuario = usuarioRepository.findById(codigoUsuario)
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + codigoUsuario + " no existe."));
            usuario.setUsername(username);

            loginRepository.save(login); // Actualizar
            usuarioRepository.save(usuario); // Actualizar Usuario
            return  estudianteRepository.save(profesor);}
        catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    private String convertirArchivoABase64(MultipartFile archivo) throws IOException {
        byte[] contenido = archivo.getBytes();
        return Base64.getEncoder().encodeToString(contenido);
    }

}
