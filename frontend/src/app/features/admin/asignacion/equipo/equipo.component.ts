import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { EquipoPerfilComponent } from '../equipo-perfil/equipo-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  row: any;
  botonesConfig = {
    editar: false,
    volver: true,

  };

  botonesConfigTableEstudiante = {
    ver: true,

  };
  botonesConfigTableProfesor = {
    ver: true,

  };
  columnasEstudiantes = [
    { etiqueta: 'Nombre', clave: 'nombreCompleto' },
    { etiqueta: 'Acciones', clave: 'acciones' }
  ];

  columnasProfesores = [
    { etiqueta: 'Nombre', clave: 'nombreCompleto' },
    { etiqueta: 'Acciones', clave: 'acciones' }
  ];

  volver() {
    throw new Error('Method not implemented.');
  }
  equipo: any
  constructor(private equipoService: EquipoService,
    private dialog: MatDialog,
  ) { }

  equipoSeleccionada: string = '';

  ngOnInit(): void {
    this.listarEquipo()
    this.listarDevEquipo()
  }
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      console.log(data)
      this.equipo = data;
    });
  }
  asignacion: any
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = []; // Lista filtrada de usuarios
  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      console.log(data.filter(i => i.profesor.codigo !== "0000"))
      this.profesores = data
        .filter(i => i.profesor.codigo !== "0000")
        .map(p => ({
          ...p,
          nombreCompleto: NombreCompleto(p.profesor)
        }));

      // Estudiantes válidos
      this.estudiantes = data
        .filter(i => i.estudiante.codigo !== "0000")
        .map(e => ({
          ...e,
          nombreCompleto: NombreCompleto(e.estudiante)
        }));
      this.asignacion = data;
      this.usuariosFiltrados = [...this.asignacion];
    });
  }


  filtro: string = '';

  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];


  filtrarUsuarios() {

    if (!this.equipoSeleccionada) {
      this.profesoresFiltrados = [];
      this.estudiantesFiltrados = [];
      return;
    }
    this.profesoresFiltrados = this.profesores.filter(profesor => {
      const coincideConEquipo = profesor.equipo && profesor.equipo.nombre === this.equipoSeleccionada;
      return coincideConEquipo;
    });


    this.estudiantesFiltrados = this.estudiantes.filter(estudiante => {
      const coincideConEquipo = estudiante.equipo && estudiante.equipo.nombre === this.equipoSeleccionada;
      return coincideConEquipo;
    });
  }

  seleccionados: { [key: string]: boolean } = {};
  get profesoresSeleccionados() {
    return this.profesores.filter(profesor => this.seleccionados[profesor.codigo]);
  }
  get profesorevisor() {
    return Object.values(this.seleccionados).filter(value => value).length;
  }


  visor(row: any) {
    console.log(row)
    const dialogRef = this.dialog.open(EquipoPerfilComponent, {
      width: '400px',
      height: '520px',
      data: { row },
    });
  }
}
