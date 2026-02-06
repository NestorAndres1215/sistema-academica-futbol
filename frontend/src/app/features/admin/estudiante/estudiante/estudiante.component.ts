import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SedeService } from 'src/app/core/services/sede.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { ModalPerfilComponent } from 'src/app/shared/modal/modal-perfil/modal-perfil.component';


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

        this.listar = data;
        this.usuariosFiltrados = [...this.listar];
      },

    );
  }

  opcionesSedes: string[] = [];
  opcionesGenero: string[] = [];
  async listarSede() {
    this.sede.listarSedeActivado().subscribe((data) => {
      this.sedes = data;
      this.opcionesSedes = this.sedes.map(s => s.nombre);
    });
  }


  filtrarUsuarios(): void {
    if (!this.listar || this.listar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }

    const term = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.listar.filter((usuario) => {
      const coincideConTexto =
        (usuario.primerNombre + ' ' + usuario.segundoNombre + ' ' +
          usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno)
          .toLowerCase()
          .includes(term);

      const coincideConSede =
        !this.sedeSeleccionada || (usuario.sede && usuario.sede.nombre === this.sedeSeleccionada);
      const generoSeleccionadoLower = this.generoSeleccionado.toLowerCase();
      const usuarioGeneroLower = usuario.genero.toLowerCase();

      const coincideConGenero =
        !this.generoSeleccionado || usuarioGeneroLower === generoSeleccionadoLower;
      return coincideConTexto && coincideConSede && coincideConGenero;
    });
  }


  columnasDetalle = [
    { clave: 'usuario.username', etiqueta: 'Usuario' },
    { clave: 'primerNombre', etiqueta: 'Nombre' },
    { clave: 'apellidoPaterno', etiqueta: 'Apellido' },
    { clave: 'correo', etiqueta: 'Correo', roles: ['admin'] },
    { clave: 'telefono', etiqueta: 'Teléfono' },
    { clave: 'sede', etiqueta: 'Sede' },

  ];
  tipoUsuario: 'admin' | 'profesor' = 'admin';
  operar(perfil: any) {
    this.dialog.open(ModalPerfilComponent, {
      width: '400px',
      height: '470px',
      data: {
        perfiles: [perfil],
        columnas: this.columnasDetalle,
        tipoUsuario: this.tipoUsuario
      }
    });
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {

      this.generos = data;
      this.opcionesGenero = this.generos.map(s => s.descripcion1);
    })
  }


}
