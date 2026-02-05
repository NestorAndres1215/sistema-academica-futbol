import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EjercicioService } from 'src/app/core/services/ejercicio.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { AdminCargaEditClaseComponent } from 'src/app/features/admin/modulo-clases/admin-carga-edit-clase/admin-carga-edit-clase.component';
import { EditEjecicioComponent } from 'src/app/features/profesor/ejercicio/edit-ejecicio/edit-ejecicio.component';
import { RegEjercicioComponent } from 'src/app/features/profesor/ejercicio/reg-ejercicio/reg-ejercicio.component';

@Component({
  selector: 'app-estudiante-dia-clase',
  templateUrl: './estudiante-dia-clase.component.html',
  styleUrls: ['./estudiante-dia-clase.component.css']
})
export class EstudianteDiaClaseComponent implements OnInit {

  editar() {
    const dialogRef = this.dialog.open(AdminCargaEditClaseComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        codigo: this.codigo,
        dia: this.dias,
        titulo: this.titulo,
        objetivo: this.objetivo,
        descripcion: this.descripcion,
        codigoClase: this.codigoClase

      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
    })
  }

  onRegistrarEjercicio(): void {
    if (!this.claseListar || this.claseListar.length === 0) {
     
    this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA,MENSAJES.SIN_CLASES_DISPONIBLES);

    } else {
      this.registrar();
    }
  }

  registrar() {
    const dialogRef = this.dialog.open(RegEjercicioComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        codigo: this.codigo,
        dia: this.dias,

      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })
  }

  verDetalle(ejercicio: any): void {

    const dialogRef = this.dialog.open(EditEjecicioComponent, {
      width: '1050px',
      disableClose: true,
      height: '550px',
      data: {
        codigo: this.codigo,
        dia: this.dias,
        ejercicio
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })

  }

  @Input() dias: string = '';

  constructor(
    private alertService: AlertService,
    private equipoService: EquipoService, private loginService: LoginService,
    private ejercicioService: EjercicioService, private claseService: ClaseService, private route: ActivatedRoute, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    this.listarEquipoDev()
    this.listarEjercicio()
  }

  codigo: string
  claseListar: any[] = []
  titulo: string
  objetivo: string
  descripcion: string
  codigoClase: string

  async listarClase() {
    this.claseService.listarClaseDevActivado().subscribe((data) => {

      data = data.filter(index => index.clase.equipo.codigo == this.codigo)
      const claseEncontrada = data.filter(index => index.dia == this.dias); 
      this.claseListar = claseEncontrada
      const claseEncontrada2 = claseEncontrada.find(index => index.dia == this.dias);
      this.titulo = claseEncontrada2.titulo
      this.descripcion = claseEncontrada2.descripcion
      this.objetivo = claseEncontrada2.objetivo
      this.codigoClase = claseEncontrada2.codigo
    })
  }

  ejerciciosListar: any[] = []

  async listarEjercicio() {
    this.ejercicioService.listar().subscribe((data) => {

      data = data.filter(index => index.clase.dia == this.dias)
      this.ejerciciosListar = data
      const filtrados = data.filter(item => {
        if (!item.clase || !item.clase.dia) {
          return false;
        }
        return item.clase.dia.split(" - ").includes(this.dias);
      });
    })
  }

  formatDescripcion(descripcion: string): string {
    return descripcion.replace(/\n/g, '<br>');
  }
  formatTexto(texto: string): string {
    return texto.replace(/\n/g, '<br>');
  }

  async listarEquipoDev() {
    this.equipoService.listarDev().subscribe((data) => {
      const codigoT = data
        ?.filter(i => i.estudiante?.usuario?.codigo === this.loginService.getUser().ul_codigo) // Filtra por coincidencia de código
        .map(i => i.equipo.codigo) 
      this.codigo = codigoT
      this.listarClase()
    });

  }

}
