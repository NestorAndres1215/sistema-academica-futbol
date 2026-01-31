import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalEliminacionComponent } from '../../components/modal-eliminacion/modal-eliminacion.component';
import { Respuesta } from 'src/app/model/respuesta';
import { Historial } from 'src/app/model/historial';
import { EditEquipoComponent } from '../edit-equipo/edit-equipo.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EquipoService } from 'src/app/services/equipo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { HistorialService } from 'src/app/services/historial.service';
import { ExcelService } from 'src/app/services/excel.service';
import { PdfService } from 'src/app/services/pdf.service';
import { Router } from '@angular/router';
import { ListEstudianteComponent } from '../../estudiante/list-estudiante/list-estudiante.component';
import { VisorEqupoComponent } from '../visor-equpo/visor-equpo.component';
import { GeneralService } from 'src/app/services/general.service';
import { SedeService } from 'src/app/services/sede.service';
@Component({
  selector: 'app-ls-des-equipo',
  templateUrl: './ls-des-equipo.component.html',
  styleUrls: ['./ls-des-equipo.component.css']
})
export class LsDesEquipoComponent implements OnInit {
  sedes: any[] = []; // Lista de sedes
  generos: any[] = []; // Lista de sedes
  sedeSeleccionada: string = ''; // Código de la sede seleccionada
  generoSeleccionado:string='';
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
    private equipo: EquipoService,
      private generales:GeneralService,    private sede: SedeService,
    private change: ChangeDetectorRef,
    private loginService:LoginService,
    private historialService:HistorialService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<ListEstudianteComponent>,
    private route: Router,
    private mensajeService: MensajeService
  ) { }

  ngOnInit(): void {
    this.listaGenero()
    this.listarSede()
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
    this.equipo.listarDesactivado().subscribe((data) => {
      console.log(data)
      this.datosTabla = data;
      this.pagedData = data
      this.listar = data;
      this.usuariosFiltrados = [...this.listar]; 
      this.totalItems = this.datosTabla.length
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });

      this.change.markForCheck();
    })
  }


  filtrarUsuarios(): void {
    console.log(this.listar);
    if (!this.listar || this.listar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }
  
    const term = this.filtro.toLowerCase(); // Convierte el texto del filtro a minúsculas
  
    this.usuariosFiltrados = this.listar.filter((usuario) => {
      // Filtrar por nombre
      const coincideConTexto =
        (usuario.nombre && usuario.nombre.toLowerCase().includes(term));
  
      // Filtrar por sede
      const coincideConSede =
        !this.sedeSeleccionada || (usuario.sede && usuario.sede.toLowerCase() === this.sedeSeleccionada.toLowerCase());
  
      // Filtrar por género
      const coincideConGenero =
        !this.generoSeleccionado ||
        (this.generoSeleccionado === 'F' && usuario.genero.toLowerCase() === 'femenino') ||
        (this.generoSeleccionado === 'M' && usuario.genero.toLowerCase() === 'masculino');
  
      // Imprimir información para depuración
      console.log(usuario.genero);
      console.log(coincideConGenero);
      console.log(coincideConTexto, coincideConSede, coincideConGenero);
  
      return coincideConTexto && coincideConSede && coincideConGenero; // Filtrar por texto, sede y género
    });
  }
  
  volver() {
    this.dialogRe.close();
  }


  eliminar(row: any) {


    const dialogEliminar = this.dialog.open(ModalEliminacionComponent, {
      disableClose: true,
      width: '500px',
      data: {
        row,
        titulo: 'Restaurar',
        subtitulo: `¿Deseas restaurar el usuario ${row.nombre} con el codigo ${row.codigo} ? `
      },

    });
    dialogEliminar.afterClosed().subscribe((respuesta: Respuesta) => {
      if (respuesta?.boton != 'CONFIRMAR') return;
      this.equipo.activar(row.codigo).subscribe(result => {
        console.log(result);

        const historial: Historial = {
          usuario: this.loginService.getUser().username, // Usuario que realiza la acción
          detalle: `El usuario ${this.loginService.getUser().username} eliminó al estudiante ${row.nombre} con el código ${row.codigo}.`
        };
        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensajeService.MostrarMensaje("Se activar correctamente el estudiante.");
            this.listarDesactivado();  // Actualizar la lista de cargos
          },
          error => {
            this.mensajeService.MostrarBodyError(error); // Manejar error al registrar el historial
          }
        );
      });

    })
  }

  visor(row: any) {
    const dialogRef = this.dialog.open(VisorEqupoComponent, {
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
  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
  }
  listarSede(): void {
    this.sede.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      },
      (error) => {
        console.error('Error al listar las sedes', error);
      }
    );
  }
}
