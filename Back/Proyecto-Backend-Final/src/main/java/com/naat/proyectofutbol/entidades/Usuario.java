package com.naat.proyectofutbol.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @Column(name = "us_codigo")
    private String codigo;  // Código único del usuario

    @Column(name = "us_usuario", nullable = false)
    private String username;  // Nombre completo del usuario



    @Column(name = "us_contra", nullable = false)
    private String password;  // Contraseña encriptada

    @Column(name = "us_estado", nullable = false)
    private boolean estado;  // Estado del usuario (activo/inactivo)

    @Column(name = "us_fechacreacion")
    private LocalDate fechaCreacion;  // Fecha de creación del usuario

    @Column(name = "us_horacreacion")

    private LocalTime horaCreacion;  // Hora de creación

    @Column(name = "us_fechaactualizacion")
    private LocalDate fechaActualizacion;  // Fecha de última actualización

    @Column(name = "us_horaactualizacion")
    private LocalTime horaActualizacion;  // Hora de última actualización

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "us_rol", referencedColumnName = "tr_codigo") // Relación con Rol
    @JsonIgnore
    private Rol rol;
    @Column(name = "us_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "us_usuarioactualizacion")
    private String usuarioActualizacion;

    public Usuario(String codigo, String username, String password, boolean estado, LocalDate fechaCreacion, LocalTime horaCreacion, LocalDate fechaActualizacion, LocalTime horaActualizacion, Rol rol, String usuarioCreacion, String usuarioActualizacion) {
        this.codigo = codigo;
        this.username = username;
        this.password = password;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.horaCreacion = horaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaActualizacion = horaActualizacion;
        this.rol = rol;
        this.usuarioCreacion = usuarioCreacion;
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public Usuario() {
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "codigo='" + codigo + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", estado=" + estado +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", rol=" + rol +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                '}';
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public boolean isEstado() {
        return estado;
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

    public Rol getRol() {
        return rol;
    }

    public void setRol(String codigoRol) {
        if (codigoRol != null) {
            Rol rol = new Rol();
            rol.setCodigo(codigoRol); // Crear un objeto Rol con el código
            this.rol = rol;           // Asignar el objeto Rol al usuario
        }
    }

}
