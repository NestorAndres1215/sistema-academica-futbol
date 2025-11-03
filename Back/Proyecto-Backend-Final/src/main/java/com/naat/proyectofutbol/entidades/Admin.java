package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Date;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @Column(name = "ad_codigo")
    private String codigo;

    @Column(name = "ad_primernombre")
    private String primerNombre;

    @Column(name = "ad_segundonombre")
    private String segundoNombre;

    @Column(name = "ad_apellidopaterno")
    private String apellidoPaterno;

    @Column(name = "ad_apellidomaterno")
    private String apellidoMaterno;

    @Column(name = "ad_correo")
    private String correo;

    @Column(name = "ad_telefono")
    private String telefono;

    @Column(name = "ad_dni")
    private String dni;

    @Column(name = "ad_direccion")
    private String direccion;

    @Column(name = "ad_edad")
    private int edad;

    @Column(name = "ad_fechanacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "ad_nacionalidad")
    private String nacionalidad;

    @Column(name = "ad_estado")
    private boolean estado;

    @Lob
    @Column(name = "ad_perfil")
    private byte[] perfil;

    @Column(name = "ad_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "ad_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "ad_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "ad_usuarioactualizacion")
    private String usuarioActualizacion;
    @Column(name = "ad_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "ad_horaactualizacion")
    private LocalTime horaActualizacion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ad_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario;


    public Admin() {
    }

    public Admin(String codigo, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String correo, String telefono, String dni, String direccion, int edad, LocalDate fechaNacimiento, String nacionalidad, boolean estado, byte[] perfil, String usuarioCreacion, LocalDate fechaCreacion, LocalTime horaCreacion, String usuarioActualizacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, Usuario usuario) {
        this.codigo = codigo;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.correo = correo;
        this.telefono = telefono;
        this.dni = dni;
        this.direccion = direccion;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.nacionalidad = nacionalidad;
        this.estado = estado;
        this.perfil = perfil;
        this.usuarioCreacion = usuarioCreacion;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.usuarioActualizacion = usuarioActualizacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.usuario = usuario;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return segundoNombre;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }


    public String getNacionalidad() {
        return nacionalidad;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public byte[] getPerfil() {
        return perfil;
    }

    public void setPerfil(byte[] perfil) {
        this.perfil = perfil;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalTime getHoraCreacion() {
        return horaCreacion;
    }

    public void setHoraCreacion(LocalTime horaCreacion) {
        this.horaCreacion = horaCreacion;
    }

    public LocalDate getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDate fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public LocalTime getHoraActualizacion() {
        return horaActualizacion;
    }

    public void setHoraActualizacion(LocalTime horaActualizacion) {
        this.horaActualizacion = horaActualizacion;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(String codigoUsuario) {
        if (codigoUsuario != null) {
            Usuario usuario = new Usuario();  // Crear un objeto Usuario
            usuario.setCodigo(codigoUsuario); // Asignar el código al usuario
            this.usuario = usuario;           // Asignarlo al administrador
        }
    }
}
