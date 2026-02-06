import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-admin-clases',
  templateUrl: './admin-clases.component.html',
  styleUrls: ['./admin-clases.component.css']
})
export class AdminClasesComponent implements OnInit {

  constructor(
    private claseService: ClaseService,
    private loginService: LoginService,
    private equipoService: EquipoService,
  ) { }
  
  datosTabla: any[] = [];
  profesor: any[] = [];

  ngOnInit(): void {
    this.listarEquipo()
  }

  async listaClases() {
    this.claseService.listarClaseActivado().subscribe((data) => {
      this.datosTabla = data;
    });
  }

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
