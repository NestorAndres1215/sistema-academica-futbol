import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-alumnos-estudiante',
  templateUrl: './alumnos-estudiante.component.html',
  styleUrls: ['./alumnos-estudiante.component.css']
})
export class AlumnosEstudianteComponent implements OnInit {

  operar(_t16: any) {

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

  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }

  filtro: string = '';
  listar: any[] = [];
  usuariosFiltrados: any[] = [];
  imagenUrlBase = 'data:image/jpeg;base64,';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private claseService: ClaseService,
    private equipoService: EquipoService
  ) { }

  codigo: string

  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    this.listarEquipoDev()
    this.listaEquipo()
  }

  datosTabla: any[] = [];
  estudianteListar: any[] = [];

  async listaEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
      const equipo = data.filter(i => i.equipo.codigo == this.codigo)
      const lista = equipo.map(i => i.estudiante)
      this.estudianteListar = lista.filter(i => i.codigo !== "0000")
      this.usuariosFiltrados = [...this.estudianteListar];
    });
  }
  codigoEstudiante: string

  async listaClases(codigo: string) {
    this.claseService.listarClaseActivado().subscribe((data) => {
      data = data.filter(index => index.equipo.codigo == codigo);
      const claseEncontrada = data.find(index => index.codigo == this.codigo);
      this.codigoEstudiante = claseEncontrada.equipo.codigo
      this.listaEquipo()
      this.datosTabla = data;
    });

  }

  async listarEquipoDev() {
    this.equipoService.listarDev().subscribe((data) => {
      const codigoT = data
        ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo) // Filtra por coincidencia de código
        .map(i => i.equipo.codigo)

      this.codigo = codigoT
      this.listaEquipo()
    });

  }
}
