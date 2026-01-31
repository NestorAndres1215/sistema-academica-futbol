import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VisorCargoComponent } from '../visor-cargo/visor-cargo.component';
import { Respuesta } from 'src/app/model/respuesta';
import { ModalEliminacionComponent } from '../../../components/modal-eliminacion/modal-eliminacion.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CargoComponent } from '../cargo/cargo.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/mensaje.service';
import { CargoService } from 'src/app/services/cargo.service';
import { Historial } from 'src/app/model/historial';
import { LoginService } from 'src/app/services/login.service';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-lst-des-cargo',
  templateUrl: './lst-des-cargo.component.html',
  styleUrls: ['./lst-des-cargo.component.css']
})
export class LstDesCargoComponent implements OnInit {


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
    private cargo: CargoService,
    private loginService:LoginService,
    private historialService:HistorialService,
    private change: ChangeDetectorRef,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<CargoComponent>,
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
    this.cargo.listarCargoDesactivado().subscribe((data) => {
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
        subtitulo: `¿Deseas restaurar el usuario ${row.nombre} con el código ${row.codigo} ? `
      },
    });
  
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton !== 'CONFIRMAR') return;
  
      // Registrar el historial antes de restaurar el cargo
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} restauró el cargo del usuario ${row.nombre} con el código ${row.codigo}.`
      };
  
      // Registrar el historial
      this.historialService.registrar(historial).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder a restaurar el cargo
          this.cargo.activarCargo(row.codigo).subscribe(result => {
            console.log(result);
            this.mensajeService.MostrarMensajeExito("Se restauró correctamente el cargo.");
            this.listarDesactivado(); // Actualizar la lista de cargos restaurados
          });
        },
        error => {
          this.mensajeService.MostrarBodyError('Error al registrar el historial: ' + error);
        }
      );
    });
  }
  

  visor(row: any) {
    console.log(row)

    const dialogRef = this.dialog.open(VisorCargoComponent, {
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
