import { Component, OnInit } from '@angular/core';
import { DvEstPerfilComponent } from '../dv-est-perfil/dv-est-perfil.component';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Sede } from 'src/app/model/sede';
import { SedeComponent } from '../../configuracion/sede/sede/sede.component';
import { SedeService } from 'src/app/services/sede.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  filtro: string = ''; // Campo de texto para buscar por nombre o apellidos
  sedeSeleccionada: string = ''; // Código de la sede seleccionada
  generoSeleccionado:string='';
  listar: any[] = []; // Lista completa de usuarios
  usuariosFiltrados: any[] = []; // Lista filtrada de usuarios
  imagenUrlBase = 'data:image/jpeg;base64,'; // Base para las imágenes
  sedes: any[] = []; // Lista de sedes
  generos: any[] = []; // Lista de sedes
  constructor(
    private generales:GeneralService,    private sede: SedeService,
    private estudiante: EstudianteService,

    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarSede(); // Llama a las sedes activadas
    this.listaGenero()
    this.cargarEstudiantes(); // Carga la lista de estudiantes activados
  }

  // Función para cargar estudiantes desde el servicio
  cargarEstudiantes(): void {
    this.estudiante.listarEstudianteActivado().subscribe(
      (data) => {
        data = data.filter(item => item.codigo !== '0000' );
        console.log(data)
        this.listar = data;
        this.usuariosFiltrados = [...this.listar]; // Inicializa los usuarios filtrados con todos los usuarios
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }

  // Función para cargar sedes desde el servicio
  listarSede(): void {
    this.sede.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      },
      (error) => {
        console.error('Error al listar las sedes', error);
      }
    );
  }

  // Mostrar la imagen del usuario (perfil) o una predeterminada
  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }

  // Filtrar usuarios por texto y sede
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
  
      console.log(usuario.sede.nombre);
      console.log(this.sedeSeleccionada);
      const coincideConSede =
        !this.sedeSeleccionada || (usuario.sede && usuario.sede.nombre === this.sedeSeleccionada);
  
        const coincideConGenero =
      !this.generoSeleccionado || 
      (this.generoSeleccionado === 'F' && usuario.genero.toLowerCase() === 'femenino') || 
      (this.generoSeleccionado === 'M' && usuario.genero.toLowerCase() === 'masculino');

  console.log(usuario.genero)
      console.log(coincideConGenero);
      return coincideConTexto && coincideConSede && coincideConGenero; // Filtrar por texto, sede y género
    });
  }
  
  // Abrir modal con detalles del perfil del usuario
  operar(perfil: any): void {
    const dialogRef = this.dialog.open(DvEstPerfilComponent, {
      width: '400px',
      height: '520px',
      data: { perfil },
    });
  }

  // Volver al menú principal
  volver(): void {
    this.router.navigate(['/administrador']);
  }
  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
  }
}
