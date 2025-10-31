package com.naat.proyectofutbol.entidades;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

@Entity
@Table(name = "estudiante")
public class Estudiante {
    @Id
    @Column(name = "es_codigo")
    private String codigo;

    @Column(name="es_primernombre")
    private String primerNombre;

    @Column(name="es_segundonombre")
    private  String segundoNombre;

    @Column(name = "es_apellidopaterno")
    private  String apellidoPaterno;

    @Column(name = "es_apellidomaterno")
    private  String apellidoMaterno;

    @Column(name = "es_telefono")
    private  String telefono;

    @Column(name = "es_genero")
    private  String genero;

    @Column(name = "es_dni")
    private  String dni;

    @Column(name = "es_direccion")
    private  String direccion;

    @Column(name = "es_correo")
    private  String correo;

    @Column(name = "es_edad")
    private  int edad;
    @Column(name = "es_tipodocumento")
    private String tipo;
    @Column(name = "es_fechanacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "es_nacionalidad")
    private String nacionalidad;

    @Column(name = "es_estado")
    private boolean estado;

    @Column(name = "es_perfil")
    @Lob
    private byte[] perfil;

    @Column(name = "es_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "es_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "es_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "es_horaactualizacion")
    private LocalTime horaActualizacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "es_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "es_sede", referencedColumnName = "se_codigo")
    private Sede sede;

    @Column(name = "es_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "es_usuarioactualizacion")
    private String usuarioActualizacion;

    @Override
    public String toString() {
        return "Estudiante{" +
                "codigo='" + codigo + '\'' +
                ", primerNombre='" + primerNombre + '\'' +
                ", segundoNombre='" + segundoNombre + '\'' +
                ", apellidoPaterno='" + apellidoPaterno + '\'' +
                ", apellidoMaterno='" + apellidoMaterno + '\'' +
                ", telefono='" + telefono + '\'' +
                ", genero='" + genero + '\'' +
                ", dni='" + dni + '\'' +
                ", direccion='" + direccion + '\'' +
                ", correo='" + correo + '\'' +
                ", edad=" + edad +
                ", tipo='" + tipo + '\'' +
                ", fechaNacimiento=" + fechaNacimiento +
                ", nacionalidad='" + nacionalidad + '\'' +
                ", estado=" + estado +
                ", perfil=" + Arrays.toString(perfil) +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", usuario=" + usuario +
                ", sede=" + sede +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                '}';
    }

    public Estudiante() {
    }

    public Estudiante(String codigo, String primerNombre, String segundoNombre, String apellidoPaterno, String apellidoMaterno, String telefono, String genero, String dni, String direccion, String correo, int edad, String tipo, LocalDate fechaNacimiento, String nacionalidad, boolean estado, byte[] perfil, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, Usuario usuario, Sede sede, String usuarioCreacion, String usuarioActualizacion) {
        this.codigo = codigo;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.telefono = telefono;
        this.genero = genero;
        this.dni = dni;
        this.direccion = direccion;
        this.correo = correo;
        this.edad = edad;
        this.tipo = tipo;
        this.fechaNacimiento = fechaNacimiento;
        this.nacionalidad = nacionalidad;
        this.estado = estado;
        this.perfil = perfil;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.usuario = usuario;
        this.sede = sede;
        this.usuarioCreacion = usuarioCreacion;
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
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

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
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

    public Sede getSede() {
        return sede;
    }

    public void setSede(Sede sede) {
        this.sede = sede;
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
}
