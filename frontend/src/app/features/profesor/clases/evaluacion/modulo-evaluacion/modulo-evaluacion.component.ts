import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';

import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';


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

    const equipos = resultado.map(item => item.equipo).join(",");
    const conteos = resultado.map(item => item.conteo).join(",");

    this.evaluacionService.desactivarEvaluaciones(equipos, conteos).subscribe({
      next: () => {
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.listarEvaluacion();
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });
  }


  toggleEdicion() {
    if (this.modoEdicion) {

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

      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} actualizo evaluacion.`
      };

      this.evaluacionService.actualizar(estudiantesAActualizar1)
      this.evaluacionService.actualizarEvaluaciones(estudiantesAActualizar).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.listarEvaluacion();
        },
        error: (err) => {
          console.error("Error al actualizar la asignación:", err);
        }
      });
    }
    this.modoEdicion = !this.modoEdicion;
  }

  codigo: string
  evaluacion: any[] = [];
  valoresPosibles: number[] = Array.from({ length: 11 }, (_, i) => i);
  modoEdicion: boolean = false;
  constructor(private route: ActivatedRoute, private historialService: HistorialService,
    private loginService: LoginService,
    private evaluacionService: EvaluacionService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    this.listarEvaluacion();
  }

  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe(
      (data) => {
        this.evaluacion = data.filter(i => i.equipo == this.codigo && i.estado == true)
      },
    );
  }

}
