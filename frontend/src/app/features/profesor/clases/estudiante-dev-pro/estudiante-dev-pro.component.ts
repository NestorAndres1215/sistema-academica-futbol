import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';

@Component({
  selector: 'app-estudiante-dev-pro',
  templateUrl: './estudiante-dev-pro.component.html',
  styleUrls: ['./estudiante-dev-pro.component.css']
})
export class EstudianteDevProComponent implements OnInit {
  operar(_t16: any) {
    throw new Error('Method not implemented.');
  }

      columnas = [
    { clave: 'perfil' },
    { clave: 'primerNombre' },
    { clave: 'segundoNombre' },
    { clave: 'apellidoPaterno' },
    { clave: 'apellidoMaterno' }
  ];
  filtrarUsuarios() {
  
    if (!this.estudianteListar || this.estudianteListar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }
  
    const term = this.filtro ? this.filtro.toLowerCase().trim() : ''; 

    this.usuariosFiltrados = this.estudianteListar.filter((usuario) => {
    
      const primerNombre = usuario.primerNombre || '';
      const segundoNombre = usuario.segundoNombre || '';
      const apellidoPaterno = usuario.apellidoPaterno || '';
      const apellidoMaterno = usuario.apellidoMaterno || '';
  
      const fullName = (primerNombre + ' ' + segundoNombre + ' ' + apellidoPaterno + ' ' + apellidoMaterno).toLowerCase();
  
      return fullName.includes(term); 
    });
  }
  
  // Mostrar la imagen del usuario (perfil) o una predeterminada
  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }

  filtro: string = ''; // Campo de texto para buscar por nombre o apellidos
  listar: any[] = []; // Lista completa de usuarios
  usuariosFiltrados: any[] = []; // Lista filtrada de usuarios
  imagenUrlBase = 'data:image/jpeg;base64,'; // Base para las imágenes
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private claseService: ClaseService,
    private equipoService: EquipoService
  ) { }

  codigo: string
  ngOnInit(): void {

    this.codigo = this.route.snapshot.params['codigo']
    this.listaClases(this.codigo)
  }

  datosTabla: any[] = [];
  estudianteListar: any[] = [];
  async listaEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      const equipo = data.filter(i => i.equipo.codigo == this.codigoEstudiante)
      const lista = equipo.map(i => i.estudiante)
      this.estudianteListar = lista.filter(i => i.codigo !== "0000")
      this.usuariosFiltrados = [...this.estudianteListar];
    });
  }
  codigoEstudiante: string

  async listaClases(codigo: string) {
    this.claseService.listarClaseActivado().subscribe((data) => {
      data = data.filter(index => index.codigo == codigo); // Filtra por código
      const claseEncontrada = data.find(index => index.codigo == codigo); // Encuentra la clase
      this.codigoEstudiante = claseEncontrada.equipo.codigo
      this.listaEquipo()
      this.datosTabla = data;
    });

  }
}
