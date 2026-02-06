import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';

@Component({
  selector: 'app-resumen-cla-pro-dev',
  templateUrl: './resumen-cla-pro-dev.component.html',
  styleUrls: ['./resumen-cla-pro-dev.component.css']
})
export class ResumenClaProDevComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private claseService: ClaseService,
    private router: Router
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
  nombreEquipo:string
  resumen:string
  resumenConSaltosDeLinea: string;
  async listaClases(codigo: string) {


    this.claseService.listarClaseActivado().subscribe((data) => {


      data = data.filter(index => index.codigo == codigo); // Filtra por código

      const claseEncontrada = data.find(index => index.codigo == codigo); // Encuentra la clase
      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - '); // Divide los días
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;
      }
      this.nombreEquipo= claseEncontrada.equipo.nombre;
      this.resumen=claseEncontrada.descripcion
      this.resumenConSaltosDeLinea = this.resumen.replace(/\n/g, '<br>'); 

      this.datosTabla = data;
    });

  }
}
