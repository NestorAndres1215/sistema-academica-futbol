import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ClaseService } from 'src/app/core/services/clase.service';
import { EjercicioService } from 'src/app/core/services/ejercicio.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
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
      // Aquí muestras un mensaje; puedes usar alert(), un toast, o algún otro mecanismo.
      this.mensajeService.MostrarMensaje("No se puede registrar ejercicio, no hay clases disponibles.");
    } else {
      // Si todo está en orden, llamamos al método registrar()
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

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })
  }
  // Este método se invoca al hacer clic en "Ver Detalle"
  verDetalle(ejercicio: any): void {
    console.log('Detalle del ejercicio:', ejercicio);

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

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
      this.listarEjercicio()
    })

  }
  @Input() dias: string = '';
  constructor(
    private equipoService:EquipoService,private loginService:LoginService,
    private mensajeService: MensajeService, private ejercicioService: EjercicioService, private claseService: ClaseService, private route: ActivatedRoute, private dialog: MatDialog) { }
  codigo: string
  ngOnInit(): void {
    console.log(this.dias)
    this.codigo = this.route.snapshot.params['codigo']
    this.listarEquipoDev()
    //this.listarClase()
    this.listarEjercicio()
  }
  claseListar: any[] = []
  titulo: string
  objetivo: string
  descripcion: string
  codigoClase: string

  async listarClase() {
    this.claseService.listarClaseDevActivado().subscribe((data) => {
      console.log(data)
      console.log(data.filter(i=>i.clase.equipo.codigo==this.codigo))
      data = data.filter(index => index.clase.equipo.codigo == this.codigo)
      console.log(this.dias)
      const claseEncontrada = data.filter(index => index.dia == this.dias); // Encuentra la clase
      console.log(claseEncontrada)
      console.log(this.dias)
      this.claseListar = claseEncontrada
      const claseEncontrada2 = claseEncontrada.find(index => index.dia == this.dias); // Encuentra la clase
      console.log(claseEncontrada2.titulo)
console.log(claseEncontrada2.codigo)
      this.titulo = claseEncontrada2.titulo
      this.descripcion = claseEncontrada2.descripcion
      this.objetivo = claseEncontrada2.objetivo
      this.codigoClase = claseEncontrada2.codigo
    })
  }
  ejerciciosListar: any[] = []
  async listarEjercicio() {
    this.ejercicioService.listar().subscribe((data) => {
      console.log(data.map(i => i.clase.clase.equipo)); 
console.log(data)
      console.log(data.filter(i=>i.clase.codigo=="0004"))
      console.log(this.dias)
     const  array =data.filter(i=>i.clase.codigo=="0004")
     console.log(array.filter(index => index.clase.dia == this.dias))

      data = data.filter(index => index.clase.dia == this.dias)
      console.log(data)
      this.ejerciciosListar = data
      console.log(this.ejerciciosListar)
      const filtrados = data.filter(item => {
        // Verifica que item.clase y item.clase.dia no sean null o undefined
        if (!item.clase || !item.clase.dia) {
          return false;
        }
        return item.clase.dia.split(" - ").includes(this.dias);
      });

      //
      console.log(this.dias)
      console.log(filtrados);
      console.log("")
      //const claseEncontrada = data.filter(index => index.dia == this.dias); // Encuentra la clase
      //this.claseListar = claseEncontrada

    })
  }
  formatDescripcion(descripcion: string): string {
    return descripcion.replace(/\n/g, '<br>');
  }
  formatTexto(texto: string): string {
    return texto.replace(/\n/g, '<br>');
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
     this.listarClase()
    });

  }
  listaClases(){}
}
