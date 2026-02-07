package com.naat.proyectofutbol;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import javax.annotation.PostConstruct;


@SpringBootApplication
@EnableScheduling
public class ProyectoFutbolApplication implements CommandLineRunner{

	@Value("${server.port}")
	private String puerto;

	private static String PUERTO;

	@PostConstruct
	public void init()
	{
		PUERTO = puerto;
	}
	public static void main(String[] args) {
		SpringApplication.run(ProyectoFutbolApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		System.out.printf("SE HA INICIADO  EL SERVICIO DE BACKEND GENERAL CON EL PUERTO %s", PUERTO +"\n");
	}

}
