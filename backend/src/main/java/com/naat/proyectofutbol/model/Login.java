package com.naat.proyectofutbol.model;

import com.naat.proyectofutbol.security.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
@Entity
@Table(name = "login")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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

    @Column(name = "ul_rol")
    private String ul_rol;

    @Column(name = "ul_estado", nullable = false)
    private Boolean estado;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> authorities = new HashSet<>();
        authorities.add(new Authority(this.ul_rol));
        return authorities;
    }

    @Override
    public boolean isEnabled() {
        return this.estado;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

}
