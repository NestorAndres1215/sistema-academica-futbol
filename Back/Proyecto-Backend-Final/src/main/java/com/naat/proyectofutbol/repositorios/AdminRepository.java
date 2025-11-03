package com.naat.proyectofutbol.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.naat.proyectofutbol.entidades.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    List<Admin> findByUsuario_Codigo(String usuarioCodigo);

    @Query(value = "SELECT MAX(us_codigo) FROM Usuario", nativeQuery = true)
    String obtenerUltimoCodigo();

    @Query(value = "SELECT MAX(ad_codigo) FROM Admin", nativeQuery = true)
    String obtenerUltimoCodigoAdmin();

    boolean existsByCorreo(String correo);

    boolean existsByTelefono(String telefono);

    boolean existsByDni(String dni);

    List<Admin> findByEstadoTrue();

    List<Admin> findByEstadoFalse();

    List<Admin> findByCorreo(String correo);

    List<Admin> findByDni(String dni);

    List<Admin> findByApellidoPaterno(String apellidoPaterno);

    List<Admin> findByPrimerNombre(String primerNombre);

    List<Admin> findByTelefono(String telefono);

}
