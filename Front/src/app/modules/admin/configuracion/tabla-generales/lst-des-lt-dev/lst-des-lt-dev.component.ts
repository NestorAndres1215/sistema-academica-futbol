import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Historial } from 'src/app/model/historial';
import { Respuesta } from 'src/app/model/respuesta';
import { GeneralService } from 'src/app/services/general.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { LsTablaGeneralComponent } from '../ls-tabla-general/ls-tabla-general.component';
import { MensajeService } from 'src/app/services/mensaje.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VisorTbGeneralComponent } from '../visor-tb-general/visor-tb-general.component';
import { ModalEliminacionComponent } from '../../../components/modal-eliminacion/modal-eliminacion.component';

@Component({
  selector: 'app-lst-des-lt-dev',
  templateUrl: './lst-des-lt-dev.component.html',
  styleUrls: ['./lst-des-lt-dev.component.css']
})
export class LstDesLtDevComponent implements OnInit {

volver() {
    this.dialogRe.close();
  }





  user: any = null;
  xd: any
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number;
  pageSize = 5;
  listar: any
  constructor(
    private generalService: GeneralService,
    private dialog: MatDialog,
    private loginService:LoginService,
    private historialService:HistorialService,
    private dialogRe: MatDialogRef<LsTablaGeneralComponent>,
    private change: ChangeDetectorRef,
    private mensjae: MensajeService,

    private route: Router
  ) {
    this.pageChanged({
      pageIndex: 0, pageSize: this.pageSize,
      length: 0
    });
  }

  ngOnInit(): void {
    this.listarGeneral()
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
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
  }
  async listarGeneral() {
    this.generalService.listarGeneralDevDesactivado().subscribe((data) => {
      console.log(data)
      this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });

      this.change.markForCheck();
    })
  }

  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorTbGeneralComponent, {
      disableClose: true ,
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

      this.generalService.activarGeneralGen(row.codigo).subscribe(result => {
        // Crear el historial
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
          detalle: `El usuario ${this.loginService.getUser().username} desactivó un cargo de ${row.nombre}`
        };

        console.log(historial);

        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensjae.MostrarMensajeExito("Se desactivó correctamente las tabla general");
            this.listarGeneral(); // Actualizar la lista de cargos
          },
          error => {
            this.mensjae.MostrarBodyError(error); // Manejar error al registrar el historial
          }
        );
      }, error => {
        this.mensjae.MostrarBodyError(error); // Manejar error al desactivar el cargo
      });
    });

  }



}
