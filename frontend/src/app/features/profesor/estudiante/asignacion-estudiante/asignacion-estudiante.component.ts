import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { POSICIONES } from 'src/app/core/constants/posiciones';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Historial } from 'src/app/core/model/historial';
import { EquipoPerfilComponent } from 'src/app/features/admin/asignacion/equipo-perfil/equipo-perfil.component';


@Component({
  selector: 'app-asignacion-estudiante',
  templateUrl: './asignacion-estudiante.component.html',
  styleUrls: ['./asignacion-estudiante.component.css']
})
export class AsignacionEstudianteComponent implements OnInit {

  row: any;
  asignacion: any
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = [];
  equipo: any
  capitanOriginal: any = null;
  equipoSeleccionada: string = '';
  filtro: string = '';
  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];
  seleccionados: { [key: string]: boolean } = {};
  modoEdicion: boolean = false;
 botonesConfig = {
    editar: false,
    volver: true,

  };
  posiciones = POSICIONES;
  numerosCamiseta: number[] = Array.from({ length: 100 }, (_, i) => i);
  capitanSeleccionado: boolean = false;
  numerosOcupados: Set<number> = new Set();

  constructor(
    private equipoService: EquipoService, 
    private historialService: HistorialService,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) { }



  ngOnInit(): void {

    this.listarDevEquipo()
    this.actualizarNumerosOcupados();
    this.capitanOriginal = this.estudiantesFiltrados.find(e => e.esCapitan) || null;
    this.capitanSeleccionado = !!this.capitanOriginal;
  }

  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      const equipos = this.asignacion.map(i => i.equipo.nombre); // Array de nombres
      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre)); // Filtra los que coincidan
      this.equipo = equiposFiltrados;
    });
  }


  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);

      this.profesores = data.filter(i => i.profesor.codigo !== "0000")
      this.estudiantes = data.filter(i => i.estudiante.codigo !== "0000")
      this.asignacion = usuariosCodigo;
      this.usuariosFiltrados = [...this.asignacion];
      this.listarEquipo()
    });
  }


  filtrarUsuarios() {

    if (!this.equipoSeleccionada) {
      this.profesoresFiltrados = [];
      this.estudiantesFiltrados = [];
      return;
    }
    this.estudiantesFiltrados = this.estudiantes.filter(estudiante => {
      const coincideConEquipo = estudiante.equipo && estudiante.equipo.nombre === this.equipoSeleccionada;
      return coincideConEquipo;
    });
    this.verificarSiHayCapitan();
  }


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

  editarEstudiante(estudiante: any) {
    if (estudiante.editando) {
      console.log("Guardando cambios:", estudiante);
    }
    estudiante.editando = !estudiante.editando;
  }


  toggleEdicion() {
    if (this.modoEdicion) {

      const estudiantesAActualizar = this.estudiantesFiltrados.map(est => ({
        codigo: est.codigo,
        numeroCamiseta: est.numeroCamiseta,
        posicion: est.posicion,
        esCapitan: est.esCapitan,
        comentarios: est.comentarios,
        estado: est.estado,
        fechaCreacion: est.fechaCreacion,
        horaCreacion: est.horaCreacion,
        fechaActualizacion: est.fechaActualizacion,
        horaActualizacion: est.horaActualizacion,
        usuarioRegistro: est.usuarioRegistro,
        usuarioActualizacion: est.usuarioActualizacion,
        profesor: est.profesor.codigo,
        estudiante: est.estudiante.codigo,
        equipo: est.equipo.codigo
      }));
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} actualizo equipo.`
      };

      this.equipoService.actualizarAsignacion(estudiantesAActualizar).subscribe({
        next: (data) => {
          this.historialService.registrar(historial).subscribe({
            next: () => {
              this.listarEquipo();
            },
            error: (err) => {
              console.error("Error al registrar el historial:", err);
            }
          });
        },
        error: (err) => {
          console.error("Error al actualizar la asignación:", err);
        }
      });
    }
    this.modoEdicion = !this.modoEdicion;
  }

  async verificarSiHayCapitan() {
    this.capitanSeleccionado = this.estudiantesFiltrados.some(est => est.esCapitan);
  }

  verificarCapitan(estudiante: any) {
    if (estudiante.esCapitan) {
      this.capitanSeleccionado = true;
    } else {
      this.verificarSiHayCapitan();
    }
  }

  actualizarNumerosOcupados() {
    this.numerosOcupados.clear();
    this.estudiantesFiltrados.forEach(e => {
      if (e.numeroCamiseta !== null && e.numeroCamiseta !== undefined) {
        this.numerosOcupados.add(e.numeroCamiseta);
      }
    });
  }

  numerosDisponibles(estudianteActual: any): number[] {
    return this.numerosCamiseta.filter(num =>
      !this.numerosOcupados.has(num) || estudianteActual.numeroCamiseta === num
    );
  }

  verificarNumeroCamiseta(estudiante: any) {
    this.actualizarNumerosOcupados();
  }

  volver() {
    throw new Error('Method not implemented.');
  }
}
