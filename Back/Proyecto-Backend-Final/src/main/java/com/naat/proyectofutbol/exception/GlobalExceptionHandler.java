package com.naat.proyectofutbol.exception;


import com.naat.proyectofutbol.constants.GlobalErrorMessages;
import com.naat.proyectofutbol.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String error, Object message) {
        ErrorResponse response = ErrorResponse.builder()
                .error(error)
                .message(message)
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .build();

        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtAuthenticationException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, GlobalErrorMessages.NO_AUTORIZADO, ex.getMessage());
    }


    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleResourceExists(ResourceAlreadyExistsException ex) {
        return buildResponse(HttpStatus.CONFLICT, GlobalErrorMessages.CONFLICTO, ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, GlobalErrorMessages.NO_ENCONTRADO, ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, GlobalErrorMessages.PROHIBIDO, ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, GlobalErrorMessages.SOLICITUD_INVALIDA, ex.getMessage());
    }



    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, GlobalErrorMessages.ERROR_PROCESO, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex) {

        Map<String, String> errores = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errores.put(error.getField(), error.getDefaultMessage());
        });

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                GlobalErrorMessages.SOLICITUD_INVALIDA,
                errores
        );
    }



}