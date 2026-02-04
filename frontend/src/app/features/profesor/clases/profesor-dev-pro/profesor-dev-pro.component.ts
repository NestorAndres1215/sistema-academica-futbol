import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';

@Component({
  selector: 'app-profesor-dev-pro',
  templateUrl: './profesor-dev-pro.component.html',
  styleUrls: ['./profesor-dev-pro.component.css']
})
export class ProfesorDevProComponent implements OnInit {

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
    console.log(this.estudianteListar);

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


  filtro: string = ''; 
  listar: any[] = []; 
  usuariosFiltrados: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private claseService: ClaseService,
    private equipoService: EquipoService
  ) { }

  codigo: string
  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo'])
    this.codigo = this.route.snapshot.params['codigo']
    this.listaClases(this.codigo)
  }

  datosTabla: any[] = [];
  estudianteListar: any[] = [];

  async listaEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      const equipo = data.filter(i => i.equipo.codigo == this.codigoEstudiante)
      const lista = equipo.map(i => i.profesor)
      this.estudianteListar = lista.filter(i => i.codigo !== "0000")
      this.usuariosFiltrados = [...this.estudianteListar];
    });
  }
  codigoEstudiante: string

  async listaClases(codigo: string) {
    this.claseService.listarClaseActivado().subscribe((data) => {
      data = data.filter(index => index.codigo == codigo); 
      const claseEncontrada = data.find(index => index.codigo == codigo);
      this.codigoEstudiante = claseEncontrada.equipo.codigo
      this.listaEquipo()
      this.datosTabla = data;
    });
  }

}
