import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VisorClaseComponent } from '../visor-clase/visor-clase.component';
import { ModalEliminacionComponent } from '../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';

import { LsClaseComponent } from '../ls-clase/ls-clase.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { ClaseService } from 'src/app/core/services/clase.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-lis-des-clase',
  templateUrl: './lis-des-clase.component.html',
  styleUrls: ['./lis-des-clase.component.css']
})
export class LisDesClaseComponent implements OnInit {
  constructor(
    private equipo: EquipoService,
    private claseService:ClaseService,
    private change: ChangeDetectorRef,
    private loginService:LoginService,
    private historialService:HistorialService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<LsClaseComponent>,
    private route: Router,
    private mensajeService: MensajeService
  ) { }

  listar: any[] = [];
  usuariosFiltrados: any[] = [];
  totalItems: number;
  pageSize = 5;
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    this.claseService.listarClaseDesactivado().subscribe((data) => {
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
      this.equipo.activar(row.codigo).subscribe(result => {
        console.log(result);

        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Usuario que realiza la acción
          detalle: `El usuario ${this.loginService.getUser().username} eliminó al estudiante ${row.nombre} con el código ${row.codigo}.`
        };
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensajeService.MostrarMensajeExito("Se activar correctamente el estudiante.");
            this.listarDesactivado();  // Actualizar la lista de cargos
          },
          error => {
            this.mensajeService.MostrarBodyError(error); // Manejar error al registrar el historial
          }
        );
      });

    })
  }

  visor(row: any) {
    const dialogRef = this.dialog.open(VisorClaseComponent, {
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



}
