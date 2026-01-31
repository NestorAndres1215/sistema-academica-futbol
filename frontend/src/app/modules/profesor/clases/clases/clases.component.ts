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

  async listarEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {

      console.log(data)

      console.log(this.loginService.getUser().ul_codigo)
      data = data.filter(item => item.profesor.codigo != "0000");

      const filteredData = data.filter(item =>
        item.profesor &&
        item.profesor.usuario &&
        item.profesor.usuario.codigo != null &&
        item.profesor.usuario.codigo === this.loginService.getUser().ul_codigo
      );
      console.log(filteredData);

      this.profesor = filteredData;
      this.listaClases()
    });
  }
  formatDate(dateString: string): string {
    if (!dateString) return ''; // Manejo de valores nulos o indefinidos
  
    // Divide la fecha en partes: año, mes y día
    const [year, month, day] = dateString.split('-');
  
    // Retorna la fecha en el formato DD-MM-YYYY
    return `${day}-${month}-${year}`;
  }
}
