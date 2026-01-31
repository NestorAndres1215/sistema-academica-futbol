import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Historial } from 'src/app/core/model/historial';

import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-modulo-evaluacion',
  templateUrl: './modulo-evaluacion.component.html',
  styleUrls: ['./modulo-evaluacion.component.css']
})
export class ModuloEvaluacionComponent implements OnInit {
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


    console.log("Equipos:", equipos);
    console.log("Conteos:", conteos);

    this.evaluacionService.desactivarEvaluaciones(equipos, conteos).subscribe(
      (response) => {
        this.mensajeService.MostrarMensajeExito("SE GUARDARON LAS EVALUACIONES");
        console.log("Evaluaciones desactivadas con éxito:", response);
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


  toggleEdicion() {
    if (this.modoEdicion) {
      console.log(this.evaluacion)
      // Filtrar solo los datos que quieres guardar

      const estudiantesAActualizar = this.evaluacion.map(est => ({
        codigo: est.codigo,
        evaluacion: est.evaluacion.codigo,
        pases: est.pases ?? 0,
        tiros: est.tiros ?? 0,
        posicionamiento: est.posicionamiento ?? 0,
        visionJuego: est.visionJuego ?? 0,
        resistencia: est.resistencia ?? 0,
        velocidad: est.velocidad ?? 0,
        fuerza: est.fuerza ?? 0,
        concentracion: est.concentracion ?? 0,
        tomaDecisiones: est.tomaDecisiones ?? 0,
        notaFinal: 0.0,
        comentarios: "",
        conteo: est.conteo,
        equipo: est.equipo
      }));

      const estudiantesAActualizar1 = this.evaluacion.map(est => ({
        codigo: est.evaluacion.codigo,
        nota: (
          (est.pases ?? 0) +
          (est.tiros ?? 0) +
          (est.posicionamiento ?? 0) +
          (est.visionJuego ?? 0) +
          (est.resistencia ?? 0) +
          (est.velocidad ?? 0) +
          (est.fuerza ?? 0) +
          (est.concentracion ?? 0) +
          (est.tomaDecisiones ?? 0)
        ) / 9,
      
      }));

      console.log(estudiantesAActualizar1)
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} actualizo evaluacion.`
      };
this.evaluacionService.actualizar(estudiantesAActualizar1)
      this.evaluacionService.actualizarEvaluaciones(estudiantesAActualizar).subscribe({
        next: (data) => {
          this.historialService.registrar(historial).subscribe({
            next: () => {
              this.listarEvaluacion();
            },
            error: (err) => {
              console.error("Error al registrar el historial:", err);
            }
          });
        },
        error: (err) => {
          console.error("Error al actualizar la asignación:", err);
        }
      });



    }
    this.modoEdicion = !this.modoEdicion;
  }


  modoEdicion: boolean = false;
  constructor(private route: ActivatedRoute, private historialService: HistorialService, private mensajeService: MensajeService,
    private loginService: LoginService,
    private evaluacionService: EvaluacionService,
    private claseService: ClaseService,
    private router: Router) { }
  codigo: string
  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    console.log(this.codigo)
    this.listarEvaluacion();
  }
  evaluacion: any[] = [];
  valoresPosibles: number[] = Array.from({ length: 11 }, (_, i) => i); // [0, 1, 2, ..., 10]

  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe(
      (data) => {
console.log(data)
console.log(this.codigo)
        this.evaluacion = data.filter(i => i.equipo == this.codigo && i.estado == true)
        console.log(this.evaluacion)
      },
      (error) => {
        console.error('Error al listar evaluaciones:', error);
      }
    );
  }

}
