import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PartidoService } from 'src/app/core/services/partido.service';

@Component({
  selector: 'app-historial-partido-estudiante',
  templateUrl: './historial-partido-estudiante.component.html',
  styleUrls: ['./historial-partido-estudiante.component.css']
})
export class HistorialPartidoEstudianteComponent implements OnInit {


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

    private partidoService: PartidoService,
    private equipoService: EquipoService,
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
   
    this.listarEquipoDev()
  }
  async listarPartidos() {
    this.partidoService.listarPartidoPasados().subscribe((data) => {
      console.log(data)
      this.user = this.loginService.getUser();
      this.datosTabla = data.map((partido: any) => {
        const marcadorLocal = parseInt(partido.marcadorLocal, 10);
        const marcadorVisita = parseInt(partido.marcadorVisita, 10);

        let resultado = "🔄 Empate"; // Por defecto, empate
        if (marcadorLocal > marcadorVisita) {
          resultado = "✅ Victoria";
        } else if (marcadorLocal < marcadorVisita) {
          resultado = "❌ Derrota";
        }

        return { ...partido, resultado }; // Agrega la propiedad "resultado" al objeto partido
      });
      console.log(this.equipo)
    console.log();
 console.log(data)
      this.datosTabla = data;
      this.pagedData = data.filter(i=>i.equipo.nombre==this.equipo)

      this.totalItems = this.pagedData.length
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
    this.pagedData = this.pagedData.slice(startIndex, endIndex);
  }

  visor(row: any) {
    /* console.log(row)
 
     const dialogRef = this.dialog.open(VisorPartidoComponent, {
       width: '850px',
       disableClose: true,
       height: '450px',
       data: {
         row,
       }
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         console.log('Elemento eliminado');
       }
     });*/

  }
  equipoSeleccionada: string = '';
  volver(): void {
    this.route.navigate(['/administrador']);
  }
  asignacion: any
  equipo: any[] = [];
  async listarEquipoDev() {
    this.equipoService.listarAsignacion().subscribe((data) => {

      console.log(this.loginService.getUser().ul_codigo)
      console.log()
      //  console.log(data.filter(i=>i.profesor.usuario.codigo==this.loginService.getUser().ul_codigo))
      const usuariosCodigo = data
        .filter(i => i.estudiante && i.estudiante.usuario && i.estudiante.usuario.codigo === this.loginService.getUser().ul_codigo);

      console.log(usuariosCodigo);
      console.log(data)

      this.asignacion = usuariosCodigo;
      this.listarEquipo()
    });
  }
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
console.log(this.asignacion)
      const equipos = this.asignacion.map(i => i.equipo.nombre); // Array de nombres
      console.log("Equipos:", equipos);

      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre)); // Filtra los que coincidan
      console.log("Equipos filtrados:", equiposFiltrados);

      this.equipo = equipos;
      this.listarPartidos()
    });
  }
  estudiantesFiltrados = [...this.pagedData];

  

}
