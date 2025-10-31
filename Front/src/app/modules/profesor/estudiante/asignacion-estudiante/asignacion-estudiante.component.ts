import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Historial } from 'src/app/model/historial';
import { EquipoPerfilComponent } from 'src/app/modules/admin/asignacion/equipo-perfil/equipo-perfil.component';
import { EquipoService } from 'src/app/services/equipo.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-asignacion-estudiante',
  templateUrl: './asignacion-estudiante.component.html',
  styleUrls: ['./asignacion-estudiante.component.css']
})
export class AsignacionEstudianteComponent implements OnInit {
  row: any;


  volver() {
    throw new Error('Method not implemented.');
  }
  equipo: any
  capitanOriginal: any = null;
  constructor(private equipoService: EquipoService,    private historialService: HistorialService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private router: Router,
  ) { }
  equipoSeleccionada: string = '';
  ngOnInit(): void {
    //this.listarEquipo()
    this.listarDevEquipo()
    this.actualizarNumerosOcupados();
    this.capitanOriginal = this.estudiantesFiltrados.find(e => e.esCapitan) || null;
    this.capitanSeleccionado = !!this.capitanOriginal;
  }
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      const equipos = this.asignacion.map(i => i.equipo.nombre); // Array de nombres
      console.log("Equipos:", equipos);

      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre)); // Filtra los que coincidan
      console.log("Equipos filtrados:", equiposFiltrados);

      this.equipo = equiposFiltrados;
    });
  }
  asignacion: any
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = []; // Lista filtrada de usuarios
  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      console.log(this.loginService.getUser().ul_codigo)
      //  console.log(data.filter(i=>i.profesor.usuario.codigo==this.loginService.getUser().ul_codigo))
      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);

      console.log(usuariosCodigo);


      console.log(data.filter(i => i.profesor.codigo !== "0000"))
      this.profesores = data.filter(i => i.profesor.codigo !== "0000")
      this.estudiantes = data.filter(i => i.estudiante.codigo !== "0000")
      this.asignacion = usuariosCodigo;
      this.usuariosFiltrados = [...this.asignacion];
      this.listarEquipo()
    });
  }
  filtro: string = '';
  //equipoSeleccionada: string = '';
  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];

  // Método para filtrar profesores y estudiantes según el equipo seleccionado
  filtrarUsuarios() {
    console.log("Equipo seleccionado:", this.equipoSeleccionada);
    if (!this.equipoSeleccionada) {
      // Si no se selecciona un equipo, se muestran todos los usuarios
      this.profesoresFiltrados = [];
      this.estudiantesFiltrados = [];
      return;
    }



    // Filtrar los estudiantes
    this.estudiantesFiltrados = this.estudiantes.filter(estudiante => {
      console.log("Estudiante:", estudiante); // Muestra cada estudiante
      const coincideConEquipo = estudiante.equipo && estudiante.equipo.nombre === this.equipoSeleccionada;
      console.log("Coincide con equipo:", coincideConEquipo); // Muestra si hay coincidencia
      
      return coincideConEquipo;
    });
    this.verificarSiHayCapitan();
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

  editarEstudiante(estudiante: any) {
    if (estudiante.editando) {
      // Aquí podrías llamar a un servicio para actualizar los datos en el backend
      console.log("Guardando cambios:", estudiante);
    }
    estudiante.editando = !estudiante.editando;
  }
  modoEdicion: boolean = false;
  posiciones: string[] = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];
  numerosCamiseta: number[] = Array.from({ length: 100 }, (_, i) => i);

  toggleEdicion() {
    if (this.modoEdicion) {
      console.log(this.estudiantesFiltrados)
      // Filtrar solo los datos que quieres guardar
      const estudiantesAActualizar = this.estudiantesFiltrados.map(est => ({
        codigo: est.codigo,
        numeroCamiseta: est.numeroCamiseta,
        posicion: est.posicion,
        esCapitan: est.esCapitan,
        comentarios: est.comentarios,
        estado: est.estado,
        fechaCreacion: est.fechaCreacion,
        horaCreacion: est.horaCreacion,
        fechaActualizacion:est.fechaActualizacion,
        horaActualizacion: est.horaActualizacion,
        usuarioRegistro: est.usuarioRegistro,
        usuarioActualizacion: est.usuarioActualizacion,
        profesor:est.profesor.codigo,
        estudiante:est.estudiante.codigo,
        equipo:est.equipo.codigo
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
      
console.log(estudiantesAActualizar)


    }
    this.modoEdicion = !this.modoEdicion;
  }



  capitanSeleccionado: boolean = false;
  async verificarSiHayCapitan() {
    console.log(this.estudiantesFiltrados)
    this.capitanSeleccionado = this.estudiantesFiltrados.some(est => est.esCapitan);
  }
  
  verificarCapitan(estudiante: any) {
   console.log(estudiante)
   console.log(this.estudiantesFiltrados)
    if (estudiante.esCapitan) {
      console.log("hola")
      this.capitanSeleccionado = true;
    } else {
      console.log("hola")
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
  numerosOcupados: Set<number> = new Set();
  numerosDisponibles(estudianteActual: any): number[] {
 
    return this.numerosCamiseta.filter(num =>
      !this.numerosOcupados.has(num) || estudianteActual.numeroCamiseta === num
    );
  }

  verificarNumeroCamiseta(estudiante: any) {
    this.actualizarNumerosOcupados();
  }

}
