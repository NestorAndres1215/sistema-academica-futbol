import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';

import { PartidoService } from 'src/app/core/services/partido.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { EditPartidoComponent } from 'src/app/features/admin/partido/edit-partido/edit-partido.component';

@Component({
  selector: 'app-partido-estudiante',
  templateUrl: './partido-estudiante.component.html',
  styleUrls: ['./partido-estudiante.component.css']
})
export class PartidoEstudianteComponent implements OnInit {
  verDetalle(row: any) {
    const dialogRef = this.dialog.open(EditPartidoComponent, {
      width: '850px',
      disableClose: true,
      height: '450px',
      data: {
        row,
        profesor: "profesor"
      },
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarPartidos()
    })
  }

  user: any = null;
  xd: any[] = [];
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number;
  pageSize = 5;
  listar: any

  constructor(
    private equipoService: EquipoService,
    private partidoService: PartidoService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private change: ChangeDetectorRef,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.listarEquipo();
  }


  async listarPartidos() {
    this.partidoService.listarPartidosActuales().subscribe((data) => {

      this.user = this.loginService.getUser();
      const listadoNormalizado = this.listado.map(e => e.toLowerCase().trim());

      const resultado = data.filter(i =>
        listadoNormalizado.includes(i.equipo.nombre.toLowerCase().trim())
      );

      this.datosTabla = resultado;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.getUserInfo()
      this.change.markForCheck();
    });
  }

  async getUserInfo() {
    this.user = this.loginService.getUser();
    const userID = this.user.id;
    const usuarios = this.datosTabla.filter(item => item.id === this.user.id);
    this.xd = usuarios
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


  volver(): void {
    this.route.navigate(['/estudiante']);
  }

  listado: any[] = [];
  async listarEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {

      data = data.filter(item => item.estudiante.codigo != "0000");

      const filteredData = data.filter(item =>
        item.estudiante &&
        item.estudiante.usuario &&
        item.estudiante.usuario.codigo != null &&
        item.estudiante.usuario.codigo === this.loginService.getUser().ul_codigo
      );

      this.listado = filteredData.map(i => i.equipo.nombre)
      this.listarPartidos()
    })
  }

  formatTexto(descripcion: string): string {
    return descripcion.replace(/\n/g, '<br>');
  }
}
