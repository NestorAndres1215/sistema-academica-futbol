import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { PartidoService } from 'src/app/core/services/partido.service';
import { EditPartidoComponent } from 'src/app/features/admin/partido/edit-partido/edit-partido.component';


@Component({
  selector: 'app-modulo-partido',
  templateUrl: './modulo-partido.component.html',
  styleUrls: ['./modulo-partido.component.css']
})
export class ModuloPartidoComponent implements OnInit {
  equipoSeleccionada: any = null;
  estudiantesFiltrados: any[] = [];

  listadoEquipos: string[] = [];

  constructor(
    private equipoService: EquipoService,
    private partidoService: PartidoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.listarEquiposDelProfesor();
  }

  listarEquiposDelProfesor(): void {
    this.equipoService.listarAsignacion().subscribe(data => {

      const user = this.loginService.getUser();

      const asignaciones = data.filter(item =>
        item.profesor &&
        item.profesor.usuario &&
        item.profesor.usuario.codigo === user.ul_codigo
      );

      this.listadoEquipos = asignaciones.map(a => a.equipo.nombre);

      // si quieres seleccionar uno por defecto
      this.equipoSeleccionada = this.listadoEquipos[0] ?? null;

      this.listarPartidos();
    });
  }

  listarPartidos(): void {
    this.partidoService.listarPartidosActuales().subscribe(data => {

      this.estudiantesFiltrados = data.filter(p =>
        this.listadoEquipos.includes(p.equipo.nombre)
      );

    });
  }
}
