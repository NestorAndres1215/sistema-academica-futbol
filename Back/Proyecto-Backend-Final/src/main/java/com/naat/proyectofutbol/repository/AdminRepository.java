package com.naat.proyectofutbol.repository;

import java.util.List;
import java.util.Optional;

import com.naat.proyectofutbol.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

  
    @Query(value = "SELECT MAX(us_codigo) FROM Usuario", nativeQuery = true)
    String obtenerUltimoCodigo();
    @Query(value = "SELECT MAX(ad_codigo) FROM Admin", nativeQuery = true)
    String obtenerUltimoCodigoAdmin();
    boolean existsByCorreo(String correo);
    boolean existsByTelefono(String telefono);
    boolean existsByDni(String dni);
    List<Admin> findByUsuario_Codigo(String usuarioCodigo);
    List<Admin> findByEstadoTrue();
    List<Admin> findByEstadoFalse();

    Optional<Admin> findByCorreo(String correo);
    Optional<Admin> findByDni(String dni);
    Optional<Admin> findByTelefono(String telefono);


    List<Admin> findByPrimerNombre(String primerNombre);
    List<Admin> findByApellidoPaterno(String apellidoPaterno);

}
