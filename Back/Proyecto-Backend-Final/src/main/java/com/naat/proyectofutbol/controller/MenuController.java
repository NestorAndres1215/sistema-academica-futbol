package com.naat.proyectofutbol.controller;

import com.naat.proyectofutbol.model.Menu;
import com.naat.proyectofutbol.model.Rol;
import com.naat.proyectofutbol.repository.MenuRepository;
import com.naat.proyectofutbol.repository.RolRepository;
import com.naat.proyectofutbol.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    private final RolRepository rolRepository;

    private final MenuRepository menuRepository;

    @GetMapping("/{rolCodigo1}/{rolCodigo2}")
    public ResponseEntity<?> obtenerMenusPorDosRoles(@PathVariable String rolCodigo1, @PathVariable String rolCodigo2) {

            // Buscar los roles en la base de datos
            Optional<Rol> rol1 = rolRepository.findByCodigo(rolCodigo1);
            Optional<Rol> rol2 = rolRepository.findByCodigo(rolCodigo2);

            if (rol1 == null || rol2 == null) {
                String mensaje = (rol1 == null ? "Rol no encontrado para el código: " + rolCodigo1 : "") +
                        (rol2 == null ? " Rol no encontrado para el código: " + rolCodigo2 : "");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensaje.trim());
            }

            List<Menu> menusRol1 = menuService.obtenerMenusPorRol(rol1);
            List<Menu> menusRol2 = menuService.obtenerMenusPorRol(rol2);

            List<Menu> todosLosMenus = new ArrayList<>(menusRol1);
            todosLosMenus.addAll(menusRol2);

            if (todosLosMenus.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No se encontraron menús para los roles con códigos: " + rolCodigo1 + " y " + rolCodigo2);
            }

            return ResponseEntity.ok(todosLosMenus);


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