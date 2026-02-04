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
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';

@Component({
  selector: 'app-modulo-lesiones',
  templateUrl: './modulo-lesiones.component.html',
  styleUrls: ['./modulo-lesiones.component.css']
})
export class ModuloLesionesComponent implements OnInit {

  row: any[] = [];
  equipo: any[] = [];
  equipoSeleccionada: string = '';
  asignacion: any[] = [];
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = [];
  filtro: string = '';
  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];
  seleccionados: { [key: string]: boolean } = {};
  lesion: any[] = [];
  lesionCompleto: any;

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

    dialogRef.afterClosed().subscribe(data => {
      this.lesiones()
    })
  }

  botonesConfig = {
    editar: false,
    volver: true,

  };

  volver() {
    throw new Error('Method not implemented.');
  }

  constructor(private equipoService: EquipoService, private loginService: LoginService,
    private lesionService: LesionService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.listarDevEquipo()
    this.lesiones()
  }
  opcionesEquipo: string[] = [];
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      const equipos = this.asignacion.map(i => i.equipo.nombre);
      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre));
      this.equipo = equiposFiltrados;
      this.opcionesEquipo = this.equipo.map(s => s.nombre);
    });
  }
  columnas = [
    { etiqueta: 'Código', clave: 'estudiante.codigo' },
  { etiqueta: 'Nombre', clave: 'estudiante.nombreCompleto' },
    { etiqueta: 'Lesión', clave: 'lesionado.tipoLesion' },
    { etiqueta: 'Fecha de la Lesión', clave: 'lesionado.fechaLesion' },
    { etiqueta: 'Gravedad', clave: 'lesionado.gravedad' },
  ];
  botonesConfigTable = { ver: true, editar: true };

  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      this.estudiantes = data
        .filter(i => i.estudiante.codigo !== "0000")
        .map(i => ({
          ...i,
          nombreCompleto: NombreCompleto(i.estudiante)
        }));

      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);
      this.asignacion = usuariosCodigo;
      this.listarEquipo()
      this.usuariosFiltrados = [...this.asignacion];
    });
  }

  filtrarUsuarios() {
    console.log(this.equipoSeleccionada)
    if (!this.equipoSeleccionada) {
      this.estudiantesFiltrados = []; // nada se muestra
      return;
    }

    this.estudiantesFiltrados = this.estudiantes.filter(est => {
      const coincideConEquipo = est.equipo && est.equipo.nombre === this.equipoSeleccionada;
      const estaLesionado = this.lesion.includes(est.estudiante.codigo);
      return coincideConEquipo && estaLesionado;
    });

this.estudiantesFiltrados = this.estudiantesFiltrados.map(est => {
  console.log(est)
  const lesionInfo = this.lesionCompleto.find(lesion => lesion.estudiante.codigo === est.estudiante.codigo);
  return {
    estudiante: est,
    lesionado: lesionInfo ? lesionInfo : null
  };
});
console.log(this.estudiantesFiltrados)
  }


  lesiones() {
    this.lesionService.listarLesionActivado().subscribe((data) => {
      this.lesion = data.map(i => i.estudiante.codigo);
      this.lesionCompleto = data
    });
  }

  virsor(row) {
    const dialogRef = this.dialog.open(VisorLesionComponent, {
      disableClose: true,
      width: '1020px',
      height: '520px',
      data: { row },
    });
  }
}
