import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Cargo } from 'src/app/model/Cargo';
import { CargoComponent } from '../cargo/cargo.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CargoService } from 'src/app/services/cargo.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { LoginService } from 'src/app/services/login.service';
import { Historial } from 'src/app/model/historial';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-edit-cargo',
  templateUrl: './edit-cargo.component.html',
  styleUrls: ['./edit-cargo.component.css']
})
export class EditCargoComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<CargoComponent>,
    private cargo: CargoService,
    private historialService:HistorialService,
 
   
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private mensaje: MensajeService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,) { }
  public formulario: UntypedFormGroup;
  ngOnInit(): void {
    this.lista = this.data
    this.listarEdiciones()
  }

  nombre: string
  descripcion: string
  usuarioCreacion: string
  fechaCreacion: string;
  horaCreacion: string;
  usuarioActualizacion: string;
  fechaActualizacion: string;
  horaActualizacion: string;
  codigo: string
  listarEdiciones() {
    this.codigo = this.lista.row.codigo
    this.nombre = this.lista.row.nombre;
    this.descripcion = this.lista.row.descripcion;

    this.usuarioCreacion = this.lista.row.usuarioCreacion;
    this.fechaCreacion = this.lista.row.fechaCreacion;
    this.horaCreacion = this.lista.row.horaCreacion;
    this.usuarioActualizacion = this.lista.row.usuarioActualizacion;
    this.fechaActualizacion = this.lista.row.fechaActualizacion;
    this.horaActualizacion = this.lista.row.horaActualizacion;

    this.initForm()

  }
  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, Validators.required],
      descripcion: [this.descripcion, Validators.required],


    });
  }

  operar() {
    if (this.formulario.valid) {

      const objRegistrar: Cargo = {
        codigo: this.codigo,
        nombre: this.formulario.get('nombre')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        usuarioCreacion: this.usuarioCreacion,
        usuarioActualizacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar)
            const historial: Historial = {
              usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
              detalle: `El usuario ${this.loginService.getUser().username} actualizo un nuevo cargo ${this.formulario.get('nombre')?.value} ` 
            };
    
            this.cargo.actualizarCargo(objRegistrar).subscribe(
              response => {
                // Registrar historial después de actualizar el cargo
                this.historialService.registrar(historial).subscribe(
                  () => {
                    this.mensaje.MostrarMensajeExito("SE ACTUALIZÓ CARGO ");
                    this.dialog.closeAll();
                    this.cdr.detectChanges();
                  },
                  error => {
                    this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
                  }
                );
              },
              error => {
                this.mensaje.MostrarBodyError(error);
              }
            );
            
    }
    else {
      this.mensaje.MostrarMensaje("FORMULARIO VACIO")
      this.formulario.markAllAsTouched();
    }
  }

  cerrar() {
    this.dialogRe.close();
  }

}
