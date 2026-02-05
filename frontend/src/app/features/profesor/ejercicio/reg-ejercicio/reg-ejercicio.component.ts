import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EjercicioService } from 'src/app/core/services/ejercicio.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';

import { Ejercicio } from 'src/app/core/model/Ejercicio';
import { Historial } from 'src/app/core/model/historial';
import { AdminClaseDiaComponent } from 'src/app/features/admin/modulo-clases/admin-clase-dia/admin-clase-dia.component';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reg-ejercicio',
  templateUrl: './reg-ejercicio.component.html',
  styleUrls: ['./reg-ejercicio.component.css']
})
export class RegEjercicioComponent implements OnInit {

  operar() {
    const dia = this.data.dia;
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


    const objclase: Ejercicio = {
      nombre: this.formulario.get('nombre')?.value,
      duracion: this.formulario.get('duracion')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
      tipo: this.formulario.get('tipo')?.value,
      intensidad: this.formulario.get('intensidad')?.value,
      usuarioCreacion: this.loginService.getUser().username,
      clase: this.codigo,
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró al clase detalle ${objclase.nombre} y con el  dia  ${this.dia}.`
    };

    this.ejercicioService.registrar(objclase).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.formulario.reset();
        this.dialog.closeAll();
        this.cdr.markForCheck();
      },
      error: error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });


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
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
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
      const claseEncontrada = data
        .filter(index => index.clase.codigo == this.codigo)
        .map(index => index.titulo);
      this.claseListar = claseEncontrada

    })
  }

}
