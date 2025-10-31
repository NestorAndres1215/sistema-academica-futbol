import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VisorSedeComponent } from '../visor-sede/visor-sede.component';
import { Respuesta } from 'src/app/model/respuesta';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { SedeService } from 'src/app/services/sede.service';
import { SedeComponent } from '../sede/sede.component';
import { ModalEliminacionComponent } from '../../../components/modal-eliminacion/modal-eliminacion.component';
import { LoginService } from 'src/app/services/login.service';
import { HistorialService } from 'src/app/services/historial.service';
import { Historial } from 'src/app/model/historial';

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
    private loginService:LoginService,
    private historialService:HistorialService,
    private change: ChangeDetectorRef,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<SedeComponent>,
    private route: Router,
    private mensajeService: MensajeService
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
    this.usuariosFiltrados = this.pagedData.filter(usuario =>
      (usuario.nombre)
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
  
      // Crear el objeto de historial para registrar la acción de restaurar sede
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} restauró el sede ${row.nombre} con el código ${row.codigo}.`
      };
  
      // Registrar el historial primero
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con la restauración de la sede
          this.sede.activarSede(row.codigo).subscribe(result => {
            console.log(result);
            this.mensajeService.MostrarMensajeExito("Se restauró correctamente la sede");
            this.listarDesactivado(); // Actualizar la lista de sedes desactivadas
          });
        },
        error => {
          // Si hubo un error al registrar el historial, mostrar un mensaje de error
          this.mensajeService.MostrarBodyError('Error al registrar el historial: ' + error);
        }
      );
  
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
