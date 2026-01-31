import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { VisorProfesorComponent } from '../visor-profesor/visor-profesor.component';
import { ModalEliminacionComponent } from '../../components/modal-eliminacion/modal-eliminacion.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { LstProfesoresComponent } from '../lst-profesores/lst-profesores.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { Respuesta } from 'src/app/core/model/respuesta';

@Component({
  selector: 'app-lst-des-profesor',
  templateUrl: './lst-des-profesor.component.html',
  styleUrls: ['./lst-des-profesor.component.css']
})
export class LstDesProfesorComponent implements OnInit {

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
    private profesorService: ProfesorService,
    private change: ChangeDetectorRef,
    private loginService:LoginService,
    private historialService:HistorialService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<LstProfesoresComponent>,
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
    this.profesorService.listarProfesorDesactivado().subscribe((data) => {
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
      (usuario.primerNombre + ' ' + usuario.segundoNombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno)
        .toLowerCase()
        .includes(term)
    );
  }
  volver() {
    this.dialogRe.close();
  }


  eliminar(row: any) {
    console.log(row.usuario.username)

    console.log(row)


    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      disableClose: true,
      width: '500px',
      data: {
        row,
        titulo: 'Restaurar',
        subtitulo: `¿Deseas restaurar el usuario ${row.usuario.username} con el codigo ${row.codigo} ? `
      },

    });
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;
      this.profesorService.activarProfesor(row.codigo).subscribe(result => {
        console.log(result);
    
        // Crear el historial después de activar al usuario
        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
          detalle: `El usuario ${this.loginService.getUser().username} restauró al usuario ${row.usuario.username} con el código ${row.codigo}.`
        };
    
        // Registrar el historial
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensajeService.MostrarMensajeExito("Se restauró correctamente el usuario");
            this.listarDesactivado(); // Refrescar la lista de usuarios desactivados
          },
          error => {
            this.mensajeService.MostrarBodyError('Error al registrar el historial: ' + error);
          }
        );
      }, error => {
        this.mensajeService.MostrarBodyError('Error al restaurar el usuario: ' + error);
      });

    })
  }

  visor(row: any) {
    const dialogRef = this.dialog.open(VisorProfesorComponent, {
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
