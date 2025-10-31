package com.naat.proyectofutbol.repositorios;

import com.naat.proyectofutbol.entidades.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario,String> {

     List<Usuario> findByUsername(String username);
    List<Usuario> findByCodigoAndUsername(String codigo, String username);
    @Query("SELECT u FROM Usuario u WHERE u.username = :username AND u.estado = 1")
    public Usuario findByUsernameAndEstado(@Param("username") String username);

    boolean existsByUsername(String username);
    boolean existsByUsernameAndPassword(String username, String password);
    Usuario findByCodigo(String codigo);

    @Query(value = "SELECT MAX(us_codigo) FROM Usuario", nativeQuery = true)
    String obtenerUltimoCodigo();






}