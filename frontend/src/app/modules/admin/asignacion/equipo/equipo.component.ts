import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { EquipoPerfilComponent } from '../equipo-perfil/equipo-perfil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  row: any;


  volver() {
    throw new Error('Method not implemented.');
  }
  equipo: any
  constructor(private equipoService: EquipoService,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private router: Router,



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
      this.profesores = data.filter(i => i.profesor.codigo !== "0000")
      this.estudiantes = data.filter(i => i.estudiante.codigo !== "0000")
      this.asignacion = data;
      this.usuariosFiltrados = [...this.asignacion];
    });
  }
  filtro: string = '';
  //equipoSeleccionada: string = '';
  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];

  // Método para filtrar profesores y estudiantes según el equipo seleccionado
  filtrarUsuarios() {
    console.log("Equipo seleccionado:", this.equipoSeleccionada); // Verifica el valor del equipo seleccionado

    if (!this.equipoSeleccionada) {
      // Si no se selecciona un equipo, se muestran todos los usuarios
      this.profesoresFiltrados = [];
      this.estudiantesFiltrados = [];
      return;
    }

    // Filtrar los profesores
    this.profesoresFiltrados = this.profesores.filter(profesor => {
      console.log("Profesor:", profesor); // Muestra cada profesor
      const coincideConEquipo = profesor.equipo && profesor.equipo.nombre === this.equipoSeleccionada;
      console.log("Coincide con equipo:", coincideConEquipo); // Muestra si hay coincidencia
      return coincideConEquipo;
    });

    // Filtrar los estudiantes
    this.estudiantesFiltrados = this.estudiantes.filter(estudiante => {
      console.log("Estudiante:", estudiante); // Muestra cada estudiante
      const coincideConEquipo = estudiante.equipo && estudiante.equipo.nombre === this.equipoSeleccionada;
      console.log("Coincide con equipo:", coincideConEquipo); // Muestra si hay coincidencia
      return coincideConEquipo;
    });
  }
  eliminar(row: any) {
    throw new Error('Method not implemented.');
  }
  seleccionados: { [key: string]: boolean } = {};
  get profesoresSeleccionados() {
    return this.profesores.filter(profesor => this.seleccionados[profesor.codigo]);
  }
  get profesorevisor() {
    return Object.values(this.seleccionados).filter(value => value).length;
  }
  // Método para abrir el diálogo
  visor(row: any) {

    console.log(row)
    const dialogRef = this.dialog.open(EquipoPerfilComponent, {
      width: '400px',
      height: '520px',
      data: { row },
    });
  }
}
