import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/services/equipo.service';
import { ExcelService } from 'src/app/services/excel.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PartidoService } from 'src/app/services/partido.service';
import { PdfService } from 'src/app/services/pdf.service';
// Necesitamos importar Chart desde chart.js/auto


@Component({
  selector: 'app-historial-partido-profesores',
  templateUrl: './historial-partido-profesores.component.html',
  styleUrls: ['./historial-partido-profesores.component.css']
})
export class HistorialPartidoProfesoresComponent implements OnInit {

  verDetalle(_t10: any) {
    throw new Error('Method not implemented.');
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
    this.listarPartidos();
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
      //  console.log(data.filter(i=>i.profesor.usuario.codigo==this.loginService.getUser().ul_codigo))
      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);

      console.log(usuariosCodigo);
      console.log(data)

    
      this.asignacion = usuariosCodigo;
      this.listarEquipo()
    });
  }
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {

      const equipos = this.asignacion.map(i => i.equipo.nombre); // Array de nombres
      console.log("Equipos:", equipos);

      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre)); // Filtra los que coincidan
      console.log("Equipos filtrados:", equiposFiltrados);

      this.equipo = equiposFiltrados;
    });
  }
  estudiantesFiltrados = [...this.pagedData];
  filtrarUsuarios() {
    console.log("Equipo seleccionado:", this.equipoSeleccionada); // Verifica el valor seleccionado
  
    // Si no hay equipo seleccionado, mostrar todos los usuarios
    if (!this.equipoSeleccionada) {
      this.estudiantesFiltrados = [...this.pagedData]; // Restaurar la lista original
      console.log("Mostrando todos los estudiantes.");
      return;
    }
  
    // Verificar que pagedData esté definido antes de filtrar
    if (!this.pagedData || !Array.isArray(this.pagedData)) {
      console.error("Error: pagedData no está definido o no es un array.");
      this.estudiantesFiltrados = [];
      return;
    }
  
    console.log("Estudiantes antes de filtrar:", this.pagedData);
  
    // Filtrar los estudiantes
    this.estudiantesFiltrados = this.pagedData.filter(estudiante => {
      if (!estudiante.equipo || !estudiante.equipo.nombre) {
        console.warn("Advertencia: Estudiante sin equipo definido", estudiante);
        return false;
      }
  
      console.log(`Comparando: "${estudiante.equipo.nombre}" con "${this.equipoSeleccionada}"`);
      
      // Comparar nombres con insensibilidad a mayúsculas y espacios
      const coincideConEquipo =
        estudiante.equipo.nombre.trim().toLowerCase() === this.equipoSeleccionada.trim().toLowerCase();
  
      return coincideConEquipo;
    });
  
    console.log("Estudiantes filtrados:", this.estudiantesFiltrados);
  }
  

}
