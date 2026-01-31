import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HistorialService } from 'src/app/services/historial.service';
import { HorarioService } from 'src/app/services/horario.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { VisorHorarioComponent } from '../visor-horario/visor-horario.component';
import { EditHorarioComponent } from '../edit-horario/edit-horario.component';
import { RegHorarioComponent } from '../reg-horario/reg-horario.component';
import { LstDesHorarioComponent } from '../lst-des-horario/lst-des-horario.component';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  registar() {

    const dialogRef = this.dialog.open(RegHorarioComponent, {
      disableClose: true,
      width: '550px',
      height: '350px',

    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarHorario()
    })
  }
  verUsuariosDesactivados() {
    const dialogRef = this.dialog.open(LstDesHorarioComponent, {
      disableClose: true,
      width: '950px',
      height: '650px',
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
    private mensaje: MensajeService,
    private historialService: HistorialService,
    private route: Router
  ) {
    this.pageChanged({
      pageIndex: 0, pageSize: this.pageSize,
      length: 0
    });
  }


  async listarHorario() {
    this.horarioService.listarHorarioActivado().subscribe((data) => {
      console.log(data)
      data = data.filter(item => item.codigo !== '0000');
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

  visor(row: any) {
    console.log(row)
    const dialogRef = this.dialog.open(VisorHorarioComponent, {
      disableClose: true,
      width: '450px',
      height: '450px',
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
    console.log(row)
    const dialogRef = this.dialog.open(EditHorarioComponent, {
      disableClose: true,
      width: '550px',
      height: '350px',
      data: {
        row,
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarHorario()
    })
  }
  volver(): void {
    this.route.navigate(['/administrador']);
  }


}
