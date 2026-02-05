import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from 'src/app/core/services/admin.service';
import { VisorUsuarioComponent } from '../visor-usuario/visor-usuario.component';
import { ModalEliminacionComponent } from '../../../../shared/modal/modal-eliminacion/modal-eliminacion.component';
import { LstUsuarioComponent } from '../lst-usuario/lst-usuario.component';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Respuesta } from 'src/app/core/model/respuesta';
import { Historial } from 'src/app/core/model/historial';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-ls-des-usuario',
  templateUrl: './ls-des-usuario.component.html',
  styleUrls: ['./ls-des-usuario.component.css']
})
export class LsDesUsuarioComponent implements OnInit {

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
    private adminService: AdminService,
    private change: ChangeDetectorRef,
    private historialService: HistorialService,
    private loginService: LoginService,
    private dialog: MatDialog,private alertService: AlertService,
    private dialogRe: MatDialogRef<LstUsuarioComponent>,

  ) { }

  ngOnInit(): void {
    this.listarDesactivado()
  }
  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }

  pageChanged(event: PageEvent) {
    this.totalItems = this.datosTabla.length
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.usuariosFiltrados = this.datosTabla.slice(startIndex, endIndex);
  }

  async listarDesactivado() {
    this.adminService.listarAdminDesactivado().subscribe((data) => {
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
    console.log(row.usuario.username);
    console.log(row);

    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      disableClose: true,
      width: '500px',
      data: {
        row,
        titulo: 'Restaurar',
        subtitulo: `¿Deseas restaurar el usuario ${row.usuario.username} con el código ${row.codigo}?`
      },
    });

    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} restauró al usuario con el código ${row.codigo} y nombre de usuario ${row.usuario.username}.`
      };

      this.adminService.activarAdmin(row.codigo).subscribe({
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

    const dialogRef = this.dialog.open(VisorUsuarioComponent, {
      disableClose: true,
      width: '1050px',
      height: '550px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }


}
