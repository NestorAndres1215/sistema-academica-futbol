import { Component, OnInit } from '@angular/core';
import { DvProPerfilComponent } from '../dv-pro-perfil/dv-pro-perfil.component';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SedeService } from 'src/app/core/services/sede.service';
import { CargoService } from 'src/app/core/services/cargo.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  cargos: any
  sedes: any
  sedeSeleccionada: string = ''; // Para la sede seleccionada
  cargoSeleccionado: string = ''; // Para el cargo seleccionado
  filtro: string = '';
  listar: any[] = [];
  usuariosFiltrados: any[] = [];
  imagenUrlBase = 'data:image/jpeg;base64,';
 botonesConfig = {
    editar: false,
    volver: true,

  };
  constructor(private profesor: ProfesorService, private sede: SedeService, private cargo: CargoService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.listarCargo();
    this.listarSede();
    // Llamar al servicio para obtener la lista de usuarios
    this.profesor.listarProfesorActivado().subscribe(
      (data) => {
        data = data.filter(item => item.codigo !== '0000');
        this.listar = data;
        this.usuariosFiltrados = [...this.listar]; // Inicializar la lista filtrada con todos los usuarios
        console.log(this.listar);
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }

  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }

  filtrarUsuarios(): void {
    const filtroTexto = this.filtro.toLowerCase(); // Normalizamos el filtro de texto

    this.usuariosFiltrados = this.listar.filter((usuario) => {
      const coincideConNombre =
        (usuario.primerNombre + ' ' + usuario.segundoNombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno)
          .toLowerCase()
          .includes(filtroTexto);

      const coincideConSede = !this.sedeSeleccionada || usuario.sede.nombre === this.sedeSeleccionada;

      const coincideConCargo = !this.cargoSeleccionado || usuario.cargo.nombre === this.cargoSeleccionado;

      // Retornar true si coincide con todos los filtros aplicados
      return coincideConNombre && coincideConSede && coincideConCargo;
    });
  }


  operar(perfil: any) {
    console.log(typeof perfil)
    const dialogRef = this.dialog.open(DvProPerfilComponent, {
      width: '430px',
      height: '560px',
      data: {
        perfil
      }
    });
  }
  volver(): void {
    this.router.navigate(['/administrador']);
  }
  async listarSede() {
    this.sede.listarSedeActivado().subscribe((data) => {
      console.log(data)
      this.sedes = data;

    })
  }
  async listarCargo() {
    this.cargo.listarCargoActivado().subscribe((data) => {
      console.log(data)
      this.cargos = data;

    })
  }

}
