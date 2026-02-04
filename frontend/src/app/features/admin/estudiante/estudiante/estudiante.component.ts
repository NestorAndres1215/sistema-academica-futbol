import { Component, OnInit } from '@angular/core';
import { DvEstPerfilComponent } from '../dv-est-perfil/dv-est-perfil.component';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SedeService } from 'src/app/core/services/sede.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { CODIGO_GENERO, GENERO } from 'src/app/core/constants/usuario';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  botonesConfig = {
    editar: false,
    volver: true,

  };
  filtro: string = ''; 
  sedeSeleccionada: string = ''; 
  generoSeleccionado: string = '';
  listar: any[] = []; 
  usuariosFiltrados: any[] = [];
  sedes: any[] = []; 
  generos: any[] = []; 

  datos: any[];
  constructor(
    private generales: GeneralService, private sede: SedeService,
    private estudiante: EstudianteService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  columnas = [
    { clave: 'perfil' },
    { clave: 'primerNombre' },
    { clave: 'segundoNombre' },
    { clave: 'apellidoPaterno' },
    { clave: 'apellidoMaterno' }
  ];

  ngOnInit(): void {
    this.listarSede(); 
    this.listaGenero()
    this.cargarEstudiantes(); 
  }

  cargarEstudiantes(): void {
    this.estudiante.listarEstudianteActivado().subscribe(
      (data) => {
        data = data.filter(item => item.codigo !== '0000');
        console.log(data)
        this.listar = data;
        this.usuariosFiltrados = [...this.listar]; 
      },

    );
  }

  listarSede(): void {
    this.sede.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      },

    );
  }

  filtrarUsuarios(): void {
    console.log(this.listar);
    if (!this.listar || this.listar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase(); // Convierte el texto del filtro a minúsculas

    this.usuariosFiltrados = this.listar.filter((usuario) => {
      const coincideConTexto =
        (usuario.primerNombre +
          ' ' +
          usuario.segundoNombre +
          ' ' +
          usuario.apellidoPaterno +
          ' ' +
          usuario.apellidoMaterno)
          .toLowerCase()
          .includes(term);

      const coincideConSede =
        !this.sedeSeleccionada || (usuario.sede && usuario.sede.nombre === this.sedeSeleccionada);

      const coincideConGenero =
        !this.generoSeleccionado ||
        (this.generoSeleccionado === CODIGO_GENERO.FEMENINO && usuario.genero.toLowerCase() === GENERO.FEMENINO) ||
        (this.generoSeleccionado === CODIGO_GENERO.MASCULINO && usuario.genero.toLowerCase() === GENERO.MASCULINO);

      console.log(usuario.genero)
      console.log(coincideConGenero);
      return coincideConTexto && coincideConSede && coincideConGenero; 
    });
  }

  operar(perfil: any): void {
    const dialogRef = this.dialog.open(DvEstPerfilComponent, {
      width: '400px',
      height: '520px',
      data: { perfil },
    });
  }


  volver(): void {
    this.router.navigate(['/administrador']);
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
  }  
  
  onVer($event: any) {
    
  }
}
