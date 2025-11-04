package com.naat.proyectofutbol.controladores;

import com.naat.proyectofutbol.entidades.Menu;
import com.naat.proyectofutbol.entidades.Rol;
import com.naat.proyectofutbol.repositorios.MenuRepository;
import com.naat.proyectofutbol.repositorios.RolRepository;
import com.naat.proyectofutbol.servicios.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE }, allowedHeaders = "*")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;  // Inyectamos la interfaz

    private final RolRepository rolRepository;  // Inyectamos el repositorio de Rol

    private final MenuRepository menuRepository;

    @GetMapping("/{rolCodigo1}/{rolCodigo2}")
    public ResponseEntity<?> obtenerMenusPorDosRoles(@PathVariable String rolCodigo1, @PathVariable String rolCodigo2) {
        try {
            // Buscar los roles en la base de datos
            Rol rol1 = rolRepository.findByCodigo(rolCodigo1);
            Rol rol2 = rolRepository.findByCodigo(rolCodigo2);

            // Validar si ambos roles existen
            if (rol1 == null || rol2 == null) {
                String mensaje = (rol1 == null ? "Rol no encontrado para el código: " + rolCodigo1 : "") +
                        (rol2 == null ? " Rol no encontrado para el código: " + rolCodigo2 : "");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje.trim());
            }

            // Obtener menús para ambos roles
            List<Menu> menusRol1 = menuService.obtenerMenusPorRol(rol1);
            List<Menu> menusRol2 = menuService.obtenerMenusPorRol(rol2);

            // Fusionar y evitar duplicados (opcional)
            List<Menu> todosLosMenus = new ArrayList<>(menusRol1);
            todosLosMenus.addAll(menusRol2);

            // Validar si hay menús
            if (todosLosMenus.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se encontraron menús para los roles con códigos: " + rolCodigo1 + " y " + rolCodigo2);
            }

            // Retornar menús encontrados
            return ResponseEntity.ok(todosLosMenus);

        } catch (RuntimeException e) {
            // Manejo de excepciones específicas
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error al buscar los roles: " + e.getMessage());

        } catch (Exception e) {
            // Manejo de excepciones generales
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error interno del servidor: " + e.getMessage());
        }
    }

    @GetMapping("/menuPrimero")
    public ResponseEntity<List<Menu>> menuPrimero() {
        List<Menu> menuPrimero = menuRepository.findByNivel(1);
        return ResponseEntity.ok(menuPrimero);
    }

    @GetMapping("/menuSegundo")
    public ResponseEntity<List<Menu>> menuSegundo() {
        List<Menu> menuSegundo = menuRepository.findByNivel(2);
        return ResponseEntity.ok(menuSegundo);
    }
    @GetMapping("/menuTercero")
    public ResponseEntity<List<Menu>> menuTercero() {
        List<Menu> menuSegundo = menuRepository.findByNivel(3);
        return ResponseEntity.ok(menuSegundo);
    }
}