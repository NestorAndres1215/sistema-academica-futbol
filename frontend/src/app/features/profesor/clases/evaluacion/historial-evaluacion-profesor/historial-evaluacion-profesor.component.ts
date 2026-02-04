import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { calcularNotaFinal, calcularTotalNotaFinal } from 'src/app/core/utils/calculadorValidator';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';

@Component({
  selector: 'app-historial-evaluacion-profesor',
  templateUrl: './historial-evaluacion-profesor.component.html',
  styleUrls: ['./historial-evaluacion-profesor.component.css']
})
export class HistorialEvaluacionProfesorComponent implements OnInit {

  evaluacion: any[] = [];
  estudiantesFiltrados: any[] = [];
  estudiante: any[] = [];

  equipoSeleccionada: string = '';  // código del estudiante seleccionado
  opcionesEquipo: string[] = [];


  codigo: string; // código del equipo

  columnas = [
    { etiqueta: 'Nombre Completo', clave: 'nombreCompleto' },
    { etiqueta: 'Pases', clave: 'pases' },
    { etiqueta: 'Tiros', clave: 'tiros' },
    { etiqueta: 'Posicionamiento', clave: 'posicionamiento' },
    { etiqueta: 'Visión de Juego', clave: 'visionJuego' },
    { etiqueta: 'Resistencia', clave: 'resistencia' },
    { etiqueta: 'Velocidad', clave: 'velocidad' },
    { etiqueta: 'Fuerza', clave: 'fuerza' },
    { etiqueta: 'Concentración', clave: 'concentracion' },
    { etiqueta: 'Toma de Decisiones', clave: 'tomaDecisiones' },
    { etiqueta: 'Final', clave: 'notaFinal' },
  ];

  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private evaluacionService: EvaluacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.listarEvaluacion();
  }

  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe((data) => {

      // Filtrar evaluaciones del equipo y que estén activas (estado=false)
      const evaluacionesFiltradas = data.filter(
        i => i.equipo === this.codigo && i.estado === false
      );

      // Mapear a estudiantes con notas
      const estudiantes = evaluacionesFiltradas.map(i => ({
        ...i.evaluacion.estudiante,
        pases: i.pases ?? 0,
        tiros: i.tiros ?? 0,
        posicionamiento: i.posicionamiento ?? 0,
        visionJuego: i.visionJuego ?? 0,
        resistencia: i.resistencia ?? 0,
        velocidad: i.velocidad ?? 0,
        fuerza: i.fuerza ?? 0,
        concentracion: i.concentracion ?? 0,
        tomaDecisiones: i.tomaDecisiones ?? 0,
        notaFinal: calcularNotaFinal(i)
      }));

      // Quitar duplicados por código
      const estudiantesUnicos = estudiantes.filter(
        (est, idx, self) =>
          idx === self.findIndex(e => e.codigo === est.codigo)
      );

      // Agregar nombre completo
      this.estudiantesFiltrados = estudiantesUnicos.map(e => ({
        ...e,
        nombreCompleto: NombreCompleto(e)
      }));

      // Guardar lista original para filtrar
      this.estudiante = [...this.estudiantesFiltrados];

      // Calcular total de notas
      this.total = calcularTotalNotaFinal(this.estudiantesFiltrados);

      // Generar opciones para el select
      this.opcionesEquipo = this.estudiante.map(
        e => e.primerNombre + ' ' + e.apellidoPaterno
      );
    });
  }

  filtrarUsuarios() {
    this.estudiantesFiltrados = this.equipoSeleccionada
      ? this.estudiante.filter(e =>
        (e.primerNombre + ' ' + e.apellidoPaterno) === this.equipoSeleccionada
      )
      : [...this.estudiante];
  }

}
