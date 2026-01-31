package com.naat.proyectofutbol.service.impl;


import com.naat.proyectofutbol.constants.GlobalErrorMessages;
import com.naat.proyectofutbol.constants.NotFoundMessages;
import com.naat.proyectofutbol.constants.Roles;
import com.naat.proyectofutbol.dto.request.AdminRequest;
import com.naat.proyectofutbol.exception.BadRequestException;
import com.naat.proyectofutbol.exception.ResourceAlreadyExistsException;
import com.naat.proyectofutbol.exception.ResourceNotFoundException;
import com.naat.proyectofutbol.model.Admin;
import com.naat.proyectofutbol.model.Usuario;
import com.naat.proyectofutbol.repository.AdminRepository;
import com.naat.proyectofutbol.repository.UsuarioRepository;
import com.naat.proyectofutbol.service.AdminService;
import com.naat.proyectofutbol.service.LoginService;
import com.naat.proyectofutbol.service.UsuarioService;
import com.naat.proyectofutbol.util.Utilitarios;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final LoginService loginService;

    @Override
    public String ObtenerUltimoCodigoAdmin() {
        return adminRepository.obtenerUltimoCodigoAdmin();
    }


    @Override
    public String obtenerUltimoCodigoUsuario() {
        return adminRepository.obtenerUltimoCodigo();
    }

    @Override
    public List<Admin> listarUsuarioCodigo(String usuarioCodigo) {
        return adminRepository.findByUsuario_Codigo(usuarioCodigo);
    }

    @Override
    public List<Admin> listarAdmin() {
        return adminRepository.findAll();
    }

    @Override
    public Admin guardarAdmin(AdminRequest admin) {

        validarAdmin(admin);

        String ultimoCodigo = obtenerUltimoCodigoUsuario();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        String AdminCodigo = ObtenerUltimoCodigoAdmin();
        String nuevoCodigoAdmin = Utilitarios.incrementarSecuencia(AdminCodigo);

        usuarioService.registrar(nuevoCodigo, admin.getUsername(), admin.getPassword(), Roles.CODIGO_ADMIN);
        loginService.registrar(nuevoCodigo, admin.getUsername(), admin.getPassword(), Roles.ROLE_ADMIN);

        Usuario usuario = usuarioRepository.findById(nuevoCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        Admin administrador = Admin.builder()
                .codigo(nuevoCodigoAdmin)
                .primerNombre(admin.getPrimerNombre())
                .segundoNombre(admin.getSegundoNombre())
                .apellidoPaterno(admin.getApellidoPaterno())
                .apellidoMaterno(admin.getApellidoMaterno())
                .correo(admin.getCorreo())
                .dni(admin.getDni())
                .direccion(admin.getDireccion())
                .telefono(admin.getTelefono())
                .edad(admin.getEdad())
                .fechaNacimiento(admin.getFechaNacimiento())
                .nacionalidad(admin.getNacionalidad())
                .fechaCreacion(LocalDate.now())
                .horaCreacion(LocalTime.now())
                .estado(true)
                .usuario(usuario)
                .usuarioCreacion(admin.getUsuarioCreacion())
                .build();

        return adminRepository.save(administrador);
    }

    @Override
    public Admin actualizarAdmin(AdminRequest admin) {

        Admin administrador = adminRepository.findById(admin.getCodigoAdmin())
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));

        validarActualizacion(administrador, administrador.getTelefono(), admin.getCorreo(), admin.getDni(), admin.getUsername());

        usuarioService.actualizar(admin.getCodigoUsuario(), admin.getUsername(), admin.getPassword(), Roles.CODIGO_ADMIN);
        loginService.actualizar(admin.getCodigoUsuario(), admin.getUsername(), admin.getPassword(), Roles.ROLE_ADMIN);


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

        if (admin.getCodigoUsuario() != null && (administrador.getUsuario() == null || !administrador.getUsuario().getCodigo().equals(admin.getCodigoUsuario()))) {

            Usuario usuario = usuarioRepository.findById(admin.getCodigoUsuario())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

            administrador.setUsuario(usuario);
        }

        return adminRepository.save(administrador);
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
    public Admin actualizarImagen(String codigoUsuario, String codigoAdmin, String contra, String username, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String email, String dni, String direccion, LocalDate nacimiento, String nacionalidad, int edad, MultipartFile archivo) {

        Admin admin = adminRepository.findById(codigoAdmin)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));


        validarActualizacion(admin, telefono, email, dni, username);
        usuarioService.actualizar(codigoUsuario, username, contra, Roles.CODIGO_ADMIN);
        loginService.actualizar(codigoUsuario, username, contra, Roles.ROLE_ADMIN);

        admin.setPrimerNombre(primerNombre);
        admin.setSegundoNombre(segundoNombre);
        admin.setApellidoPaterno(apellidoPaterno);
        admin.setApellidoMaterno(apellidoMaterno);
        admin.setCorreo(email);
        admin.setDni(dni);
        admin.setDireccion(direccion);
        admin.setTelefono(telefono);
        admin.setEdad(edad);
        admin.setFechaNacimiento(nacimiento);
        admin.setNacionalidad(nacionalidad);
        admin.setFechaActualizacion(LocalDate.now());
        admin.setHoraActualizacion(LocalTime.now());
        if (archivo != null && !archivo.isEmpty()) {
            try {
                admin.setPerfil(archivo.getBytes());
            } catch (IOException e) {
                throw new BadRequestException(GlobalErrorMessages.IMAGEN_ERROR);
            }
        }

        return adminRepository.save(admin);
    }


    private void validarAdmin(AdminRequest admin) {

        if (usuarioService.usuarioExistePorUsername(admin.getUsername())) {
            throw new ResourceAlreadyExistsException("El usuario ya existe");
        }

        if (ExistePorEmail(admin.getCorreo())) {
            throw new ResourceAlreadyExistsException("El correo ya existe");
        }

        if (ExistePorDNI(admin.getDni())) {
            throw new ResourceAlreadyExistsException("El DNI ya existe");
        }

        if (ExistePorTelefono(admin.getTelefono())) {
            throw new ResourceAlreadyExistsException("El teléfono ya existe");
        }
    }

    private void validarActualizacion(Admin admin,
                                      String telefono,
                                      String email,
                                      String dni,
                                      String username) {


        if (!admin.getTelefono().equals(telefono) && ExistePorTelefono(telefono)) {
            throw new IllegalArgumentException("TELEFONO YA EXISTE");
        }
        if (!admin.getDni().equals(dni) && ExistePorDNI(dni)) {
            throw new IllegalArgumentException("DNI YA EXISTE");
        }

        if (!admin.getCorreo().equals(email) && ExistePorEmail(email)) {
            throw new IllegalArgumentException("CORREO YA EXISTE");
        }
        if (!admin.getUsuario().getUsername().equals(username) &&
                usuarioService.usuarioExistePorUsername(username)) {
            throw new IllegalArgumentException("USUARIO YA EXISTE");
        }
    }


    @Override
    public Admin buscarPorCorreo(String correo) {
        return adminRepository.findByCorreo(correo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));
    }

    @Override
    public Admin buscarPorDni(String dni) {
        return adminRepository.findByDni(dni)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));
    }

    @Override
    public Admin buscarPorTelefono(String telefono) {
        return adminRepository.findByTelefono(telefono)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));
    }


    @Override
    public List<Admin> buscarPorPrimerNombre(String primerNombre) {
        return adminRepository.findByPrimerNombre(primerNombre);
    }

    @Override
    public List<Admin> buscarPorApellidoPaterno(String apellidoPaterno) {
        return adminRepository.findByApellidoPaterno(apellidoPaterno);
    }

    @Override
    public Admin desactivarUsuario(String usuarioCodigo) {

        Admin admin = adminRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));
        usuarioService.desactivarUsuario(admin.getUsuario().getCodigo());
        admin.setEstado(false);
        return adminRepository.save(admin);
    }

    @Override
    public Admin activarUsuario(String usuarioCodigo) {
        Admin admin = adminRepository.findById(usuarioCodigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ADMIN_NO_ENCONTRADO));

        usuarioService.activar(admin.getUsuario().getCodigo());
        admin.setEstado(true);
        return adminRepository.save(admin);
    }

    public boolean ExistePorEmail(String email) {
        return adminRepository.existsByCorreo(email);
    }

    public boolean ExistePorTelefono(String telefono) {
        return adminRepository.existsByTelefono(telefono);
    }

    public boolean ExistePorDNI(String dni) {
        return adminRepository.existsByDni(dni);
    }

}
