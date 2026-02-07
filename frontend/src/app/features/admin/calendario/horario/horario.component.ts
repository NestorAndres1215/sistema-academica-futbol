import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HorarioService } from 'src/app/core/services/horario.service';
import { LoginService } from 'src/app/core/services/login.service';
import { VisorHorarioComponent } from '../visor-horario/visor-horario.component';
import { EditHorarioComponent } from '../edit-horario/edit-horario.component';
import { RegHorarioComponent } from '../reg-horario/reg-horario.component';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  botonesConfigTable = {
    actualizar: true,
    ver: true
  };

  columnas = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Hora de Inicio', clave: 'inicioHora' },
    { etiqueta: 'Hora de Finalización', clave: 'finHora' },
  ];

  registar() {
    const dialogRef = this.dialog.open(RegHorarioComponent, {
      disableClose: true,
      width: '550px',
      height: '420px',

    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarHorario()
    })
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.listarHorario()
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
    private horarioService: HorarioService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private change: ChangeDetectorRef,
  ) {
  }

  async listarHorario() {
    this.horarioService.listarHorarioActivado().subscribe((data) => {
      data = data.filter(item => item.codigo !== '0000');
      this.user = this.loginService.getUser();
      this.datosTabla = data;
      this.pagedData = data
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.getUserInfo()
      this.change.markForCheck();
    });
  }

  async getUserInfo() {
    const usuarios = this.datosTabla.filter(item => item.id === this.user.id);
    this.xd = usuarios
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }


  pageChanged(event: PageEvent) {
    this.totalItems = this.datosTabla.length
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
  }

  visor(row: any) {
    this.dialog.open(VisorHorarioComponent, {
      disableClose: true,
      width: '550px',
      height: '380px',
      data: {
        row,
      }
    });
  }

  editar(row: any) {
    const dialogRef = this.dialog.open(EditHorarioComponent, {
      disableClose: true,
      width: '550px',
      height: '420px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarHorario()
    })
  }

}
