import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EditDevComponent } from '../edit-dev/edit-dev.component';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GeneralService } from 'src/app/core/services/general.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { Router } from '@angular/router';
import { ModalEliminacionComponent } from '../../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { RegDevComponent } from '../reg-dev/reg-dev.component';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LstDesLtDevComponent } from '../lst-des-lt-dev/lst-des-lt-dev.component';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-lt-dev',
  templateUrl: './lt-dev.component.html',
  styleUrls: ['./lt-dev.component.css']
})
export class LtDevComponent implements OnInit {



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
    private generales: GeneralService,
    private change: ChangeDetectorRef,
    private mensaje: MensajeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService: LoginService,
    private historialService: HistorialService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    private route: Router,
    private mensajeService: MensajeService
  ) { }
  codigo: string
  descripcion: string
  ngOnInit(): void {
    this.codigo = this.data.row.codigo
    this.descripcion = this.data.row.descripcion1
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
    this.generales.listarGeneralDevActivado(this.codigo).subscribe((data) => {
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
      (usuario.descripcion1)
        .toLowerCase()
        .includes(term)
    );
  }
  volver() {
    this.dialogRe.close();
  }


  eliminar(row: any) {
    console.log(row)
    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      width: '500px',
      data: {
        row,
        titulo: 'Eliminar',
        subtitulo: `¿Deseas eliminar el tabla general  ${row.descripcion1} con el codigo ${row.codigo} ? `
      },

    });
    console.log(row)

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;

      this.generales.desactivarGeneralGen(row.codigo).subscribe(result => {
        // Crear el historial
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
          detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
        };

        console.log(historial);

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensajeService.MostrarMensajeExito("Se desactivó correctamente las tabla general");
            this.listarDesactivado(); // Actualizar la lista de cargos
          },
          error => {
            this.mensaje.MostrarBodyError(error); // Manejar error al registrar el historial
          }
        );
      }, error => {
        this.mensaje.MostrarBodyError(error); // Manejar error al desactivar el cargo
      });
    });

  }



  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorTbGeneralComponent, {
      disableClose: true,
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
  editar(row: any) {
    const dialogRef = this.dialog.open(EditDevComponent, {

      width: '550px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.listarDesactivado();

    });
  }
  operar() {
    console.log(this.codigo)
    const codigo = this.codigo
    const dialogRef = this.dialog.open(RegDevComponent, {
      width: '700px',
      height: '400px',
      data: {
        codigo
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarDesactivado()
    })
  }
  Ver() {
   const dialogRef = this.dialog.open(LstDesLtDevComponent, {
         disableClose: true ,
         width: '1050px',
         height: '650px',
       });
   
       dialogRef.afterClosed().subscribe(data => {
         this.listarDesactivado()
       })
  }
}
