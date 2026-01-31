package com.naat.proyectofutbol.dto.response;


import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private String error;
    private Object message;
    private LocalDateTime timestamp;
    private int status;
}