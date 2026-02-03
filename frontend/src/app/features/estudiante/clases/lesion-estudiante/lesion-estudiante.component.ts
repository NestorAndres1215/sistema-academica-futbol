import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { NombreCompleto } from 'src/app/core/utils/nombreValidator';
import { VisorLesionComponent } from 'src/app/features/admin/lesiones/visor-lesion/visor-lesion.component';
import { RegLesionesComponent } from 'src/app/features/profesor/lesiones/reg-lesiones/reg-lesiones.component';

@Component({
  selector: 'app-lesion-estudiante',
  templateUrl: './lesion-estudiante.component.html',
  styleUrls: ['./lesion-estudiante.component.css']
})
export class LesionEstudianteComponent implements OnInit {
  botonesConfig = {
    editar: false,
    volver: false,

  };

  columnas = [
    { etiqueta: 'Código', clave: 'estudiante.codigo' },
    { etiqueta: 'Nombre', clave: 'nombreCompleto' },
    { etiqueta: 'Lesión', clave: 'lesionado.tipoLesion' },
    { etiqueta: 'Fecha de la Lesión', clave: 'lesionado.fechaLesion' },
    { etiqueta: 'Gravedad', clave: 'lesionado.gravedad' },
    { etiqueta: 'Acción', clave: 'acciones' }
  ];

  registrar() {
    const dialogRef = this.dialog.open(RegLesionesComponent, {
      disableClose: true,
      width: '850px',
      height: '600px',
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.lesiones()
    })
  }



  row: any;


  volver() {
    throw new Error('Method not implemented.');
  }
  equipo: any
  constructor(private equipoService: EquipoService, private loginService: LoginService,
    private lesionService: LesionService,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private router: Router,
  ) { }
  equipoSeleccionada: string = '';
  ngOnInit(): void {
    //this.listarEquipo()
    this.listarDevEquipo()
    this.lesiones()
  }
  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      const equipos = this.asignacion.map(i => i.equipo.nombre); // Array de nombres
      console.log("Equipos:", equipos);

      const equiposFiltrados = data.filter(i => equipos.includes(i.nombre)); // Filtra los que coincidan
      console.log("Equipos filtrados:", equiposFiltrados);

      this.equipo = equiposFiltrados;
    });
  }
  asignacion: any
  estudiantes: any[] = [];
  profesores: any[] = [];
  usuariosFiltrados: any[] = [];
  async listarDevEquipo() {
    this.equipoService.listarAsignacion().subscribe((data) => {
       this.estudiantes = data
             .filter(i => i.estudiante.codigo !== "0000")
             .map(i => ({
               ...i,
               nombreCompleto: NombreCompleto(i.estudiante)
             }));
      console.log(data)

      console.log(this.loginService.getUser().ul_codigo)
      //  console.log(data.filter(i=>i.profesor.usuario.codigo==this.loginService.getUser().ul_codigo))
      const usuariosCodigo = data
        .filter(i => i.profesor && i.profesor.usuario && i.profesor.usuario.codigo === this.loginService.getUser().ul_codigo);

      console.log(usuariosCodigo);
      this.asignacion = usuariosCodigo;
      this.listarEquipo()
      this.usuariosFiltrados = [...this.asignacion];
    });
  }
  filtro: string = '';

  profesoresFiltrados = [...this.profesores];
  estudiantesFiltrados = [...this.estudiantes];

  filtrarUsuarios() {
    console.log(this.equipoSeleccionada)
    if (!this.equipoSeleccionada) {
      //ver si esta bien es algo que se esta viendo
      this.estudiantesFiltrados = [...this.estudiantes];

      return;
    }

    // Filtrar los estudiantes
    // Suponiendo que this.lesion es un array de códigos de estudiantes lesionados, por ejemplo: ['0058', '0062']
    console.log(this.lesion);

    // Filtrar los estudiantes
    this.estudiantesFiltrados = this.estudiantes.filter(est => {
      const coincideConEquipo = est.equipo && est.equipo.nombre === this.equipoSeleccionada;
      const estaLesionado = this.lesion.includes(est.estudiante.codigo);
      return coincideConEquipo && estaLesionado; // Retorna solo estudiantes del equipo seleccionado y lesionados
    });


    this.estudiantesFiltrados = this.estudiantesFiltrados.map(est => {
      const lesionInfo = this.lesionCompleto.find(lesion => lesion.estudiante.codigo === est.estudiante.codigo);
      return {
        estudiante: est,
        lesionado: lesionInfo ? lesionInfo : null
      };
    });

  }

  seleccionados: { [key: string]: boolean } = {};
  get profesoresSeleccionados() {
    return this.profesores.filter(profesor => this.seleccionados[profesor.codigo]);
  }
  get profesorevisor() {
    return Object.values(this.seleccionados).filter(value => value).length;
  }
  lesion: any[] = [];
  lesionCompleto: any;
  lesiones() {
    this.lesionService.listarLesionActivado().subscribe((data) => {
      this.lesion = data.map(i => i.estudiante.codigo);
      this.lesionCompleto = data
    });
  }
  virsor(row) {
    console.log(row)
    const dialogRef = this.dialog.open(VisorLesionComponent, {
      disableClose: true,
      width: '1020px',
      height: '520px',
      data: { row },
    });
  }
}
