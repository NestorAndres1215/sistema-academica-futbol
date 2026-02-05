import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalEliminacionComponent } from '../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Router } from '@angular/router';
import { ListEstudianteComponent } from '../../estudiante/list-estudiante/list-estudiante.component';
import { VisorEqupoComponent } from '../visor-equpo/visor-equpo.component';
import { GeneralService } from 'src/app/core/services/general.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { CODIGO_GENERO, GENERO } from 'src/app/core/constants/usuario';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-ls-des-equipo',
  templateUrl: './ls-des-equipo.component.html',
  styleUrls: ['./ls-des-equipo.component.css']
})
export class LsDesEquipoComponent implements OnInit {
  sedes: any[] = [];
  generos: any[] = [];
  sedeSeleccionada: string = '';
  generoSeleccionado: string = '';
  filtro: string = '';
  listar: any[] = [];
  usuariosFiltrados: any[] = [];
  totalItems: number;
  pageSize = 5;
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private equipo: EquipoService,
    private generales: GeneralService, private sede: SedeService,
    private change: ChangeDetectorRef,
    private loginService: LoginService,
    private historialService: HistorialService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<ListEstudianteComponent>,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.listaGenero()
    this.listarSede()
    this.listarDesactivado()
  }
  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }


  pageChanged(event: PageEvent) {
    console.log(event)
    this.totalItems = this.datosTabla.length
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.usuariosFiltrados = this.datosTabla.slice(startIndex, endIndex);
  }


  async listarDesactivado() {
    this.equipo.listarDesactivado().subscribe((data) => {
      console.log(data)
      this.datosTabla = data;
      this.pagedData = data
      this.listar = data;
      this.usuariosFiltrados = [...this.listar];
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });

      this.change.markForCheck();
    })
  }


  filtrarUsuarios(): void {

    if (!this.listar || this.listar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase();

    this.usuariosFiltrados = this.listar.filter((usuario) => {

      const coincideConTexto =
        (usuario.nombre && usuario.nombre.toLowerCase().includes(term));

      const coincideConSede =
        !this.sedeSeleccionada || (usuario.sede && usuario.sede.toLowerCase() === this.sedeSeleccionada.toLowerCase());

      const coincideConGenero =
        !this.generoSeleccionado ||
        (this.generoSeleccionado === CODIGO_GENERO.FEMENINO && usuario.genero.toLowerCase() === GENERO.FEMENINO) ||
        (this.generoSeleccionado === CODIGO_GENERO.FEMENINO && usuario.genero.toLowerCase() === GENERO.MASCULINO);

      return coincideConTexto && coincideConSede && coincideConGenero;
    });
  }

  volver() {
    this.dialogRe.close();
  }


  eliminar(row: any) {
    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      disableClose: true,
      width: '500px',
      data: {
        row,
        titulo: 'Restaurar',
        subtitulo: `¿Deseas restaurar el usuario ${row.nombre} con el codigo ${row.codigo} ? `
      },

    });
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} eliminó al estudiante ${row.nombre} con el código ${row.codigo}.`
      };
      this.equipo.activar(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
          this.listarDesactivado();
        },
      });

    })
  }

  visor(row: any) {
    const dialogRef = this.dialog.open(VisorEqupoComponent, {
      disableClose: true,
      width: '1050px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Elemento eliminado');
      }
    });
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      this.generos = data;
    })
  }

  listarSede(): void {
    this.sede.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      },
    );
  }
}
