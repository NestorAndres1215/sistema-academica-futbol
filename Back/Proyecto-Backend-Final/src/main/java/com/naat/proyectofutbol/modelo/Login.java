package com.naat.proyectofutbol.modelo;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name = "login")
public class Login implements UserDetails {
    @Id
    @Column(name = "ul_codigo")
    private String ul_codigo;
    @Column(name = "ul_usuario")
    private String username;
    @Column(name = "ul_contra")
    private String password;
    @Column(name = "ul_correo")
    private String correo;
    private String ul_rol;
    @Column(name = "ul_estado", nullable = false)
    private boolean estado;  // Estado del usuario (activo/inactivo)

    public Login(String ul_codigo, String username, String password, String correo, String ul_rol, boolean estado) {
        this.ul_codigo = ul_codigo;
        this.username = username;
        this.password = password;
        this.correo = correo;
        this.ul_rol = ul_rol;
        this.estado = estado;
    }

    public Login() {
    }

    public String getUl_codigo() {
        return ul_codigo;
    }

    public void setUl_codigo(String ul_codigo) {
        this.ul_codigo = ul_codigo;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getUl_rol() {
        return ul_rol;
    }

    public void setUl_rol(String ul_rol) {
        this.ul_rol = ul_rol;
    }

    public boolean getEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> autoridades = new HashSet<>();

        autoridades.add(new Authority(getUl_rol()));

        return autoridades;
    }
    @Override
    public boolean isEnabled() {

        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String toString() {
        return "Login{" +
                "ul_codigo='" + ul_codigo + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", correo='" + correo + '\'' +
                ", ul_rol='" + ul_rol + '\'' +
                ", estado=" + estado +
                '}';
    }
}