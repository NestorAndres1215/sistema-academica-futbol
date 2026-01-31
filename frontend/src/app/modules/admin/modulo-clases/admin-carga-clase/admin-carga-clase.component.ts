import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { AdminClaseDiaComponent } from '../admin-clase-dia/admin-clase-dia.component';
import { GeneralService } from 'src/app/core/services/general.service';
import { Router } from '@angular/router';
import { HistorialService } from 'src/app/core/services/historial.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

import { ClaseService } from 'src/app/core/services/clase.service';
import { ClaseDev } from 'src/app/core/model/clasedev';
import { Historial } from 'src/app/core/model/historial';


@Component({
  selector: 'app-admin-carga-clase',
  templateUrl: './admin-carga-clase.component.html',
  styleUrls: ['./admin-carga-clase.component.css']
})
export class AdminCargaClaseComponent implements OnInit {
  operar() {

    console.log(this.formulario.value)
    if (this.formulario.valid) {
      const objclase: ClaseDev = {
        titulo: this.formulario.get('titulo')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        objetivo: this.formulario.get('objetivo')?.value,
        clase: this.codigo,
        usuarioCreacion: this.loginService.getUser().username,
        dia: this.dia
      };
      console.log(objclase)
      // Crear el objeto del historial
      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} registró al clase detalle ${objclase.titulo} y con el  dia  ${this.dia}.`
      };

      // Registrar el historial
      this.claseService.registrarDev(objclase).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con el registro del estudiante
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
      
      console.log(claseFiltrada);
      
      this.tituloClase = claseFiltrada;

    })
  }
  initForm(): void {
    this.formulario = this.formBuilder.group({
      // sede: [this.sedes, Validators.required],
      descripcion: ['', Validators.required],
      objetivo: ['', Validators.required], // Corregido: Eliminar la coma extra
      titulo: ['', Validators.required],
    });

  }

  listarClaseDetalle() {
    this.claseService.listarClaseDevActivado().subscribe((data) => {
      console.log(data)
      const claseEncontrada = data
        .filter(index => index.clase.codigo == this.codigo) // Filtra las clases que coincidan con el código
        .map(index => index.titulo);
      // Encuentra la clase

      //console.log(claseEncontrada)
      //console.log(this.dias)
      this.claseListar = claseEncontrada
      console.log(this.claseListar)
      //  const claseEncontrada2 = claseEncontrada.find(index => index.dia == this.dias); // Encuentra la clase
      //console.log(claseEncontrada2.titulo)

      //this.titulo = claseEncontrada2.titulo
      //this.descripcion = claseEncontrada2.descripcion
      //this.objetivo = claseEncontrada2.objetivo
      //this.codigoClase = claseEncontrada2.codigo
    })
  }
}
