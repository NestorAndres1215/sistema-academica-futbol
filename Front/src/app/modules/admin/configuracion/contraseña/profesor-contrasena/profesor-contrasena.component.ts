import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EditContraComponent } from 'src/app/modules/profesor/configuracion/edit-contra/edit-contra.component';
import { ExcelService } from 'src/app/services/excel.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PdfService } from 'src/app/services/pdf.service';
import { ProfesorService } from 'src/app/services/profesor.service';

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
  
  constructor(
    private admin: ProfesorService,
    private dialog: MatDialog,
    private historialService:HistorialService,
    private loginService: LoginService,
    private change: ChangeDetectorRef,
    private mensjae:MensajeService,
    private excel: ExcelService,
    private pdfService: PdfService,
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
      console.log(data)
      data = data.filter(item => item.codigo !== '0000' );
      this.user = this.loginService.getUser();

      console.log(data);
      this.datosTabla = data;
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

  
  editar(row: any) {
    console.log()
    row=row.usuario
    console.log(row)
    const dialogRef = this.dialog.open(EditContraComponent, {
   
      disableClose: true ,
      width: '550px',
      height: '550px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarProdesor()
      this.pageSizeChanged()
    })
  }
  volver(): void {
    this.route.navigate(['/administrador']);
  }

}
