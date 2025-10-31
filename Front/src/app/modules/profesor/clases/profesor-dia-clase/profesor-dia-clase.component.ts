import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminCargaClaseComponent } from 'src/app/modules/admin/modulo-clases/admin-carga-clase/admin-carga-clase.component';
import { AdminCargaEditClaseComponent } from 'src/app/modules/admin/modulo-clases/admin-carga-edit-clase/admin-carga-edit-clase.component';
import { ClaseService } from 'src/app/services/clase.service';
import { RegEjercicioComponent } from '../../ejercicio/reg-ejercicio/reg-ejercicio.component';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { EditEjecicioComponent } from '../../ejercicio/edit-ejecicio/edit-ejecicio.component';

@Component({
  selector: 'app-profesor-dia-clase',
  templateUrl: './profesor-dia-clase.component.html',
  styleUrls: ['./profesor-dia-clase.component.css']
})
export class ProfesorDiaClaseComponent implements OnInit {
  editar() {
    const dialogRef = this.dialog.open(AdminCargaEditClaseComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        codigo: this.codigo,
        dia: this.dias,
        titulo: this.titulo,
        objetivo: this.objetivo,
        descripcion: this.descripcion,
        codigoClase: this.codigoClase

      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
    })
  }

  onRegistrarEjercicio(): void {
    if (!this.claseListar || this.claseListar.length === 0) {
      // Aquí muestras un mensaje; puedes usar alert(), un toast, o algún otro mecanismo.
      this.mensajeService.MostrarMensaje("No se puede registrar ejercicio, no hay clases disponibles.");
    } else {
      // Si todo está en orden, llamamos al método registrar()
      this.registrar();
    }
  }

  registrar() {
    const dialogRef = this.dialog.open(RegEjercicioComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        codigo: this.codigoClase,
        dia: this.dias,

      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })
  }
  // Este método se invoca al hacer clic en "Ver Detalle"
  verDetalle(ejercicio: any): void {
    console.log('Detalle del ejercicio:', ejercicio);

    const dialogRef = this.dialog.open(EditEjecicioComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        codigo: this.codigoClase,
        dia: this.dias,
        ejercicio
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })

  }
  @Input() dias: string = '';
  constructor(private mensajeService: MensajeService, private ejercicioService: EjercicioService, private claseService: ClaseService, private route: ActivatedRoute, private dialog: MatDialog) { }
  codigo: string
  ngOnInit(): void {
    console.log(this.dias)
    this.codigo = this.route.snapshot.params['codigo']
    this.listarClase()
    this.listarEjercicio()
  }
  claseListar: any[] = []
  titulo: string
  objetivo: string
  descripcion: string
  codigoClase: string

  async listarClase() {
    this.claseService.listarClaseDevActivado().subscribe((data) => {
      data = data.filter(index => index.clase.codigo == this.codigo)
      const claseEncontrada = data.filter(index => index.dia == this.dias); // Encuentra la clase
      console.log(claseEncontrada)
      console.log(this.dias)
      this.claseListar = claseEncontrada
      const claseEncontrada2 = claseEncontrada.find(index => index.dia == this.dias); // Encuentra la clase
      console.log(claseEncontrada2.titulo)

      this.titulo = claseEncontrada2.titulo
      this.descripcion = claseEncontrada2.descripcion
      this.objetivo = claseEncontrada2.objetivo
      this.codigoClase = claseEncontrada2.codigo
    })
  }
  ejerciciosListar: any[] = []
  async listarEjercicio() {
    this.ejercicioService.listar().subscribe((data) => {
      console.log(data)
      console.log()
      data = data.filter(index => index.clase.dia == this.dias)
      console.log(this.dias)
      this.ejerciciosListar = data
      console.log(this.ejerciciosListar)
      const filtrados = data.filter(item => {
        // Verifica que item.clase y item.clase.dia no sean null o undefined
        if (!item.clase || !item.clase.dia) {
          return false;
        }
        return item.clase.dia.split(" - ").includes(this.dias);
      });

      //
      console.log(this.dias)
      console.log(filtrados);
      console.log("")
      //const claseEncontrada = data.filter(index => index.dia == this.dias); // Encuentra la clase
      //this.claseListar = claseEncontrada

    })
  }
  formatDescripcion(descripcion: string): string {
    return descripcion.replace(/\n/g, '<br>');
  }
  formatTexto(texto: string): string {
    return texto.replace(/\n/g, '<br>');
  }

}
