import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
  volver() {

  }

  constructor(
    private claseService: ClaseService,
    private loginService: LoginService,
    private equipoService: EquipoService,
    private profesorService: ProfesorService
  ) { }
  datosTabla: any[] = [];
  ngOnInit(): void {


    this.listarEquipo()
    // this.listaClases()
  }
  async listaClases() {
    this.claseService.listarClaseActivado().subscribe((data) => {
      const equipos = this.profesor.map(index => index.equipo.codigo)

      data = data.filter(i =>
        i.equipo &&
        equipos.includes(i.equipo.codigo)
      )
      console.log(data)
      this.datosTabla = data;

    });
  }
  profesor: any[] = [];
  botonesConfig = {
    editar: false,
    volver: true,

  };
  async listarEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {

      data = data.filter(item => item.profesor.codigo != "0000");

      const filteredData = data.filter(item =>
        item.profesor &&
        item.profesor.usuario &&
        item.profesor.usuario.codigo != null &&
        item.profesor.usuario.codigo === this.loginService.getUser().ul_codigo
      );


      this.profesor = filteredData;
      this.listaClases()
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');

    return `${day}-${month}-${year}`;
  }
}
