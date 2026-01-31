import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { RegLesionesComponent } from '../reg-lesiones/reg-lesiones.component';
import { EditRegDetalleLesionesComponent } from '../edit-reg-detalle-lesiones/edit-reg-detalle-lesiones.component';
import { VisorLesionComponent } from 'src/app/features/admin/lesiones/visor-lesion/visor-lesion.component';

@Component({
  selector: 'app-modulo-lesiones',
  templateUrl: './modulo-lesiones.component.html',
  styleUrls: ['./modulo-lesiones.component.css']
})
export class ModuloLesionesComponent implements OnInit {
  editar(row: any) {
    const dialogRef = this.dialog.open(EditRegDetalleLesionesComponent, {
      disableClose: true,
      width: '850px',
      height: '600px',
      data: {
        lesionCompleto: this.lesionCompleto,
        row: row

      }
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.lesiones()
    })
  }
  registrar() {
    const dialogRef = this.dialog.open(RegLesionesComponent, {
      disableClose: true,
      width: '850px',
      height: '600px',
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.lesiones()
    })
  }



  row: any;


  volver() {
    throw new Error('Method not implemented.');
  }
  equipo: any
  constructor(private equipoService: EquipoService, private loginService: LoginService,
    private lesionService: LesionService,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private router: Router,
  ) { }
  equipoSeleccionada: string = '';

  ngOnInit(): void {
    this.listarDevEquipo()
    this.lesiones()
  }

  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      const equipos = this.asignacion.map(i => i.equipo.nombre); // Array de nombres
      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre)); // Filtra los que coincidan
      this.equipo = equiposFiltrados;
    });
  }
  asignacion: any
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = [];
  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      this.estudiantes = data.filter(i => i.estudiante.codigo !== "0000")
  
      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);

      this.asignacion = usuariosCodigo;
      this.listarEquipo()
      this.usuariosFiltrados = [...this.asignacion];
    });
  }
  filtro: string = '';

  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];

  filtrarUsuarios() {

    if (!this.equipoSeleccionada) {
      this.estudiantesFiltrados = [...this.estudiantes];
      return;
    }

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
