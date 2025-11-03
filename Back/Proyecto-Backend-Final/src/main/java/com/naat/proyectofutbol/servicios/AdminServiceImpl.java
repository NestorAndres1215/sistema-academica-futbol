package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.AdminDTO;


import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.Usuario;
import com.naat.proyectofutbol.modelo.Login;
import com.naat.proyectofutbol.repositorios.AdminRepository;
import com.naat.proyectofutbol.repositorios.LoginRepository;
import com.naat.proyectofutbol.repositorios.UsuarioRepository;
import com.naat.proyectofutbol.util.Utilitarios;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UsuarioService usuarioService;

    @Override
    public List<Admin> getAdminsByUsuarioCodigo(String usuarioCodigo) {
        return adminRepository.findByUsuario_Codigo(usuarioCodigo);
    }

    @Override
    public List<Admin> listarAdmin() {
        return adminRepository.findAll();
    }

    @Override
    public Admin guardarAdmin(AdminDTO admin) throws Exception {

        validarAdmin(admin);

        String ultimoCodigo = obtenerUltimoCodigoUsuario();

        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        String AdminCodigo = ObtenerUltimoCodigoAdmin();
        String nuevoCodigoAdmin = Utilitarios.incrementarSecuencia(AdminCodigo);

        Login login = new Login();
        login.setUl_codigo(nuevoCodigo);
        login.setUsername(admin.getUsername());
        login.setPassword(this.bCryptPasswordEncoder.encode(admin.getPassword()));
        login.setCorreo(admin.getCorreo());
        login.setUl_rol("ADMINISTRADOR");
        login.setEstado(true);

        Usuario usuario = new Usuario();
        usuario.setCodigo(nuevoCodigo);
        usuario.setUsername(admin.getUsername());
        usuario.setPassword(admin.getPassword());
        usuario.setFechaCreacion(LocalDate.now());
        usuario.setHoraCreacion(LocalTime.now());
        usuario.setEstado(true);
        usuario.setRol("0001");


        Admin administrador = new Admin();
        administrador.setCodigo(nuevoCodigoAdmin);
        administrador.setPrimerNombre(admin.getPrimerNombre());
        administrador.setSegundoNombre(admin.getSegundoNombre());
        administrador.setApellidoPaterno(admin.getApellidoPaterno());
        administrador.setApellidoMaterno(admin.getApellidoMaterno());
        administrador.setCorreo(admin.getCorreo());
        administrador.setCorreo(admin.getCorreo());
        administrador.setDni(admin.getDni());
        administrador.setDireccion(admin.getDireccion());
        administrador.setTelefono(admin.getTelefono());
        administrador.setEdad(admin.getEdad());
        administrador.setFechaNacimiento(admin.getFechaNacimiento());
        administrador.setNacionalidad(admin.getNacionalidad());
        administrador.setFechaCreacion(LocalDate.now());
        administrador.setHoraCreacion(LocalTime.now());
        administrador.setEstado(true);
        administrador.setUsuario(nuevoCodigo);
        administrador.setUsuarioCreacion(admin.getUsuarioCreacion());

        loginRepository.save(login);
        usuarioRepository.save(usuario);

        return adminRepository.save(administrador);
    }

    @Override
    public Admin actualizarAdmin(AdminDTO admin) {

        Optional<Admin> adminExistenteOpt = adminRepository.findById(admin.getCodigoAdmin());

        if (!adminExistenteOpt.isPresent()) {
            throw new RuntimeException("El Admin con codigo " + admin.getCodigoAdmin() + " no existe.");
        }
        if (!telefonoEsValido(admin.getTelefono())) {
            throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
        }
        if (!correoEsValido(admin.getCorreo())) {
            throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
        }

        if (!dniEsValido(admin.getDni())) {
            throw new IllegalArgumentException("EL DNI DEBE TENER 8 DIGITOS");
        }
        if (admin.getEdad() < 5) {
            throw new IllegalArgumentException("EDAD NO PERMITIDA");
        }

        Admin administrador = adminExistenteOpt.get();

        administrador.setPrimerNombre(admin.getPrimerNombre());
        administrador.setSegundoNombre(admin.getSegundoNombre());
        administrador.setApellidoPaterno(admin.getApellidoPaterno());
        administrador.setApellidoMaterno(admin.getApellidoMaterno());
        administrador.setCorreo(admin.getCorreo());
        administrador.setDni(admin.getDni());
        administrador.setDireccion(admin.getDireccion());
        administrador.setTelefono(admin.getTelefono());
        administrador.setEdad(admin.getEdad());
        administrador.setFechaNacimiento(admin.getFechaNacimiento());
        administrador.setNacionalidad(admin.getNacionalidad());
        administrador.setFechaActualizacion(LocalDate.now());
        administrador.setHoraActualizacion(LocalTime.now());
        administrador.setUsuario(admin.getCodigoUsuario());
        administrador.setUsuarioCreacion(admin.getUsuarioCreacion());

        if (!administrador.getTelefono().equals(admin.getTelefono())) {
            if (ExistePorTelefono(admin.getTelefono())) {
                throw new IllegalArgumentException("TELEFONO YA EXISTE");
            }
        }
        if (!administrador.getDni().equals(admin.getDni())) {
            if (ExistePorDNI(admin.getDni())) {
                throw new IllegalArgumentException("DNI YA EXISTE");
            }
        }

        Login login = loginRepository.findById(admin.getCodigoUsuario())
                .orElseThrow(() -> new RuntimeException("El usuario con código " + admin.getCodigoUsuario() + " no existe."));

        if (!login.getUsername().equals(admin.getUsername())) {
            if (usuarioService.usuarioExistePorUsername(admin.getUsername())) {
                throw new IllegalArgumentException("USUARIO YA EXISTE");
            }
        }
        if (!login.getCorreo().equals(admin.getCorreo())) {
            if (ExistePorEmail(admin.getCorreo())) {
                throw new IllegalArgumentException("CORREO YA EXISTE");
            }
        }
        login.setUsername(admin.getUsername());
        login.setCorreo(admin.getCorreo());

        Usuario usuario = usuarioRepository.findById(admin.getCodigoUsuario())
                .orElseThrow(() -> new RuntimeException("El usuario con código " + admin.getCodigoUsuario() + " no existe."));
        usuario.setUsername(admin.getUsername());

        loginRepository.save(login);
        usuarioRepository.save(usuario);
        return adminRepository.save(administrador);
    }


    @Override
    public String obtenerUltimoCodigoUsuario() {
        return adminRepository.obtenerUltimoCodigo();
    }

    @Override
    public String ObtenerUltimoCodigoAdmin() {
        return adminRepository.obtenerUltimoCodigoAdmin();
    }

    @Override
    public boolean ExistePorEmail(String email) {
        return adminRepository.existsByCorreo(email);
    }

    @Override
    public boolean ExistePorTelefono(String telefono) {
        return adminRepository.existsByTelefono(telefono);
    }

    @Override
    public boolean ExistePorDNI(String dni) {
        return adminRepository.existsByDni(dni);
    }

    @Override
    public boolean telefonoEsValido(String telefono) {
        return telefono != null && telefono.matches("\\d{9}");
    }

    @Override
    public boolean correoEsValido(String correo) {
        return correo != null && correo.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }

    @Override
    public boolean dniEsValido(String dni) {

        return dni != null && dni.matches("\\d{8}");
    }

    private String convertirArchivoABase64(MultipartFile archivo) throws IOException {
        byte[] contenido = archivo.getBytes();
        return Base64.getEncoder().encodeToString(contenido);
    }

    private String convertirArchivoAString(MultipartFile archivo) throws IOException {
        byte[] contenido = archivo.getBytes();
        return new String(contenido, StandardCharsets.UTF_8);
    }

    @Override
    public Admin actualizarImagen(String codigoUsuario, String codigoAdmin, String contra, String username, String primerNombre, String segundoNombre,
                                  String apellidoPaterno, String apellidoMaterno, String telefono, String email, String dni,
                                  String direccion, LocalDate nacimiento, String nacionalidad, int edad, MultipartFile archivo) throws IOException {


        Optional<Admin> adminExistenteOpt = adminRepository.findById(codigoAdmin);
        if (!adminExistenteOpt.isPresent()) {
            throw new RuntimeException("El Admin con codigo " + codigoAdmin + " no existe.");
        }
        if (!telefonoEsValido(telefono)) {
            throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
        }
        if (!correoEsValido(email)) {
            throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
        }

        if (!dniEsValido(dni)) {
            throw new IllegalArgumentException("EL DNI DEBE TENER 8 DIGITOS");
        }
        if (edad < 5) {
            throw new IllegalArgumentException("EDAD NO PERMITIDA");
        }

        Admin administrador = adminExistenteOpt.get();

        // Actualizar los campos con los nuevos valores
        administrador.setPrimerNombre(primerNombre);
        administrador.setSegundoNombre(segundoNombre);
        administrador.setApellidoPaterno(apellidoPaterno);
        administrador.setApellidoMaterno(apellidoMaterno);
        administrador.setCorreo(email);
        administrador.setDni(dni);
        administrador.setDireccion(direccion);
        administrador.setTelefono(telefono);
        administrador.setEdad(edad);
        administrador.setFechaNacimiento(nacimiento);
        administrador.setNacionalidad(nacionalidad);
        administrador.setFechaActualizacion(LocalDate.now());
        administrador.setHoraActualizacion(LocalTime.now());

        administrador.setUsuario(codigoUsuario);

        String archivoBase64 = convertirArchivoABase64(archivo);

        if (archivoBase64.isEmpty()) {
            administrador.setPerfil(administrador.getPerfil());
            ;
        } else {
            administrador.setPerfil(archivo.getBytes());
        }
        if (!administrador.getTelefono().equals(telefono)) {
            if (ExistePorTelefono(telefono)) {
                throw new IllegalArgumentException("TELEFONO YA EXISTE");
            }
        }
        if (!administrador.getDni().equals(dni)) {
            if (ExistePorDNI(dni)) {
                throw new IllegalArgumentException("DNI YA EXISTE");
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
        login.setPassword(this.bCryptPasswordEncoder.encode(contra));
        Usuario usuario = usuarioRepository.findById(codigoUsuario)
                .orElseThrow(() -> new RuntimeException("El usuario con código " + codigoUsuario + " no existe."));
        usuario.setUsername(username);
        usuario.setPassword(contra);
        loginRepository.save(login);
        usuarioRepository.save(usuario);
        return adminRepository.save(administrador);
    }


    private boolean validarAdmin(AdminDTO admin) {


        if (usuarioService.usuarioExistePorUsername(admin.getUsername())) {
            throw new IllegalArgumentException("USUARIO YA EXISTE");
        }
        if (ExistePorEmail(admin.getCorreo())) {
            throw new IllegalArgumentException("CORREO YA EXISTE");
        }
        if (ExistePorDNI(admin.getDni())) {
            throw new IllegalArgumentException("DNI YA EXISTE");
        }
        if (ExistePorTelefono(admin.getTelefono())) {
            throw new IllegalArgumentException("TELEFONO YA EXISTE");
        }
        if (!telefonoEsValido(admin.getTelefono())) {
            throw new IllegalArgumentException("EL TELEFONO DEBE TENER 9 DIGITOS");
        }

        if (!correoEsValido(admin.getCorreo())) {
            throw new IllegalArgumentException("EL CORREO NO TIENEN FORMATO VALIDO");
        }

        if (!dniEsValido(admin.getDni())) {
            throw new IllegalArgumentException("EL DNI DEBE TENER 8 DIGITOS");
        }
        if (admin.getEdad() < 5) {
            throw new IllegalArgumentException("EDAD NO PERMITIDA");
        }
        return ResponseEntity.ok("Validación exitosa").hasBody();
    }

    @Override
    public List<Admin> findAdminsByEstadoTrue() {
        return adminRepository.findByEstadoTrue();
    }

    @Override
    public List<Admin> findAdminsByEstadoFalse() {
        return adminRepository.findByEstadoFalse();
    }

    @Override
    public List<Admin> findByCorreo(String correo) {
        return adminRepository.findByCorreo(correo);
    }

    @Override
    public List<Admin> findByDni(String dni) {
        return adminRepository.findByDni(dni);
    }

    @Override
    public List<Admin> findByApellidoPaterno(String apellidoPaterno) {
        return adminRepository.findByApellidoPaterno(apellidoPaterno);
    }

    @Override
    public List<Admin> findByPrimerNombre(String primerNombre) {
        return adminRepository.findByPrimerNombre(primerNombre);
    }

    @Override
    public List<Admin> findByTelefono(String telefono) {
        return adminRepository.findByTelefono(telefono);
    }

    @Override
    public Admin desactivarUsuario(String usuarioCodigo) {

        Optional<Admin> adminExistenteOpt = adminRepository.findById(usuarioCodigo);

        if (adminExistenteOpt.isPresent()) {
            Admin administrador = adminExistenteOpt.get();

            Optional<Usuario> usuario = usuarioRepository.findById(administrador.getUsuario().getCodigo());

            if (usuario.isPresent()) {
                Usuario usuarioEntity = usuario.get();
                usuarioEntity.setEstado(false);
                usuarioRepository.save(usuarioEntity);
            }

            Optional<Login> login = loginRepository.findById(administrador.getUsuario().getCodigo());

            if (login.isPresent()) {
                Login loginEntity = login.get();
                loginEntity.setEstado(false);
                loginRepository.save(loginEntity);
            }

            administrador.setEstado(false);
            return adminRepository.save(administrador);
        } else {
            throw new RuntimeException("Admin no encontrado con el código: " + usuarioCodigo);
        }
    }

    @Override
    public Admin activarUsuario(String usuarioCodigo) {

        Optional<Admin> adminExistenteOpt = adminRepository.findById(usuarioCodigo);

        if (adminExistenteOpt.isPresent()) {
            Admin administrador = adminExistenteOpt.get();

            Optional<Usuario> usuario = usuarioRepository.findById(administrador.getUsuario().getCodigo());

            if (usuario.isPresent()) {

                Usuario usuarioEntity = usuario.get();
                usuarioEntity.setEstado(true);
                usuarioRepository.save(usuarioEntity);
            }

            Optional<Login> login = loginRepository.findById(administrador.getUsuario().getCodigo());

            if (login.isPresent()) {

                Login loginEntity = login.get();
                loginEntity.setEstado(true);
                loginRepository.save(loginEntity);
            }

            administrador.setEstado(true);
            return adminRepository.save(administrador);
        } else {
            throw new RuntimeException("Admin no encontrado con el código: " + usuarioCodigo);
        }
    }

}
