import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-clase-dev-estudiante',
  templateUrl: './clase-dev-estudiante.component.html',
  styleUrls: ['./clase-dev-estudiante.component.css']
})
export class ClaseDevEstudianteComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,private loginService:LoginService,
    private claseService: ClaseService,private equipoService:EquipoService,
    private router: Router
  ) { }
  codigo: string
  ngOnInit(): void {
   this.listarEquipoDev()
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
      console.log(data)

      console.log(data.filter(index => index.equipo.codigo == codigo));

      const claseEncontrada = data.find(index => index.equipo.codigo == codigo);
      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - ');
        console.log(diasArray);
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;
      }

      this.datosTabla = data;
    });

  }
  async listarEquipoDev(){
    this.equipoService.listarDev().subscribe((data) => {
    
      const codigoT=data
      ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo) // Filtra por coincidencia de código
      .map(i => i.equipo.codigo) 
     this.codigo=codigoT
     this.listaClases(this.codigo)
    });

  }




}
