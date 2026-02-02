import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';

@Component({
  selector: 'app-modulo-admin-evaluacion',
  templateUrl: './modulo-admin-evaluacion.component.html',
  styleUrls: ['./modulo-admin-evaluacion.component.css']
})
export class ModuloAdminEvaluacionComponent implements OnInit {
  columnas = [
    { etiqueta: 'Código', clave: 'evaluacion.estudiante.usuario.username' },
    { etiqueta: 'Nombre Completo', clave: 'nombreCompleto' },
    { etiqueta: 'Nota Final', clave: 'evaluacion.notaFinal' },
  ];


  guardarDatos() {
    const arrayT = this.evaluacion.map(i => ({ equipo: i.equipo, conteo: i.conteo || 0 }));

    const resultado = arrayT.reduce((acc, curr) => {
      const existente = acc.find(item => item.equipo === curr.equipo);
      if (existente) {
        existente.conteo = curr.conteo;
      } else {
        acc.push({ equipo: curr.equipo, conteo: curr.conteo });
      }
      return acc;
    }, []);

    // Extraer arrays separados
    const equipos = resultado.map(item => item.equipo).join(",");
    console.log(equipos);

    const conteos = resultado.map(item => item.conteo).join(",");
    console.log(conteos);



    this.evaluacionService.desactivarEvaluaciones(equipos, conteos).subscribe(
      (response) => {
        this.mensajeService.MostrarMensajeExito("SE GUARDARON LAS EVALUACIONES");

        this.listarEvaluacion(); // Debe estar dentro del éxito para ejecutarse después de guardar
      },
      (error) => {
        console.error("Error al desactivar evaluaciones:", error);
      }
    );

  }
  editar(arg0: any) {
    throw new Error('Method not implemented.');
  }


  modoEdicion: boolean = false;
  constructor(private route: ActivatedRoute, private mensajeService: MensajeService,

    private evaluacionService: EvaluacionService,) { }
  codigo: string
  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    console.log(this.codigo)
    this.listarEvaluacion();
  }
  evaluacion: any[] = [];


listarEvaluacion() {
  this.evaluacionService.listarDetalleEvaluaciones().subscribe(
    (data) => {
      // Filtrar por equipo y estado activo
      this.evaluacion = data
        .filter(i => i.equipo === this.codigo && i.estado === true)
        .map(i => {
          const estudiante = i.evaluacion?.estudiante;
          return {
            ...i,
            nombreCompleto: estudiante ? NombreCompleto(estudiante) : ''
          };
        });
    },
    (error) => {
      console.error('Error al listar evaluaciones:', error);
    }
  );
}



}
