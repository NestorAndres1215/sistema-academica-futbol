package com.naat.proyectofutbol.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;

@Configuration
public class CustomJacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        // Configuración del módulo para manejar fechas
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // Configuración para el deserializador personalizado
        SimpleModule module = new SimpleModule();
        module.addDeserializer(GrantedAuthority.class, new CustomGrantedAuthorityDeserializer());
        objectMapper.registerModule(module);

        return objectMapper;
    }
}
