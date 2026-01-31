import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClaseDev } from 'src/app/model/clasedev';
import { Ejercicio } from 'src/app/model/Ejercicio';
import { Historial } from 'src/app/model/historial';
import { AdminClaseDiaComponent } from 'src/app/modules/admin/modulo-clases/admin-clase-dia/admin-clase-dia.component';
import { ClaseService } from 'src/app/services/clase.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { GeneralService } from 'src/app/services/general.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-reg-ejercicio',
  templateUrl: './reg-ejercicio.component.html',
  styleUrls: ['./reg-ejercicio.component.css']
})
export class RegEjercicioComponent implements OnInit {

  operar() {
    const dia = this.data.dia;
    console.log(dia)
    // Por ejemplo: "LUNES Y MARTES"
    let codigo = '';

    switch (dia) {
      case "LUNES":
      case "MARTES":
        codigo = "0001";
        break;
      case "MIERCOLES":
      case "JUEVES":
        codigo = "0002";
        break;
      case "VIERNES":
      case "SABADO":
        codigo = "0003";
        break;
      default:
        codigo = "Código no definido";
        break;
    }

    if (this.formulario.valid) {

      const objclase: Ejercicio = {
        nombre: this.formulario.get('nombre')?.value,
        duracion: this.formulario.get('duracion')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        tipo: this.formulario.get('tipo')?.value,
        intensidad: this.formulario.get('intensidad')?.value,
        usuarioCreacion: this.loginService.getUser().username,
        clase: this.codigo ,
      };

      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} registró al clase detalle ${objclase.nombre} y con el  dia  ${this.dia}.`
      };

      // Registrar el historial
      this.ejercicioService.registrar(objclase).subscribe(
        () => {
          
          this.historialService.registrar(historial).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE REGISTRO  CORRECTAMENTE");
              this.formulario.reset();
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
          // Si hubo un error al registrar el historial, mostrar un mensaje de error
          this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
        }
      );
    }
    else {
      console.log("formulario vacio")
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }
  }
  cerrar() {
    this.dialogRe.close();
  }
  dia: string
  formulario: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private ejercicioService: EjercicioService,
    private claseService: ClaseService,
    private mensaje: MensajeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private router: Router,
    private generalService: GeneralService,
    private dialogRe: MatDialogRef<AdminClaseDiaComponent>,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }
  codigo: string
  ngOnInit(): void {
    console.log(this.data.dia)
    this.codigo = this.data.codigo
    this.dia = this.data.dia
    this.listarClaseDetalle()
    this.listarClase()
    this.initForm()
  }
  claseListar: any
  titulo: string
  objetivo: string
  descripcion: string
  codigoClase: string
  tituloClase: any
  @Input() dias: string = '';






  listarClase() {
    this.generalService.listarGeneralDevActivado("0008").subscribe((data) => {
      console.log(data.descripcion1)
      console.log(this.claseListar)
      const claseFiltrada = data.filter(item =>
        !this.claseListar.some(clase => clase === item.descripcion1)
      );
      this.tituloClase = claseFiltrada;

    })
  }
  initForm(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      duracion: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      intensidad: ['', Validators.required]
    });

  }

  listarClaseDetalle() {
    this.claseService.listarClaseDevActivado().subscribe((data) => {
      console.log(data)
      const claseEncontrada = data
        .filter(index => index.clase.codigo == this.codigo)
        .map(index => index.titulo);
      this.claseListar = claseEncontrada
      console.log(this.claseListar)

    })
  }

}
