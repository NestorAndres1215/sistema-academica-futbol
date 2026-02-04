import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

// Registrar los módulos necesarios de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-grafico-evaluacion-profesor',
  templateUrl: './grafico-evaluacion-profesor.component.html',
  styleUrls: ['./grafico-evaluacion-profesor.component.css']
})
export class GraficoEvaluacionProfesorComponent implements OnInit {
  @ViewChild('radarChart', { static: false }) radarChartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  codigo!: string;
  evaluacion: any[] = [];
  estudiante: any[] = [];
  equipoSeleccionada: string = '';
  estudiantesFiltrados: any[] = [];
  opcionesEquipo: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private evaluacionService: EvaluacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo'];
    this.listarEvaluacion();
  }

  ngAfterViewInit() {
    this.crearGrafico();
  }

  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe(
      (data) => {
        console.log(data);

        // Filtramos por equipo y estado
        this.evaluacion = data.filter(i => i.equipo === this.codigo && i.estado === false);

        // Mapeamos los estudiantes
        this.estudiante = this.evaluacion.map(i => i.evaluacion.estudiante);


        console.log("Estudiantes:", this.estudiante);
        const estudiantesUnicos = this.estudiante.filter((estudiante, index, self) =>
          index === self.findIndex((e) => e.codigo === estudiante.codigo)
        );

        console.log(estudiantesUnicos);
        this.estudiante = estudiantesUnicos
        this.opcionesEquipo = this.estudiante.map(
          e => e.primerNombre + ' ' + e.apellidoPaterno
        );
        this.filtrarUsuarios(); // Aplicamos el filtro automáticamente

      },

    );
  }


  filtrarUsuarios() {
    console.log("Equipo seleccionado:", this.equipoSeleccionada);

    if (!this.equipoSeleccionada) {
      this.estudiantesFiltrados = [];
    } else {
    this.estudiantesFiltrados = this.equipoSeleccionada
      ? this.estudiante.filter(e =>
        (e.primerNombre + ' ' + e.apellidoPaterno) === this.equipoSeleccionada
      )
      : [...this.estudiante];
    }

    this.actualizarGrafico();
  }

  crearGrafico() {
    if (!this.radarChartRef) {
      console.error('Canvas no encontrado');
      return;
    }

    const ctx = this.radarChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Pases', 'Tiros', 'Posicionamiento', 'Visión de Juego',
          'Resistencia', 'Velocidad', 'Fuerza', 'Concentración', 'Toma de Decisiones'
        ],
        datasets: [] // Inicialmente vacío
      },
      options: {
        responsive: true,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 10
          }
        }
      }
    });
  }

  actualizarGrafico() {
    if (!this.chart || this.estudiantesFiltrados.length === 0) {
      console.log("No hay datos para actualizar el gráfico.");
      return;
    }

    // Reiniciar datasets para limpiar el gráfico antes de añadir nuevos datos
    this.chart.data.datasets = [];

    const colores = [
      { background: 'rgba(255, 182, 193, 0.2)', border: 'rgb(241, 14, 48)' }, // Rosa claro
      { background: 'rgba(173, 216, 230, 0.2)', border: 'rgb(53, 202, 252)' }, // Azul cielo
      { background: 'rgba(144, 238, 144, 0.2)', border: 'rgb(95, 233, 95)' }, // Verde claro
      { background: 'rgba(255, 239, 184, 0.2)', border: 'rgb(226, 188, 61)' }, // Amarillo pastel
      { background: 'rgba(221, 160, 221, 0.2)', border: 'rgb(241, 35, 241)' }, // Lavanda
      { background: 'rgba(240, 230, 140, 0.2)', border: 'rgb(116, 110, 60)' }, // Caqui claro
      { background: 'rgba(255, 228, 225, 0.2)', border: 'rgb(255, 194, 187)' }, // Rosa niebla
      { background: 'rgba(176, 224, 230, 0.2)', border: 'rgb(12, 152, 170)' }, // Azul polvo
      { background: 'rgba(152, 251, 152, 0.2)', border: 'rgb(7, 139, 7)' }, // Verde primavera claro
      { background: 'rgba(250, 250, 210, 0.2)', border: 'rgb(255, 255, 43)' }, // Amarillo pálido
      { background: 'rgba(230, 230, 250, 0.2)', border: 'rgb(145, 145, 255)' }, // Lila claro
      { background: 'rgba(245, 222, 179, 0.2)', border: 'rgb(255, 178, 36)' }, // Trigo
      { background: 'rgba(240, 255, 240, 0.2)', border: 'rgb(163, 247, 163)' }, // Menta
      { background: 'rgba(224, 255, 255, 0.2)', border: 'rgb(14, 66, 66)' }, // Azul celeste claro
      { background: 'rgba(255, 218, 185, 0.2)', border: 'rgb(134, 64, 3)' }, // Melón claro
      { background: 'rgba(245, 245, 220, 0.2)', border: 'rgb(179, 179, 112)' }, // Beige claro
      { background: 'rgba(255, 222, 173, 0.2)', border: 'rgb(217, 8, 224)' }, // Durazno claro
      { background: 'rgba(216, 191, 216, 0.2)', border: 'rgb(164, 14, 233)' }, // Violeta claro
      { background: 'rgba(255, 250, 240, 0.2)', border: 'rgb(236, 7, 148)' }, // Flor de lino
      { background: 'rgba(240, 248, 255, 0.2)', border: 'rgb(233, 17, 17)' }  // Azul Alice
    ];


    this.estudiantesFiltrados.forEach((estudiante, index) => {
      // Filtrar en lugar de encontrar un solo estudiante
      const estudiantesSeleccionados = this.evaluacion.filter(i => i.evaluacion.estudiante.codigo === estudiante.codigo);

      if (!estudiantesSeleccionados.length) {
        console.log(`No se encontraron estudiantes con código: ${estudiante.codigo}`);
        return;
      }
      console.log(estudiantesSeleccionados)
      estudiantesSeleccionados.forEach((estudianteSeleccionado, subIndex) => {
        if (!estudianteSeleccionado.evaluacion || !estudianteSeleccionado.evaluacion.estudiante) {
          console.log(`No se encontró la información del estudiante: ${estudiante.codigo}`);
          return;
        }
        console.log(estudianteSeleccionado)
        // Asegurar que nombre existe
        const nombreEstudiante = estudianteSeleccionado.evaluacion.estudiante.nombre || `Estudiante ${index + 1}-${subIndex + 1}`;

        const valores = [
          estudianteSeleccionado.pases,
          estudianteSeleccionado.tiros,
          estudianteSeleccionado.posicionamiento,
          estudianteSeleccionado.visionJuego,
          estudianteSeleccionado.resistencia,
          estudianteSeleccionado.velocidad,
          estudianteSeleccionado.fuerza,
          estudianteSeleccionado.concentracion,
          estudianteSeleccionado.tomaDecisiones
        ].map(v => Number(v) || 0); // Convertir a número y evitar NaN

        console.log(`Añadiendo datos para ${nombreEstudiante}:`, valores);
        console.log(valores)
        this.chart.data.datasets.push({
          label: `Evaluación de ${nombreEstudiante}`,
          data: valores,
          fill: true,
          backgroundColor: colores[(index + subIndex) % colores.length].background,
          borderColor: colores[(index + subIndex) % colores.length].border,
          pointBackgroundColor: colores[(index + subIndex) % colores.length].border,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colores[(index + subIndex) % colores.length].border
        });
      });
    });

    const dataSet = new Set();
    this.chart.data.datasets = this.chart.data.datasets.filter(dataset => {
      const dataString = JSON.stringify(dataset.data);
      if (dataSet.has(dataString)) {
        return false; // Ya existe, lo eliminamos
      }
      dataSet.add(dataString);
      return true; // Es único, lo mantenemos
    });

    // Asegurar que Chart.js reconozca los cambios
    this.chart.update();
  }



  get totalNotaFinal(): number {
    return this.estudiantesFiltrados?.reduce((sum, estudiante) => sum + (estudiante.notaFinal ?? 0), 0) || 0;
  }

}
