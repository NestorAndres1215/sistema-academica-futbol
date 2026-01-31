import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { EditPartidoComponent } from 'src/app/features/admin/partido/edit-partido/edit-partido.component';


@Component({
  selector: 'app-modulo-partido',
  templateUrl: './modulo-partido.component.html',
  styleUrls: ['./modulo-partido.component.css']
})
export class ModuloPartidoComponent implements OnInit {
  verDetalle(row: any) {
    const dialogRef = this.dialog.open(EditPartidoComponent, {
      width: '850px',
      disableClose: true,
      height: '450px',
      data: {
        row,
        profesor:"profesor"
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarPartidos()
    })
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
    private equipoService: EquipoService,
    private partidoService: PartidoService,
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
    this.listarEquipo();
    //this.listarPartidos();  

  }
  async listarPartidos() {
    this.partidoService.listarPartidosActuales().subscribe((data) => {
      console.log(data)

      this.user = this.loginService.getUser();
      const listadoNormalizado = this.listado.map(e => e.toLowerCase().trim());

      const resultado = data.filter(i =>
        listadoNormalizado.includes(i.equipo.nombre.toLowerCase().trim())
      );

      console.log(resultado);


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
    this.route.navigate(['/profesor']);
  }

  listado: any[] = [];
  async listarEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {

      console.log(data)

      console.log(this.loginService.getUser().ul_codigo)
      data = data.filter(item => item.profesor.codigo != "0000");

      const filteredData = data.filter(item =>
        item.profesor &&
        item.profesor.usuario &&
        item.profesor.usuario.codigo != null &&
        item.profesor.usuario.codigo === this.loginService.getUser().ul_codigo
      );
      this.listado = filteredData.map(i => i.equipo.nombre)
      this.listarPartidos()
    })
  }

  formatTexto(descripcion: string): string {
    return descripcion.replace(/\n/g, '<br>');
  }
}
