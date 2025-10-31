import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-clase-dev',
  templateUrl: './clase-dev.component.html',
  styleUrls: ['./clase-dev.component.css']
})
export class ClaseDevComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private claseService: ClaseService,
    private router: Router
  ) { }
  codigo: string
  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo'])
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

    console.log(codigo)
    this.claseService.listarClaseActivado().subscribe((data) => {


      console.log(data.filter(index => index.codigo == codigo)); // Filtra por código

      const claseEncontrada = data.find(index => index.codigo == codigo); // Encuentra la clase
      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - '); // Divide los días
        console.log(diasArray);
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;



      }
      console.log(data)
      this.datosTabla = data;
    });

  }
}
