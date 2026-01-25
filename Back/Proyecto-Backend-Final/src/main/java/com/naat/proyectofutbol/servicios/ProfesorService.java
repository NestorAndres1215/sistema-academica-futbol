package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.ProfesorDTO;
import com.naat.proyectofutbol.entidades.*;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.repositorios.*;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class  ProfesorService {

    private final ProfesorRepository profesorRepository;

    private final UsuarioRepository usuarioRepository;

    private final SedeRepository sedeRepository;

    private final CargoRepository cargoRepository;

    private final LoginRepository loginRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UsuarioService usuarioService;


    public Profesor guardarProfesor(ProfesorDTO profesorDTO) throws Exception {
        validarDocumento(profesorDTO);
        validarProfesor(profesorDTO);
        System.out.print(profesorDTO.getSede() + '\'');
        Optional<Sede> sedeExistente = sedeRepository.findById(profesorDTO.getSede());

        Sede sede = sedeExistente.orElseThrow(() -> new Exception("La sede con el código " + profesorDTO.getSede() + " no existe."));
        System.out.print(sedeExistente.get());
        Optional<Cargo> cargoExistente = cargoRepository.findById(profesorDTO.getCargo());
        Cargo cargo = cargoExistente.orElseThrow(() -> new Exception("La sede con el código " + profesorDTO.getCargo() + " no existe."));

        String ultimoCodigo = obtenerUltimoCodigoProfesor();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
        String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);

        Login login = new Login();
        login.setUl_codigo(nuevoCodigoUsuario);
        login.setUsername(profesorDTO.getUsername());
        login.setPassword(this.bCryptPasswordEncoder.encode(profesorDTO.getPassword()));
        login.setCorreo(profesorDTO.getCorreo());
        login.setUl_rol("PROFESOR");
        login.setEstado(true);


        Usuario usuario = new Usuario();
        usuario.setCodigo(nuevoCodigoUsuario);
        usuario.setUsername(profesorDTO.getUsername());
        usuario.setPassword(profesorDTO.getPassword());
        usuario.setFechaCreacion(LocalDate.now());
        usuario.setHoraCreacion(LocalTime.now());
        usuario.setEstado(true);
        usuario.setRol("0002");

        Profesor profesor = new Profesor();

        if (profesorDTO.getSegundoNombre().equals("-")) {
            profesor.setSegundoNombre("");
        }
        profesor.setCodigo(nuevoCodigo);
        profesor.setPrimerNombre(profesorDTO.getPrimerNombre());
        profesor.setSegundoNombre(profesorDTO.getSegundoNombre());
        profesor.setApellidoPaterno(profesorDTO.getApellidoPaterno());
        profesor.setApellidoMaterno(profesorDTO.getApellidoMaterno());
        profesor.setCorreo(profesorDTO.getCorreo());
        profesor.setCorreo(profesorDTO.getCorreo());
        profesor.setTipo(profesorDTO.getTipoDoc());
        profesor.setDni(profesorDTO.getDni());
        profesor.setDireccion(profesorDTO.getDireccion());
        profesor.setTelefono(profesorDTO.getTelefono());
        profesor.setEdad(profesorDTO.getEdad());
        profesor.setFechaNacimiento(profesorDTO.getNacimiento());
        profesor.setNacionalidad(profesorDTO.getNacionalidad());
        profesor.setFechaCreacion(LocalDate.now());
        profesor.setHoraCreacion(LocalTime.now());
        profesor.setEstado(true);
        profesor.setGenero(profesorDTO.getGenero());
        profesor.setUsuario(nuevoCodigoUsuario);
        profesor.setSede(sedeExistente.get());  // Asignar la sede existente
        profesor.setCargo(cargoExistente.get());
        profesor.setUsuarioCreacion(profesorDTO.getUsuarioCreacion());

        System.out.print(profesor);
        loginRepository.save(login);
        usuarioRepository.save(usuario);
        return profesorRepository.save(profesor);
    }


    public Profesor actualizarProfesor(ProfesorDTO profesorDTO) throws Exception {

        try {
            System.out.print(profesorDTO.getCodigoUsuario());
            // Buscar Profesor
            Optional<Profesor> profesorOptional = profesorRepository.findById(profesorDTO.getCodigoProfesor());
            if (!profesorOptional.isPresent()) {
                throw new RuntimeException("El Profesor con código " + profesorDTO.getCodigoProfesor() + " no existe.");
            }

            // Verificar existencia de Sede y Cargo
            Sede sede = sedeRepository.findById(profesorDTO.getSede())
                    .orElseThrow(() -> new Exception("La sede con el código " + profesorDTO.getSede() + " no existe."));
            Cargo cargo = cargoRepository.findById(profesorDTO.getCargo())
                    .orElseThrow(() -> new Exception("El cargo con el código " + profesorDTO.getCargo() + " no existe."));

            // Validaciones de campos
            if (!telefonoEsValido(profesorDTO.getTelefono())) {
                throw new IllegalArgumentException("El teléfono debe tener 9 dígitos");
            }
            if (!correoEsValido(profesorDTO.getCorreo())) {
                throw new IllegalArgumentException("El correo no tiene un formato válido");
            }
            if (profesorDTO.getEdad() < 18) {
                throw new IllegalArgumentException("La edad no es permitida");
            }
            validarDocumento(profesorDTO);
            Profesor profesor = profesorOptional.get();
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
            profesor.setUsuario(profesorDTO.getCodigoUsuario());
            profesor.setSede(sede);
            profesor.setCargo(cargo);
            profesor.setUsuarioActualizacion(profesorDTO.getUsuarioActualizacion());
            System.out.print(profesor);
            // Verificar si el teléfono, DNI y correo ya existen antes de actualizarlos
            if (!profesor.getTelefono().equals(profesorDTO.getTelefono()) && ExistePorTelefono(profesorDTO.getTelefono())) {
                throw new IllegalArgumentException("El teléfono ya existe");
            }
            if (!profesor.getDni().equals(profesorDTO.getDni()) && ExistePorDNI(profesorDTO.getDni())) {
                throw new IllegalArgumentException("El DNI ya existe");
            }
            if (!profesor.getCorreo().equals(profesorDTO.getCorreo()) && ExistePorEmail(profesorDTO.getCorreo())) {
                throw new IllegalArgumentException("El correo ya existe");
            }

            // Verificar y actualizar el login
            Login login = loginRepository.findById(profesorDTO.getCodigoUsuario())
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + profesorDTO.getCodigoUsuario() + " no existe."));

            if (!login.getUsername().equals(profesorDTO.getUsername()) && usuarioService.usuarioExistePorUsername(profesorDTO.getUsername())) {
                throw new IllegalArgumentException("El usuario ya existe");
            }
            if (!login.getCorreo().equals(profesorDTO.getCorreo()) && ExistePorEmail(profesorDTO.getCorreo())) {
                throw new IllegalArgumentException("El correo ya existe");
            }

            login.setUsername(profesorDTO.getUsername());
            login.setCorreo(profesorDTO.getCorreo());
            loginRepository.save(login);
            Usuario usuario = usuarioRepository.findById(profesorDTO.getCodigoUsuario())
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + profesorDTO.getCodigoUsuario() + " no existe."));
            usuario.setUsername(profesorDTO.getUsername());
            usuarioRepository.save(usuario);

            // Guardar y retornar el profesor actualizado
            return profesorRepository.save(profesor);

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Ocurrió un error al actualizar el profesor: " + e.getMessage(), e);
        }
    }



    public List<Profesor> findAdminsByEstadoTrue() {
        return profesorRepository.findByEstadoTrue();
    }


    public List<Profesor> findAdminsByEstadoFalse() {
        return profesorRepository.findByEstadoFalse();
    }


    public Profesor desactivar(String usuarioCodigo) {
        Optional<Profesor> adminExistenteOpt = profesorRepository.findById(usuarioCodigo);

        if (adminExistenteOpt.isPresent()) {
            Profesor profesor = adminExistenteOpt.get();

            Optional<Usuario> usuario = usuarioRepository.findById(profesor.getUsuario().getCodigo());

            if (usuario.isPresent()) {
                Usuario usuarioEntity = usuario.get();
                usuarioEntity.setEstado(false);
                usuarioRepository.save(usuarioEntity);
            }


            Optional<Login> login = loginRepository.findById(profesor.getUsuario().getCodigo());

            if (login.isPresent()) {
                Login loginEntity = login.get();
                loginEntity.setEstado(false);
                loginRepository.save(loginEntity);
            }

            profesor.setEstado(false);

            return profesorRepository.save(profesor);
        } else {
            throw new RuntimeException("Admin no encontrado con el código: " + usuarioCodigo);
        }
    }


    public Profesor activar(String usuarioCodigo) {
        Optional<Profesor> adminExistenteOpt = profesorRepository.findById(usuarioCodigo);

        if (adminExistenteOpt.isPresent()) {
            Profesor profesor = adminExistenteOpt.get();

            Optional<Usuario> usuario = usuarioRepository.findById(profesor.getUsuario().getCodigo());

            if (usuario.isPresent()) {
                Usuario usuarioEntity = usuario.get();
                usuarioEntity.setEstado(true);
                usuarioRepository.save(usuarioEntity);
            }


            Optional<Login> login = loginRepository.findById(profesor.getUsuario().getCodigo());

            if (login.isPresent()) {
                Login loginEntity = login.get();
                loginEntity.setEstado(true);
                loginRepository.save(loginEntity);
            }

            profesor.setEstado(true);

            return profesorRepository.save(profesor);
        } else {
            throw new RuntimeException("Admin no encontrado con el código: " + usuarioCodigo);
        }
    }



    public String obtenerUltimoCodigoProfesor() {
        return profesorRepository.obtenerUltimoCodigoProfesor();
    }


    public String ObtenerUltimoCodigoUsuario() {
        return profesorRepository.obtenerUltimoCodigoUsuario();
    }



    public boolean telefonoEsValido(String telefono) {
        return telefono != null && telefono.matches("\\d{9}");
    }


    public boolean correoEsValido(String correo) {
        // Verificar que el correo tenga el formato estándar
        return correo != null && correo.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }


    public boolean dniEsValido(String dni) {
        // Verificar que el DNI tenga exactamente 8 dígitos
        return dni != null && dni.matches("\\d{8}");
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


    private boolean validarProfesor(ProfesorDTO profesorDTO) {


        if (usuarioService.usuarioExistePorUsername(profesorDTO.getUsername())) {
            throw new IllegalArgumentException("USUARIO YA EXISTE");
        }
        if (ExistePorEmail(profesorDTO.getCorreo())) {
            throw new IllegalArgumentException("CORREO YA EXISTE");
        }
        if (ExistePorDNI(profesorDTO.getDni())) {
            throw new IllegalArgumentException("DNI YA EXISTE");
        }
        if (ExistePorTelefono(profesorDTO.getTelefono())) {
            throw new IllegalArgumentException("TELEFONO YA EXISTE");
        }
        if (!telefonoEsValido(profesorDTO.getTelefono())) {
            throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
        }

        if (!correoEsValido(profesorDTO.getCorreo())) {
            throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
        }


        if (profesorDTO.getEdad() < 18) {
            throw new IllegalArgumentException("EDAD NO PERMITIDA");
        }
        return ResponseEntity.ok("Validación exitosa").hasBody();
    }


    public void validarDocumento(ProfesorDTO profesorDTO) {

        String pais = profesorDTO.getNacionalidad();
        String numeroDoc = profesorDTO.getDni();

        switch (profesorDTO.getTipoDoc()) {
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
                if (profesorDTO.getDni() == null || profesorDTO.getDni().length() != 8) {
                    throw new IllegalArgumentException("El DNI no es válido. Debe tener 8 dígitos.");
                }
                break;
            default:
                throw new IllegalArgumentException("El tipo de documento no es válido. Debe ser CE (Carné de Extranjería) o PS (Pasaporte).");
        }

    }



    public List<Profesor> registrarProfesores(List<ProfesorDTO> profesorDTOs) throws Exception {
        List<Profesor> profesoresGuardados = new ArrayList<>();
        System.out.print(profesoresGuardados);

        try {
            for (ProfesorDTO profesorDTO : profesorDTOs) {
                // Validaciones
                validarDocumento(profesorDTO);
                validarProfesor(profesorDTO);

                // Obtener Sede y Cargo
                Optional<Sede> sedeExistente = sedeRepository.findById(profesorDTO.getSede());
                Sede sede = sedeExistente.orElseThrow(() -> new Exception("La sede con el código " + profesorDTO.getSede() + " no existe."));

                Optional<Cargo> cargoExistente = cargoRepository.findById(profesorDTO.getCargo());
                Cargo cargo = cargoExistente.orElseThrow(() -> new Exception("El cargo con el código " + profesorDTO.getCargo() + " no existe."));

                // Generar códigos
                String ultimoCodigo = obtenerUltimoCodigoProfesor();
                String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
                String ultimoCodigoUsuario = ObtenerUltimoCodigoUsuario();
                String nuevoCodigoUsuario = Utilitarios.incrementarSecuencia(ultimoCodigoUsuario);

                // Crear Login
                Login login = new Login();
                login.setUl_codigo(nuevoCodigoUsuario);
                login.setUsername(profesorDTO.getUsername());
                login.setPassword(this.bCryptPasswordEncoder.encode(profesorDTO.getPassword()));
                login.setCorreo(profesorDTO.getCorreo());
                login.setUl_rol("PROFESOR");
                login.setEstado(true);

                // Crear Usuario
                Usuario usuario = new Usuario();
                usuario.setCodigo(nuevoCodigoUsuario);
                usuario.setUsername(profesorDTO.getUsername());
                usuario.setPassword(profesorDTO.getPassword());
                usuario.setFechaCreacion(LocalDate.now());
                usuario.setHoraCreacion(LocalTime.now());
                usuario.setEstado(true);
                usuario.setRol("0002");

                // Crear Profesor
                Profesor profesor = new Profesor();
                profesor.setCodigo(nuevoCodigo);
                profesor.setPrimerNombre(profesorDTO.getPrimerNombre());
                profesor.setSegundoNombre(profesorDTO.getSegundoNombre());
                profesor.setApellidoPaterno(profesorDTO.getApellidoPaterno());
                profesor.setApellidoMaterno(profesorDTO.getApellidoMaterno());
                profesor.setCorreo(profesorDTO.getCorreo());
                profesor.setTipo(profesorDTO.getTipoDoc());
                profesor.setDni(profesorDTO.getDni());
                profesor.setDireccion(profesorDTO.getDireccion());
                profesor.setTelefono(profesorDTO.getTelefono());
                profesor.setEdad(profesorDTO.getEdad());
                profesor.setFechaNacimiento(profesorDTO.getNacimiento());
                profesor.setNacionalidad(profesorDTO.getNacionalidad());
                profesor.setFechaCreacion(LocalDate.now());
                profesor.setHoraCreacion(LocalTime.now());
                profesor.setEstado(true);
                profesor.setGenero(profesorDTO.getGenero());
                profesor.setUsuario(nuevoCodigoUsuario);
                profesor.setSede(sede);
                profesor.setCargo(cargo);
                profesor.setUsuarioCreacion(profesorDTO.getUsuarioCreacion());

                // Guardar los objetos
                loginRepository.save(login);
                usuarioRepository.save(usuario);
                Profesor profesorGuardado = profesorRepository.save(profesor);
                profesoresGuardados.add(profesorGuardado);
            }
        } catch (Exception e) {
            throw new Exception("Error al registrar los profesores: " + e.getMessage(), e);
        }

        return profesoresGuardados;
    }


    public List<Profesor> listar() {
        return profesorRepository.findAll();
    }


    public List<Profesor> getAdminsByUsuarioCodigo(String usuarioCodigo) {
        return profesorRepository.findByUsuario_Codigo(usuarioCodigo);
    }


    public Profesor actualizarImagen(String codigoUsuario, String codigoAdmin, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String direccion, MultipartFile archivo) throws IOException {
        Optional<Profesor> adminExistenteOpt = profesorRepository.findById(codigoAdmin);
        System.out.print(codigoUsuario);
        System.out.print(codigoAdmin);
        System.out.print(adminExistenteOpt.isPresent());
        if (!adminExistenteOpt.isPresent()) {
            throw new RuntimeException("El Profesor con codigo " + adminExistenteOpt.get() + " no existe.");
        }
        try {

            if (!telefonoEsValido(telefono)) {
                throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
            }
            if (!correoEsValido(email)) {
                throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
            }

            // Si existe, obtenemos el Admin y lo actualizamos
            Profesor profesor = adminExistenteOpt.get();

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
                profesor.setPerfil(profesor.getPerfil());
                ;
            } else {
                profesor.setPerfil(archivo.getBytes());
            }
            if (!profesor.getTelefono().equals(telefono)) {
                if (ExistePorTelefono(telefono)) {
                    throw new IllegalArgumentException("TELEFONO YA EXISTE");
                }
            }


            Login login = loginRepository.findById(codigoUsuario)
                    .orElseThrow(() -> new RuntimeException("El usuario con código " + codigoUsuario + " no existe."));

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
            return profesorRepository.save(profesor);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    public List<Profesor> findByTelefono(String telefono) {
        return profesorRepository.findByTelefono(telefono);
    }


    public List<Profesor> findByDni(String dni) {
        return profesorRepository.findByDni(dni);
    }


    public List<Profesor> findByCorreo(String correo) {
        return profesorRepository.findByCorreo(correo);
    }


    public List<Profesor> findByNacionalidad(String nacionalidad) {
        return profesorRepository.findByNacionalidad(nacionalidad);
    }


    public List<Profesor> findByEdad(String edad) {
        return profesorRepository.findByEdad(edad);
    }


    public List<Profesor> findByApellidoPaterno(String apellidoPaterno) {
        return profesorRepository.findByApellidoPaterno(apellidoPaterno);
    }


    public List<Profesor> findByPrimerNombre(String primerNombre) {
        return profesorRepository.findByPrimerNombre(primerNombre);
    }

    private String convertirArchivoABase64(MultipartFile archivo) throws IOException {
        byte[] contenido = archivo.getBytes();
        return Base64.getEncoder().encodeToString(contenido);
    }

}