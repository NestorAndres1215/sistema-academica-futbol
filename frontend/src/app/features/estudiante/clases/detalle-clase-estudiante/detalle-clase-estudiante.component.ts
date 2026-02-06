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

  constructor(
    private claseService: ClaseService,
    private equipoService: EquipoService,
    private loginService: LoginService,
  ) { }

  codigo: string
  ngOnInit(): void {
    this.listarEquipoDev()
  }
  opciones: string[] = ['Clases', 'Alumnos', 'Profesores', 'Lesiones', 'Notas'];
  opcionSeleccionada: string = 'Clases';
  datosTabla: any[] = [];
  activeTab1: number = 0;
  primerDia: string
  segundoDia: string
  tercerDia: string
  
  async listaClases() {
    this.claseService.listarClaseActivado().subscribe((data) => {

      const claseEncontrada = data.find(index => index.equipo.codigo == this.codigo);

      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - ');
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;
      }

      this.datosTabla = data;
    });

  }

  async listarEquipoDev() {
    this.equipoService.listarDev().subscribe((data) => {

      const codigoT = data
        ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo) // Filtra por coincidencia de código
        .map(i => i.equipo.codigo)

      this.codigo = codigoT
      this.listaClases()
    });

  }
}
