package com.naat.proyectofutbol.entidades;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

@Entity
@Table(name = "profesor")
@AllArgsConstructor
@NoArgsConstructor
public class Profesor {
    @Id
    @Column(name = "pr_codigo")
    private String codigo;
    @Column(name = "pr_primernombre")
    private String primerNombre;
    @Column(name = "pr_segundonombre")
    private String segundoNombre;
    @Column(name = "pr_apellidopaterno")
    private String apellidoPaterno;
    @Column(name = "pr_apellidomaterno")
    private String apellidoMaterno;
    @Column(name = "pr_telefono")
    private String telefono;
    @Column(name = "pr_genero")
    private String genero;
    @Column(name = "pr_dni")
    private String dni;
    @Column(name = "pr_tipodoc")
    private String tipo;
    @Column(name = "pr_direccion")
    private String direccion;
    @Column(name = "pr_correo")
    private String correo;
    @Column(name = "pr_edad")
    private int edad;
    @Column(name = "pr_fechanacimiento")
    private LocalDate fechaNacimiento;
    @Column(name = "pr_nacionalidad")
    private String nacionalidad;
    @Column(name = "pr_estado")
    private boolean estado;
    @Column(name = "pr_perfil")
    @Lob
    private byte[] perfil;
    @Column(name = "pr_fechacreacion")
    private LocalDate fechaCreacion;
    @Column(name = "pr_horacreacion")
    private LocalTime horaCreacion;
    @Column(name = "pr_fechaactualizacion")
    private LocalDate fechaActualizacion;
    @Column(name = "pr_horaactualizacion")
    private LocalTime horaActualizacion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pr_cargo", referencedColumnName = "cg_codigo")
    private Cargo cargo;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pr_usuario", referencedColumnName = "us_codigo")
    private Usuario usuario;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pr_sede", referencedColumnName = "se_codigo")
    private Sede sede;
    @Column(name = "pr_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "pr_usuarioactualizacion")
    private String usuarioActualizacion;


    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
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

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
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

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }


}
