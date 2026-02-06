import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';


@Component({
  selector: 'app-historial-estudiante-evaluacion',
  templateUrl: './historial-estudiante-evaluacion.component.html',
  styleUrls: ['./historial-estudiante-evaluacion.component.css']
})
export class HistorialEstudianteEvaluacionComponent implements OnInit {

  evaluacion: any[] = [];
  estudiante: any[] = [];
  equipoSeleccionada: string = '';
  filtrarUsuarios() {

    if (!this.equipoSeleccionada) {
      this.estudiantesFiltrados = [];
      return;
    }

    this.estudiantesFiltrados = this.evaluacion.filter(estudiante => {
      const coincideConEquipo = estudiante.evaluacion.estudiante.codigo === this.equipoSeleccionada;
      return coincideConEquipo;
    });
  }
  estudiantesFiltrados = [...this.estudiante];
  constructor(private route: ActivatedRoute,
    private loginService: LoginService,
    private evaluacionService: EvaluacionService) { }

  codigo: string
  activeTab1: number = 0;

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
  
    this.listarEvaluacion();
  }


  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe(
      (data) => {

       this.evaluacion = data
                 .filter(i => i.evaluacion.estudiante.usuario.codigo == this.loginService.getUser().ul_codigo && i.estado == false)
                 .map(i => {
                   const estudiante = i.evaluacion?.estudiante;
                   return {
                     ...i,
                     nombreCompleto: estudiante ? NombreCompleto(estudiante) : ''
                   };
                 }); this.estudiante = this.evaluacion.map(i => i.evaluacion.estudiante)
      },
    );
  }

  get totalNotaFinal(): number {
    return this.estudiantesFiltrados?.reduce((sum, estudiante) => sum + (estudiante.notaFinal ?? 0), 0) || 0;
  }

  columnas = [
 
    { etiqueta: 'Nombre Completo', clave: 'nombreCompleto' },
    { etiqueta: 'Pases', clave: 'pases' },
    { etiqueta: 'Tiros', clave: 'tiros' },
    { etiqueta: 'Posicionamiento', clave: 'posicionamiento' },
    { etiqueta: 'Vision Juego', clave: 'visionJuego' },
    { etiqueta: 'Resistencia', clave: 'resistencia' },
    { etiqueta: 'velocidad', clave: 'velocidad' },
    { etiqueta: 'Fuerza', clave: 'fuerza' },
    { etiqueta: 'Concentracion', clave: 'concentracion' },
    { etiqueta: 'Toma Decisiones', clave: 'tomaDecisiones' },
    { etiqueta: 'Nota Final', clave: 'evaluacion.notaFinal' },
  ];
}
