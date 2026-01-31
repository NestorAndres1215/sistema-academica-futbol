import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-grafico-estudiante-evaluacion',
  templateUrl: './grafico-estudiante-evaluacion.component.html',
  styleUrls: ['./grafico-estudiante-evaluacion.component.css']
})
export class GraficoEstudianteEvaluacionComponent implements OnInit {
  @ViewChild('radarChart', { static: false }) radarChartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  codigo!: string;
  evaluacion: any[] = [];
  estudiante: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private evaluacionService: EvaluacionService,
    private router: Router
  ) {}
  
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
        this.evaluacion = data.filter(i => 
          i.evaluacion.estudiante.usuario.codigo == this.loginService.getUser().ul_codigo && i.estado == false
        );
        console.log(this.evaluacion);
        this.estudiante = this.evaluacion.map(i => i.evaluacion.estudiante);
        this.actualizarGrafico();
      },
      (error) => {
        console.error('Error al listar evaluaciones:', error);
      }
    );
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
        datasets: [{
          label: 'Evaluación',
          data: [],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
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
    if (!this.chart || this.evaluacion.length === 0) return;
    console.log(this.evaluacion)
    const estudianteSeleccionado = this.evaluacion[0]; // Tomamos el primer estudiante de la lista
  console.log(estudianteSeleccionado)
    if (!estudianteSeleccionado) {
      console.log("No se encontró el estudiante.");
      return;
    }
  
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

    console.log(valores);
  
    this.chart.data.datasets[0].data = valores;
    this.chart.update();
  }
  

}
