import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VisorSedeComponent } from '../visor-sede/visor-sede.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SedeService } from 'src/app/core/services/sede.service';
import { SedeComponent } from '../sede/sede.component';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';
import { AlertService } from 'src/app/core/services/alert.service';
import { firstValueFrom } from 'rxjs';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';


@Component({
  selector: 'app-lst-des-sede',
  templateUrl: './lst-des-sede.component.html',
  styleUrls: ['./lst-des-sede.component.css']
})
export class LstDesSedeComponent implements OnInit {
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
    private sede: SedeService,
    private loginService: LoginService,
    private historialService: HistorialService,
    private change: ChangeDetectorRef,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<SedeComponent>,
    private route: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
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
    this.sede.listarSedeDesactivado().subscribe((data) => {
      console.log(data)
      this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });

      this.change.markForCheck();
    })
  }


  filtrarUsuarios() {
    if (!this.pagedData || this.pagedData.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.pagedData.filter(usuario => (usuario.nombre)
      .toLowerCase()
      .includes(term)
    );
  }
  volver() {
    this.dialogRe.close();
  }

  eliminar(row: any) {

    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      width: '500px',
      data: {
        row,
        titulo: 'Restaurar',
        subtitulo: `¿Deseas restaurar el usuario ${row.nombre} con el codigo ${row.codigo}?`
      },
    });

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;

      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} restauró el sede ${row.nombre} con el código ${row.codigo}.`
      };

      this.sede.activarSede(row.codigo).subscribe({
        next: async () => {
          await firstValueFrom(this.historialService.registrar(historial));
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
          this.listarDesactivado();
        },
      });
    });
  }

  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorSedeComponent, {
      width: '550px',
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

}
