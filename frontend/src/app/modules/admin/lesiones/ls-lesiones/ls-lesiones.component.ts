import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { VisorLesionComponent } from '../visor-lesion/visor-lesion.component';

@Component({
  selector: 'app-ls-lesiones',
  templateUrl: './ls-lesiones.component.html',
  styleUrls: ['./ls-lesiones.component.css']
})
export class LsLesionesComponent implements OnInit {

  row: any;


  volver() {
    throw new Error('Method not implemented.');
  }
  equipo: any
  constructor(private equipoService: EquipoService,
    private lesionService: LesionService,
    private dialog: MatDialog,
    private mensaje: MensajeService,

  ) { }
  equipoSeleccionada: string = '';
  ngOnInit(): void {
    this.listarEquipo()
    this.listarDevEquipo()
    this.lesiones()
  }
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      this.equipo = data;
    });
  }
  asignacion: any
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = []; 
  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      this.estudiantes = data.filter(i => i.estudiante.codigo !== "0000")
      this.asignacion = data;
      this.usuariosFiltrados = [...this.asignacion];
    });
  }
  filtro: string = '';

  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];

  filtrarUsuarios() {

    if (!this.equipoSeleccionada) {
      //ver si esta bien es algo que se esta viendo
      this.estudiantesFiltrados = [...this.estudiantes];
 
      return;
    }

    // Filtrar los estudiantes
    // Suponiendo que this.lesion es un array de códigos de estudiantes lesionados, por ejemplo: ['0058', '0062']
    console.log(this.lesion);

    // Filtrar los estudiantes
    this.estudiantesFiltrados = this.estudiantes.filter(est => {
      const coincideConEquipo = est.equipo && est.equipo.nombre === this.equipoSeleccionada;
      const estaLesionado = this.lesion.includes(est.estudiante.codigo);
      return coincideConEquipo && estaLesionado; // Retorna solo estudiantes del equipo seleccionado y lesionados
    });


    this.estudiantesFiltrados = this.estudiantesFiltrados.map(est => {
      const lesionInfo = this.lesionCompleto.find(lesion => lesion.estudiante.codigo === est.estudiante.codigo);
      return {
        estudiante: est,
        lesionado: lesionInfo ? lesionInfo : null 
      };
    });

  }

  seleccionados: { [key: string]: boolean } = {};
  get profesoresSeleccionados() {
    return this.profesores.filter(profesor => this.seleccionados[profesor.codigo]);
  }
  get profesorevisor() {
    return Object.values(this.seleccionados).filter(value => value).length;
  }
  lesion: any[] = [];
  lesionCompleto: any;
  lesiones() {
    this.lesionService.listarLesionActivado().subscribe((data) => {
      this.lesion = data.map(i => i.estudiante.codigo);
      this.lesionCompleto = data
    });
  }  
  virsor(row) {
   console.log(row)
    const dialogRef = this.dialog.open(VisorLesionComponent, {
      disableClose: true,
      width: '1020px',
      height: '520px',
      data: { row },
    });
  }
}
