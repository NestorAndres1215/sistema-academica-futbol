import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { VisorLesionComponent } from '../visor-lesion/visor-lesion.component';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ls-lesiones',
  templateUrl: './ls-lesiones.component.html',
  styleUrls: ['./ls-lesiones.component.css']
})
export class LsLesionesComponent implements OnInit {

  row: any;
  equipo: any;
  equipoSeleccionada: string = '';

  asignacion: any;
  estudiantes: any[] = [];
  estudiantesFiltrados: any[] = [];
  usuariosFiltrados: any[] = [];
  lesion: any[] = [];
  lesionCompleto: any;

  botonesConfig = { editar: false, volver: true };
  botonesConfigTable = { ver: true };

  columnas = [
    { etiqueta: 'Código', clave: 'estudiante.codigo' },
    { etiqueta: 'Nombre', clave: 'nombreCompleto' },
    { etiqueta: 'Lesión', clave: 'lesionado.tipoLesion' },
    { etiqueta: 'Fecha de la Lesión', clave: 'lesionado.fechaLesion' },
    { etiqueta: 'Gravedad', clave: 'lesionado.gravedad' },
  ];

  // Paginación
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  totalItems: number;
  datosTabla: any[] = [];
  pagedData: any[] = [];

  constructor(
    private equipoService: EquipoService,
    private lesionService: LesionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarEquipo();
    this.listarDevEquipo();
    this.lesiones();
  }

  volver() {
    // Lógica de volver
  }

  listarEquipo() {
    this.equipoService.listarActivado().subscribe(data => {
      this.equipo = data;
    });
  }

  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe(data => {

      this.estudiantes = data
        .filter(i => i.estudiante.codigo !== "0000")
        .map(i => ({
          ...i,
          nombreCompleto: NombreCompleto(i.estudiante)
        }));

      this.asignacion = data;

      this.estudiantesFiltrados = this.estudiantes.filter(est =>
        this.lesion.includes(est.estudiante.codigo)
      ).map(est => {
        const lesionInfo = this.lesionCompleto.find(l => l.estudiante.codigo === est.estudiante.codigo);
        return {
          ...est,
          estudiante: est,
          lesionado: lesionInfo ? lesionInfo : null
        };
      });

      this.datosTabla = [...this.estudiantesFiltrados];
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.datosTabla.length });
    });
  }


  lesiones() {
    this.lesionService.listarLesionActivado().subscribe(data => {
      this.lesion = data.map(i => i.estudiante.codigo);
      this.lesionCompleto = data;
    });
  }

  filtrarUsuarios() {
    let filtrados: any[];

    if (!this.equipoSeleccionada) {
      filtrados = this.estudiantes.filter(est => this.lesion.includes(est.estudiante.codigo));
    } else {
      filtrados = this.estudiantes.filter(est => {
        const coincideConEquipo = est.equipo && est.equipo.nombre === this.equipoSeleccionada;
        const estaLesionado = this.lesion.includes(est.estudiante.codigo);
        return coincideConEquipo && estaLesionado;
      });
    }

    this.estudiantesFiltrados = filtrados.map(est => {
      const lesionInfo = this.lesionCompleto.find(lesion => lesion.estudiante.codigo === est.estudiante.codigo);
      return {
        ...est, 
        estudiante: est,
        lesionado: lesionInfo ? lesionInfo : null
      };
    });

    this.datosTabla = [...this.estudiantesFiltrados];
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.datosTabla.length });
  }


  virsor(row: any) {
    this.dialog.open(VisorLesionComponent, {
      disableClose: true,
      width: '1020px',
      height: '520px',
      data: { row },
    });
  }

  pageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
    this.totalItems = this.datosTabla.length;
  }
}
