import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/core/services/excel.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { PdfService } from 'src/app/core/services/pdf.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';
import { EditContraComponent } from 'src/app/features/profesor/configuracion/edit-contra/edit-contra.component';

@Component({
  selector: 'app-profesor-contrasena',
  templateUrl: './profesor-contrasena.component.html',
  styleUrls: ['./profesor-contrasena.component.css']
})
export class ProfesorContrasenaComponent implements OnInit {
  user: any = null;
  xd: any
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number;
  pageSize = 5;
  listar: any


  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre Completo', clave: 'nombreCompleto' },
    { etiqueta: 'Usuario', clave: 'usuario.username' },
  ];

  botonesConfigTable = {
    actualizar: true,

  };


  constructor(
    private admin: ProfesorService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private change: ChangeDetectorRef,
    private route: Router
  ) {
    this.pageChanged({
      pageIndex: 0, pageSize: this.pageSize,
      length: 0
    });
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.listarProdesor();
  }
  async listarProdesor() {
    this.admin.listarProfesorActivado().subscribe((data) => {
      const datosFiltrados = data.filter(item => item.codigo !== '0000');
      this.user = this.loginService.getUser();

      this.datosTabla = datosFiltrados.map(item => ({
        ...item,
        nombreCompleto: NombreCompleto(item)
      }));

      this.pagedData = this.datosTabla;
      this.totalItems = this.datosTabla.length;
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.getUserInfo()
      this.change.markForCheck();
    });
  }

  async getUserInfo() {
    this.user = this.loginService.getUser();
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


  editar(row: any) {
    console.log()
    row = row.usuario
    console.log(row)
    const dialogRef = this.dialog.open(EditContraComponent, {

      disableClose: true,
      width: '550px',
      height: '550px',
      data: {
        row,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
      this.pageSizeChanged()
    })
  }

  volver(): void {
    this.route.navigate(['/administrador']);
  }

}
