import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-partido-estudiante',
  templateUrl: './partido-estudiante.component.html',
  styleUrls: ['./partido-estudiante.component.css']
})
export class PartidoEstudianteComponent implements OnInit {

  equipoSeleccionada: any = null;
  estudiantesFiltrados: any[] = [];
  listado: string[] = [];

  constructor(
    private equipoService: EquipoService,
    private partidoService: PartidoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.listarEquiposDelEstudiante();
  }

  listarEquiposDelEstudiante(): void {
    this.equipoService.listarAsignacion().subscribe(data => {

      const user = this.loginService.getUser();

      const asignaciones = data.filter(item =>
        item.estudiante &&
        item.estudiante.usuario &&
        item.estudiante.usuario.codigo === user.ul_codigo
      );

      this.listado = asignaciones.map(a => a.equipo.nombre);

      this.equipoSeleccionada = this.listado[0] ?? null;

      this.listarPartidos();
    });
  }

  listarPartidos(): void {
    this.partidoService.listarPartidosActuales().subscribe(data => {

      this.estudiantesFiltrados = data.filter(p =>
        this.listado.includes(p.equipo.nombre)
      );

    });
  }

  volver(): void {
    history.back();
  }
}
