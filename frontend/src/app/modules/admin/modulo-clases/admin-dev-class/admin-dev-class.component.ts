import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';

@Component({
  selector: 'app-admin-dev-class',
  templateUrl: './admin-dev-class.component.html',
  styleUrls: ['./admin-dev-class.component.css']
})
export class AdminDevClassComponent implements OnInit {

 volver() {
    this.router.navigate(['/administrador']);
  }

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
  opciones: string[] = ['Clases', 'Alumnos', 'Profesores', 'Evaluacion','Historial'];
  opcionSeleccionada: string = 'Clases';
  datosTabla: any[] = [];
  activeTab1: number = 0;
  primerDia: string
  segundoDia: string
  tercerDia: string
  async listaClases(codigo: string) {
    this.claseService.listarClaseActivado().subscribe((data) => {
      const claseEncontrada = data.find(index => index.codigo == codigo); // Encuentra la clase
      if (claseEncontrada && claseEncontrada.dia) {
        const diasArray: string[] = claseEncontrada.dia.split(' - '); // Divide los días
        [this.primerDia, this.segundoDia, this.tercerDia] = diasArray;
      }
      this.datosTabla = data;
    });

  }
}
