import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { AdminClaseDiaComponent } from '../admin-clase-dia/admin-clase-dia.component';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

import { ClaseService } from 'src/app/core/services/clase.service';
import { ClaseDev } from 'src/app/core/model/clasedev';
import { Historial } from 'src/app/core/model/historial';
import { SwalService } from 'src/app/core/services/swal.service';


@Component({
  selector: 'app-admin-carga-clase',
  templateUrl: './admin-carga-clase.component.html',
  styleUrls: ['./admin-carga-clase.component.css']
})
export class AdminCargaClaseComponent implements OnInit {


  operar() {

    if (!this.formulario.valid) {
      this.swalService.advertencia("Formulario vacío", "Por favor completa todos los campos obligatorios.");
      this.formulario.markAllAsTouched();
      return;
    }

    const objClase: ClaseDev = {
      titulo: this.formulario.get('titulo')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
      objetivo: this.formulario.get('objetivo')?.value,
      clase: this.codigo,
      usuarioCreacion: this.loginService.getUser().username,
      dia: this.dia
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró al clase detalle ${objClase.titulo} y con el  dia  ${this.dia}.`
    };


    this.claseService.registrarDev(objClase).subscribe({
      next: () => {
        this.historialService.registrar(historial).subscribe({
          next: () => {
            this.mensaje.MostrarMensajeExito("Se registró correctamente");
            this.formulario.reset();
            this.dialog.closeAll();
            this.cdr.detectChanges();
          },
          error: err => this.swalService.error("ERROR", err.error.message)
        });
      },
      error: err => this.swalService.error("ERROR", err.error.message)
    });


  }
  cerrar() {
    this.dialogRe.close();
  }
  dia: string
  formulario: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private claseService: ClaseService,
    private mensaje: MensajeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private swalService: SwalService,
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
      descripcion: ['', Validators.required],
      objetivo: ['', Validators.required],
      titulo: ['', Validators.required],
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
