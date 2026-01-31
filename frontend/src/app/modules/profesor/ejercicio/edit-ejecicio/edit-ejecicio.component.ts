import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AdminClaseDiaComponent } from 'src/app/modules/admin/modulo-clases/admin-clase-dia/admin-clase-dia.component';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EjercicioService } from 'src/app/core/services/ejercicio.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { Ejercicio } from 'src/app/core/model/Ejercicio';
import { Historial } from 'src/app/core/model/historial';

@Component({
  selector: 'app-edit-ejecicio',
  templateUrl: './edit-ejecicio.component.html',
  styleUrls: ['./edit-ejecicio.component.css']
})
export class EditEjecicioComponent implements OnInit {

   operar() {
    
     console.log(this.formulario.value)
     if (this.formulario.valid) {
 
       const objclase: Ejercicio = {
        codigo:this.codigoEjercicio,
         nombre: this.formulario.get('nombre')?.value,
         duracion: this.formulario.get('duracion')?.value,
         descripcion: this.formulario.get('descripcion')?.value,
         tipo: this.formulario.get('tipo')?.value,
         intensidad: this.formulario.get('intensidad')?.value,
         usuarioActualizacion: this.loginService.getUser().username,
         clase: this.clase,
       };
       console.log(objclase)
       // Crear el objeto del historial
       const historial: Historial = {
         usuario: this.loginService.getUser().username, // Usuario que realiza la acción
         detalle: `El usuario ${this.loginService.getUser().username} registró al clase detalle ${objclase.nombre} y con el  dia  ${this.dia}.`
       };
 
       // Registrar el historial
       this.ejercicioService.actualizar(objclase).subscribe(
         () => {
           // Si el historial se registra correctamente, proceder con el registro del estudiante
           this.historialService.registrar(historial).subscribe(
             response => {
               this.mensaje.MostrarMensajeExito("SE ACTUALIZO  CORRECTAMENTE");
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
   codigoEjercicio: string;  
   nombre: string;  
   duracion: string;  
   descripcion: string;  
   tipo: string;  
   intensidad: string;  
   clase:string
   ngOnInit(): void {
     console.log(this.data.ejercicio)
     this.codigoEjercicio=this.data.ejercicio.codigo
     this.nombre=this.data.ejercicio.nombre
     this.clase=this.data.ejercicio.clase.codigo
     console.log(this.clase)
     this.duracion=this.data.ejercicio.duracion
     this.descripcion=this.data.ejercicio.descripcion
     this.tipo=this.data.ejercicio.tipo
     this.intensidad=this.data.ejercicio.intensidad
     this.codigo = this.data.codigo
     this.dia = this.data.dia
     this.listarClaseDetalle()
     this.listarClase()
     this.initForm()
   }
   claseListar: any
   codigoClase: string
   @Input() dias: string = '';
 
 
 
 
 
 
   listarClase() {
     this.generalService.listarGeneralDevActivado("0008").subscribe((data) => {
       console.log(data.descripcion1)
       console.log(this.claseListar)
       const claseFiltrada = data.filter(item =>
         !this.claseListar.some(clase => clase === item.descripcion1)
       );

 
     })
   }
   initForm(): void {
     this.formulario = this.formBuilder.group({
       nombre: [this.nombre, Validators.required],
       duracion: [this.duracion, Validators.required],
       descripcion: [this.descripcion, Validators.required],
       tipo: [this.tipo, Validators.required],
       intensidad: [this.intensidad, Validators.required]
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
