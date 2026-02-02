import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Chart, { ChartType } from 'chart.js/auto';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { PdfService } from 'src/app/core/services/pdf.service';

@Component({
  selector: 'app-estadisticas-partido',
  templateUrl: './estadisticas-partido.component.html',
  styleUrls: ['./estadisticas-partido.component.css']
})
export class EstadisticasPartidoComponent implements OnInit {
  volver() {
    throw new Error('Method not implemented.');
  }
  botonesConfig = {
    editar: false,
    volver: true,

  };
  // Atributos para los gráficos
  private chart1!: Chart;
  private chart2!: Chart;
  public chart3: Chart;


  constructor(
    private equipoService: EquipoService,
    private partidoService: PartidoService,
    private loginService: LoginService,

  ) {

  }

  ngOnInit(): void {
    this.listarEquipo()
    this.grafico();
    this.grafico2();
    this.grafico3()
  }

  ngOnDestroy(): void {
    if (this.chart1) this.chart1.destroy();
    if (this.chart2) this.chart2.destroy();
  }

  grafico() {
    let resultados = [];

    this.listaPartidosDashboard = this.datosTabla.filter(i => i.equipo.nombre === this.equipoSeleccionado);

    this.listaPartidosDashboard.forEach(partido => {
      if (partido.marcadorLocal > partido.marcadorVisita) {
        resultados.push(1); // Victoria
      } else if (partido.marcadorLocal < partido.marcadorVisita) {
        resultados.push(-1); // Derrota
      } else {
        resultados.push(0); // Empate
      }
    });

    const labels = this.listaPartidosDashboard.map((_, index) => `Jornada ${index + 1}`);

    const data = {
      labels: labels,
      datasets: [{
        label: 'Resultados de Partidos',
        data: resultados,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.1
      }]
    };

    if (this.chart1) {
      this.chart1.destroy();
    }

    this.chart1 = new Chart("chart1", {
      type: 'line' as ChartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              callback: function (value: number) {
                if (value === 1) return "Victoria";
                if (value === 0) return "Empate";
                if (value === -1) return "Derrota";
                return ""; 
              }

            },
            title: {
              display: true,
              text: 'Resultado'
            },
            min: -1, 
            max: 1  
          },
          x: {
            title: {
              display: true,
              text: 'Jornadas'
            }
          }
        }
      }
    });
  }



  grafico2() {
    let victorias = 0;
    let derrotas = 0;
    let empates = 0;

    this.listaPartidosDashboard = this.datosTabla.filter(i => i.equipo.nombre === this.equipoSeleccionado);

    this.listaPartidosDashboard.forEach(partido => {
      if (partido.marcadorLocal > partido.marcadorVisita) {
        victorias++;
      } else if (partido.marcadorLocal < partido.marcadorVisita) {
        derrotas++;
      } else {
        empates++;
      }
    });

    const totalPartidos = victorias + derrotas + empates;
    const porcentaje = (cantidad: number) => totalPartidos ? ((cantidad / totalPartidos) * 100).toFixed(2) : "0";

    const data = {
      labels: [
        `Victorias (${porcentaje(victorias)}%)`,
        `Derrotas (${porcentaje(derrotas)}%)`,
        `Empates (${porcentaje(empates)}%)`
      ],
      datasets: [{
        label: 'Resultados del Equipo',
        data: [victorias, derrotas, empates], 
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }]
    };

    if (this.chart2) {
      this.chart2.destroy();
    }

    this.chart2 = new Chart("chart2", {
      type: 'pie' as ChartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                let value = tooltipItem.raw;
                let percent = ((value / totalPartidos) * 100).toFixed(2);
                return `${tooltipItem.label}: ${percent}% (${value})`;
              }
            }
          }
        }
      }
    });
  }


  listado: any[] = [];

  datosTabla: any[] = [];
  async listarEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      data = data.filter(item => item.profesor.codigo != "0000");

      const filteredData = data.filter(item =>
        item.profesor &&
        item.profesor.usuario &&
        item.profesor.usuario.codigo != null &&
        item.profesor.usuario.codigo === this.loginService.getUser().ul_codigo
      );
      this.listado = filteredData.map(i => i.equipo.nombre)
      this.listarPartidos()
    })
  }
  user: any = null;
  async listarPartidos() {
    this.partidoService.listarPartidoPasados().subscribe((data) => {
   

      this.user = this.loginService.getUser();
      const listadoNormalizado = this.listado.map(e => e.toLowerCase().trim());
      console.log(this.listado)
      const resultado = data.filter(i =>
        listadoNormalizado.includes(i.equipo.nombre.toLowerCase().trim())
      );

      this.datosTabla = resultado;

    });
  }
  equipoSeleccionado: string
  listaPartidosDashboard
  filtrarUsuarios() {

    this.listaPartidosDashboard = this.datosTabla.filter(i => i.equipo.nombre == this.equipoSeleccionado)
    this.grafico()
    this.grafico2()
    this.grafico3()

  }
  grafico3() {

    let victorias = 0;
    let empates = 0;
    let derrotas = 0;

    this.listaPartidosDashboard.forEach(partido => {
      if (partido.marcadorLocal > partido.marcadorVisita) {
        victorias++;
      } else if (partido.marcadorLocal < partido.marcadorVisita) {
        derrotas++;
      } else {
        empates++;
      }
    });

    const data = {
      labels: ['Victorias', 'Empates', 'Derrotas'],
      datasets: [{
        label: 'Resultados',
        data: [victorias, empates, derrotas], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',  
          'rgba(255, 205, 86, 0.2)', 
          'rgba(255, 99, 132, 0.2)'  
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }]
    };

    if (this.chart3) {
      this.chart3.destroy();
    }

    this.chart3 = new Chart("chart3", {
      type: 'bar' as ChartType,
      data
    });
  }



}
