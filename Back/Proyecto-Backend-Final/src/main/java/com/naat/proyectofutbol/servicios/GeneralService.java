package com.naat.proyectofutbol.servicios;

import com.naat.proyectofutbol.dto.GeneralDevDTO;
import com.naat.proyectofutbol.entidades.Admin;
import com.naat.proyectofutbol.entidades.General;
import com.naat.proyectofutbol.entidades.GeneralDev;

import com.naat.proyectofutbol.entidades.Sede;
import com.naat.proyectofutbol.repositorios.GeneralDevRepository;
import com.naat.proyectofutbol.repositorios.GeneralRepository;
import com.naat.proyectofutbol.util.Utilitarios;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class  GeneralService{
    @Autowired
    private GeneralRepository generalRepository;
    @Autowired
    private GeneralDevRepository generalDevRepository;


    public List<General> listarGeneral() {
        return generalRepository.findAll();
    }

    public List<GeneralDev> findGeneralDevByEstadoTrueAndCodigo(String codigo) {
        return generalDevRepository.findByEstadoTrueAndCodigo(codigo);
    }

    public General guardarGeneral(General general) throws Exception {
        try {
        String ultimoCodigo = obtenerUltimoCodigo();
        String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
        if (existsByDescripcion(general.getDescripcion1())) {
            throw new IllegalArgumentException("DESCRIPCION EXISTE");
        }
        general.setCodigo(nuevoCodigo);
        general.setClave(nuevoCodigo);
        general.setDescripcion1(general.getDescripcion1());
        general.setEstado(true);
        general.setUsuarioCreacion(general.getUsuarioCreacion());
        general.setFechaCreacion(LocalDate.now());
        general.setHoraCreacion(LocalTime.now());

        return generalRepository.save(general);}
        catch (Exception e){
            throw new RuntimeException("No se pudo guardar la sede: " + e.getMessage(), e);
        }
    }


    public General actualizarGeneral(General general) {
        try {
            Optional<General> generalOptional = generalRepository.findById(general.getCodigo());
            if (!generalOptional.isPresent()) {
                throw new IllegalArgumentException("The entity with code " + general.getCodigo() + " does not exist.");
            }
            General generalExistente = generalOptional.get();
            if (!general.getDescripcion1().equals(generalExistente.getDescripcion1())) {
                if (existsByDescripcion(general.getDescripcion1())) { // Use appropriate repository method
                    throw new IllegalArgumentException("Description already exists: " + general.getDescripcion1());
                }
            }
            generalExistente.setDescripcion1(general.getDescripcion1());
            generalExistente.setEstado(true);
            generalExistente.setUsuarioActualizacion(general.getUsuarioActualizacion());
            generalExistente.setFechaActualizacion(LocalDate.now());
            generalExistente.setHoraActualizacion(LocalTime.now());
            return generalRepository.save(generalExistente);
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException("An error occurred while updating the entity: " + ex.getMessage(), ex);
        }
    }



    public boolean existsByCodigo(String codigo) {
        return generalRepository.existsByCodigo(codigo);
    }


    public boolean existsByClave(String clave) {
        return generalRepository.existsByClave(clave);
    }


    public boolean existsByDescripcion(String Descripcion) {
        return generalRepository.existsByDescripcion1(Descripcion);
    }


    public List<General> findGeneralByEstadoTrue() {
        return generalRepository.findByEstadoTrue();
    }


    public List<General> findGeneralByEstadoFalse() {
        return generalRepository.findByEstadoFalse();
    }




    public List<GeneralDev> activar(String generalCodigo) {

        List<GeneralDev> generales = generalDevRepository.findByGeneralCodigo(generalCodigo);

        if (!generales.isEmpty()) {

            for (GeneralDev general : generales) {
                general.setEstado(true);
            }
            return generalDevRepository.saveAll(generales);
        } else {
            throw new RuntimeException("No se encontraron registros con el código: " + generalCodigo);
        }
    }


    public String obtenerUltimoCodigo() {
        return generalRepository.obtenerUltimoCodigo();
    }



    public boolean existsByCodigoDev(String codigo) {
        return generalDevRepository.existsByCodigo(codigo);
    }


    public boolean existsByClaveDev(String clave) {
        return generalRepository.existsByClave(clave);
    }


    public boolean existsByClaveAndCodigo(String clave, String codigo) {
        return generalDevRepository.existsByClaveAndCodigo(clave, codigo);
    }


    public List<GeneralDev> findGeneralDevByEstadoTrue() {
        return generalDevRepository.findByEstadoTrue();
    }


    public List<GeneralDev> findGeneralDevByEstadoFalse() {
        return generalDevRepository.findByEstadoFalse();
    }


    public String UltimoCodigo() {
        return generalDevRepository.obtenerUltimoCodigo();
    }


    public GeneralDev desactivarGen(String generalCodigo) {
        Optional<GeneralDev> generalExistenteOpt = generalDevRepository.findById(generalCodigo);
        System.out.print(generalExistenteOpt);
        if (generalExistenteOpt.isPresent()) {
            GeneralDev general = generalExistenteOpt.get();
            general.setEstado(false);
            return generalDevRepository.save(general);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + generalCodigo);
        }
    }

    public List<GeneralDev> desactivar(String generalCodigo) {
        // Busca todos los registros que coincidan con el código
        List<GeneralDev> generales = generalDevRepository.findByGeneralCodigo(generalCodigo);

        // Verifica si hay resultados
        if (!generales.isEmpty()) {
            // Recorre la lista y establece el estado en false
            for (GeneralDev general : generales) {
                general.setEstado(false);
            }
            // Guarda todos los cambios en la base de datos
            return generalDevRepository.saveAll(generales);
        } else {
            // Lanza una excepción si no encuentra registros con el código dado
            throw new RuntimeException("No se encontraron registros con el código: " + generalCodigo);
        }
    }



    public GeneralDev activarGen(String generalCodigo) {
            Optional<GeneralDev> generalExistenteOpt = generalDevRepository.findById(generalCodigo);
            System.out.print(generalExistenteOpt);
        if (generalExistenteOpt.isPresent()) {
            GeneralDev general = generalExistenteOpt.get();
            general.setEstado(true);
            return generalDevRepository.save(general);
        }
        else {
            throw new RuntimeException("Sede no encontrado con el código: " + generalCodigo);
        }
    }


    public GeneralDev guardarGeneralDev(GeneralDevDTO generalDTO) throws Exception {
        try {


            String ultimoCodigo = UltimoCodigo();
            String nuevoCodigo = Utilitarios.incrementarSecuencia(ultimoCodigo);
            System.out.print(nuevoCodigo);
               Optional<General> generalOptional = generalRepository.findById(generalDTO.getGeneral());
      General general = generalOptional.orElseThrow(() -> new Exception("La sede con el código " + generalDTO.getGeneral() + " no existe."));


        if (existsByDescripcion(generalDTO.getDescripcionPrimero())) {
                  throw new IllegalArgumentException("DESCRIPCION EXISTE");
            }
              if(existsByClave(generalDTO.getClave())){
                throw  new IllegalArgumentException("CLAVE YA EXISTE");
            }
       GeneralDev generalDev= new GeneralDev();
            generalDev.setCodigo(nuevoCodigo);
            generalDev.setClave(generalDTO.getClave());
            generalDev.setDescripcion1(generalDTO.getDescripcionPrimero());
            generalDev.setEstado(true);
            generalDev.setUsuarioCreacion(general.getUsuarioCreacion());
            generalDev.setFechaCreacion(LocalDate.now());
            generalDev.setHoraCreacion(LocalTime.now());
            generalDev.setGeneral(generalOptional.get());/*   */
System.out.print(generalDev);
            return generalDevRepository.save(generalDev);
           }
        catch (Exception e){
            throw new RuntimeException("No se pudo guardar la sede: " + e.getMessage(), e);
        }
    }


    public GeneralDev actualizarGeneralDev(GeneralDevDTO general) {
       // System.out.print(general);

            Optional<GeneralDev> generalDev = generalDevRepository.findById(general.getCodigo());

           if (generalDev.isEmpty()) {
                throw new EntityNotFoundException("El registro con el código " + general.getCodigo() + " no existe.");
            }


            GeneralDev generalExist = generalDev.get();
            generalExist.setCodigo(general.getCodigo());
            generalExist.setDescripcion1(general.getDescripcionPrimero());
            generalExist.setUsuarioActualizacion(general.getUsuarioActualizacion());
            generalExist.setFechaActualizacion(LocalDate.now());
            generalExist.setHoraActualizacion(LocalTime.now());
            System.out.print(generalExist);

            // Validación de descripción
            if (!generalExist.getDescripcion1().equals(general.getDescripcionPrimero())) {
                if (existsByDescripcion(general.getDescripcionPrimero())) {
                    throw new IllegalArgumentException("DESCRIPCIÓN YA EXISTE");
                }
            }

            // Validación de clave
            if (!generalExist.getClave().equals(general.getClave())) {
                if (existsByDescripcion(general.getDescripcionPrimero())) {
                    throw new IllegalArgumentException("CLAVE YA EXISTE");
                }
            }
System.out.print(generalExist);
            return generalDevRepository.save(generalExist);

    }



    public List<General> desactivarGenrales(String generalCodigo) {



        List<General> generales = generalRepository.findByCodigo(generalCodigo);

        if (generales.isEmpty()) {
            throw new RuntimeException("No se encontraron registros con el código: " + generalCodigo);
        }

        for (General general : generales) {
            desactivar(generalCodigo);
            general.setEstado(false);
        }

        return generalRepository.saveAll(generales);
    }
    public List<General> activarGenrales(String generalCodigo) {

        activar(generalCodigo);

        List<General> generales = generalRepository.findByCodigo(generalCodigo);

        if (generales.isEmpty()) {
            throw new RuntimeException("No se encontraron registros con el código: " + generalCodigo);
        }

        for (General general : generales) {
            general.setEstado(true);
        }

        return generalRepository.saveAll(generales);
    }

}
