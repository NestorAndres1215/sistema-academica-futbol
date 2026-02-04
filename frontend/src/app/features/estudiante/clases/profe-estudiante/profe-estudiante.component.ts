import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-profe-estudiante',
  templateUrl: './profe-estudiante.component.html',
  styleUrls: ['./profe-estudiante.component.css']
})
export class ProfeEstudianteComponent implements OnInit {

  columnas = [
    { clave: 'perfil' },
    { clave: 'primerNombre' },
    { clave: 'segundoNombre' },
    { clave: 'apellidoPaterno' },
    { clave: 'apellidoMaterno' }
  ];

  operar(_t16: any) {
    throw new Error('Method not implemented.');
  }
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
    private route: ActivatedRoute, private loginService: LoginService,
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
      data = data.filter(index => index.codigo == codigo);
      const claseEncontrada = data.find(index => index.codigo == codigo);
      this.codigoEstudiante = claseEncontrada.equipo.codigo
      this.listaEquipo()
      this.datosTabla = data;
    });

  }


  async listarEquipoDev() {
    this.equipoService.listarDev().subscribe((data) => {
      console.log(data)


      console.log(data
        ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo)
        .map(i => i.equipo.nombre)
      );
      const codigoT = data
        ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo)
        .map(i => i.equipo.codigo)
      this.codigo = codigoT
      this.listaEquipo()
    });

  }

}
