import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { RegEjercicioComponent } from '../../ejercicio/reg-ejercicio/reg-ejercicio.component';
import { EjercicioService } from 'src/app/core/services/ejercicio.service';

import { EditEjecicioComponent } from '../../ejercicio/edit-ejecicio/edit-ejecicio.component';
import { AdminCargaEditClaseComponent } from 'src/app/features/admin/modulo-clases/admin-carga-edit-clase/admin-carga-edit-clase.component';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';

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
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA,MENSAJES.SIN_CLASES_DISPONIBLES);
    } else {
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

    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })
  }

  verDetalle(ejercicio: any): void {


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


    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })

  }
  @Input() dias: string = '';
  constructor(private alertService: AlertService, private ejercicioService: EjercicioService, private claseService: ClaseService, private route: ActivatedRoute, private dialog: MatDialog) { }
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
      this.claseListar = claseEncontrada
      const claseEncontrada2 = claseEncontrada.find(index => index.dia == this.dias); // Encuentra la clase

      this.titulo = claseEncontrada2.titulo
      this.descripcion = claseEncontrada2.descripcion
      this.objetivo = claseEncontrada2.objetivo
      this.codigoClase = claseEncontrada2.codigo
    })
  }

  ejerciciosListar: any[] = []
  async listarEjercicio() {
    this.ejercicioService.listar().subscribe((data) => {

      const filtrados = data.filter(item =>
        item.claseDev &&
        item.claseDev.clase.codigo.includes(this.codigo) &&
        item.claseDev.clase.dia &&
        item.claseDev.dia.split(" - ").includes(this.dias)
      );

      this.ejerciciosListar = filtrados;
    });
  }


  formatDescripcion(descripcion: string): string {
    return descripcion.replace(/\n/g, '<br>');
  }

  formatTexto(texto: string): string {
    return texto.replace(/\n/g, '<br>');
  }

}
