import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-detalle-clase-estudiante',
  templateUrl: './detalle-clase-estudiante.component.html',
  styleUrls: ['./detalle-clase-estudiante.component.css']
})
export class DetalleClaseEstudianteComponent implements OnInit {
 botonesConfig = {
    editar: false,
    volver: true,

  };
  volver() {
    this.router.navigate(['/estudiante']);
  }

  constructor(
    private route: ActivatedRoute,
    private claseService: ClaseService,
    private equipoService:EquipoService,
    private loginService:LoginService,
    private estudianteService:EstudianteService,
    private router: Router
  ) { }
  codigo: string
  ngOnInit(): void {
    //this.codigo = this.route.snapshot.params['codigo']
  //  this.listaClases(this.codigo)
  this.listarEquipoDev()
  }
  opciones: string[] = ['Clases', 'Alumnos', 'Profesores','Lesiones', 'Notas'];
  opcionSeleccionada: string = 'Clases';
  datosTabla: any[] = [];
  activeTab1: number = 0;
  primerDia: string
  segundoDia: string
  tercerDia: string
  async listaClases(codigo: string) {
    this.claseService.listarClaseActivado().subscribe((data) => {
      console.log(data)
      console.log(this.codigo)
      const claseEncontrada = data.find(index => index.equipo.codigo == this.codigo); // Encuentra la clase
      console.log(claseEncontrada)
      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - '); // Divide los días
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;
      }
  
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
