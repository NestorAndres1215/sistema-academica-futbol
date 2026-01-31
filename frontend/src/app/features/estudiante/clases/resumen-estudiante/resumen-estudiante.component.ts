import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-resumen-estudiante',
  templateUrl: './resumen-estudiante.component.html',
  styleUrls: ['./resumen-estudiante.component.css']
})
export class ResumenEstudianteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private claseService: ClaseService,
    private loginService:LoginService,
    private equipoService:EquipoService,
    private router: Router
  ) { }
  codigo: string
  ngOnInit(): void {
 this.listarEquipoDev()
    //this.listaClases(this.codigo)
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

    console.log(codigo)
    this.claseService.listarClaseActivado().subscribe((data) => {


      data = data.filter(index => index.equipo.codigo == this.codigo); // Filtra por código
console.log(data)
      const claseEncontrada = data.find(index => index.codigo ); // Encuentra la clase

      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - '); // Divide los días
        console.log(diasArray);
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;
      }
      console.log(claseEncontrada)
      this.nombreEquipo= claseEncontrada.equipo.nombre;
      this.resumen=claseEncontrada.descripcion
      this.resumenConSaltosDeLinea = this.resumen.replace(/\n/g, '<br>'); 
      console.log(this.resumen)
      console.log(data)
      this.datosTabla = data;
    });

  }


  async listarEquipoDev(){
    this.equipoService.listarDev().subscribe((data) => {
      console.log(data)
 
      
      console.log(data
        ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo) // Filtra por coincidencia de código
        .map(i => i.equipo.nombre) // Mapea solo los códigos encontrados
      );
      const codigoT=data
      ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo) // Filtra por coincidencia de código
      .map(i => i.equipo.codigo) // Mapea solo los códigos encontrados
     this.codigo=codigoT
     this.listaClases(this.codigo)
    });

  }
}
