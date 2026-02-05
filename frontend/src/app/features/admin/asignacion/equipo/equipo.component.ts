import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/core/services/equipo.service';

import { MatDialog } from '@angular/material/dialog';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';
import { Router } from '@angular/router';
import { ModalPerfilComponent } from 'src/app/shared/modal/modal-perfil/modal-perfil.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  row: any;


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


  equipo: any


  constructor(
    private equipoService: EquipoService, 
    private router: Router,
    private dialog: MatDialog,
  ) { }

  equipoSeleccionada: string = '';

  ngOnInit(): void {
    this.listarEquipo()
    this.listarDevEquipo()
  }
 opcionesEquipo: string[] = [];

  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      console.log(data)
      this.equipo = data;
        this.opcionesEquipo = this.equipo.map(s => s.nombre);
    });
  }

  asignacion: any[] = [];
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = [];
  
  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {

      this.profesores = data
        .filter(i => i.profesor.codigo !== "0000")
        .map(p => ({
          ...p,
          nombreCompleto: NombreCompleto(p.profesor)
        }));

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
 columnasDetalleEstudiante = [
    { clave: 'estudiante.usuario.username', etiqueta: 'Usuario' },
    { clave: 'estudiante.primerNombre', etiqueta: 'Nombre' },
    { clave: 'estudiante.apellidoPaterno', etiqueta: 'Apellido' },
    { clave: 'estudiante.correo', etiqueta: 'Correo', },
    { clave: 'estudiante.telefono', etiqueta: 'Teléfono' },
    { clave: 'estudiante.sede.nombre', etiqueta: 'Sede' },

  ];
  tipoUsuario: 'admin' | 'profesor' = 'admin';
  visorEstudiante(perfil: any) {
    console.log( perfil)
    const dialogRef = this.dialog.open(ModalPerfilComponent, {
      width: '400px',
      height: '470px',
      data: {
        perfiles: [perfil],
        columnas: this.columnasDetalleEstudiante,
        tipoUsuario: this.tipoUsuario
      }
    });
  }
  
  columnasDetalleProfesor = [
    { clave: 'profesor.usuario.username', etiqueta: 'Usuario' },
    { clave: 'profesor.primerNombre', etiqueta: 'Nombre' },
    { clave: 'profesor.apellidoPaterno', etiqueta: 'Apellido' },
    { clave: 'profesor.correo', etiqueta: 'Correo', },
    { clave: 'profesor.telefono', etiqueta: 'Teléfono' },
    { clave: 'profesor.sede.nombre', etiqueta: 'Sede' },

  ];

  visorProfesor(perfil: any) {
    console.log( perfil)
    const dialogRef = this.dialog.open(ModalPerfilComponent, {
      width: '400px',
      height: '470px',
      data: {
        perfiles: [perfil],
        columnas: this.columnasDetalleProfesor,
        tipoUsuario: this.tipoUsuario
      }
    });
  }
}
