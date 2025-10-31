import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profe-estudiante',
  templateUrl: './profe-estudiante.component.html',
  styleUrls: ['./profe-estudiante.component.css']
})
export class ProfeEstudianteComponent implements OnInit {

  operar(_t16: any) {
    throw new Error('Method not implemented.');
  }
  filtrarUsuarios() {
    console.log(this.estudianteListar);
    
    if (!this.estudianteListar || this.estudianteListar.length === 0) {
      this.usuariosFiltrados = [];
      return;
    }
  
    const term = this.filtro ? this.filtro.toLowerCase().trim() : ''; // Aseguramos que el filtro no tenga espacios extra
  
    this.usuariosFiltrados = this.estudianteListar.filter((usuario) => {
      // Aseguramos que los nombres sean definidos y los convertimos a una cadena vacía si son null o undefined
      const primerNombre = usuario.primerNombre || '';
      const segundoNombre = usuario.segundoNombre || '';
      const apellidoPaterno = usuario.apellidoPaterno || '';
      const apellidoMaterno = usuario.apellidoMaterno || '';
  
      // Unir los nombres de manera segura
      const fullName = (primerNombre + ' ' + segundoNombre + ' ' + apellidoPaterno + ' ' + apellidoMaterno).toLowerCase();
  
      return fullName.includes(term); // Filtrar por nombre completo
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
    private route: ActivatedRoute,private loginService:LoginService,
    private router: Router,
    private claseService: ClaseService,
    private equipoService: EquipoService
  ) { }

  codigo: string
  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo'])
    this.codigo = this.route.snapshot.params['codigo']
    this.listarEquipoDev()
  }

  datosTabla: any[] = [];
  estudianteListar: any[] = [];
  async listaEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      const equipo = data.filter(i => i.equipo.codigo == this.codigo)
      const lista = equipo.map(i => i.profesor)
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
     this.listaEquipo()
    });

  }

}
