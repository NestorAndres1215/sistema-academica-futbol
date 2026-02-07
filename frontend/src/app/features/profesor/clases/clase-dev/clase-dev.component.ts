import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';

@Component({
  selector: 'app-clase-dev',
  templateUrl: './clase-dev.component.html',
  styleUrls: ['./clase-dev.component.css']
})
export class ClaseDevComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private claseService: ClaseService
   ) { }
  codigo: string

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    this.listaClases(this.codigo)
  }

  opciones: string[] = ['Clases', 'Alumnos', 'Información'];
  opcionSeleccionada: string = 'Clases';
  datosTabla: any[] = [];
  activeTab1: number = 0;
  primerDia: string
  segundoDia: string
  tercerDia: string

  async listaClases(codigo: string) {


    this.claseService.listarClaseActivado().subscribe((data) => {

      const claseEncontrada = data.find(index => index.codigo == codigo); 
      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - '); 
 
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;

      }
 
      this.datosTabla = data;
    });

  }
}
