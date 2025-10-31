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
  selector: 'app-reg-cargo',
  templateUrl: './reg-cargo.component.html',
  styleUrls: ['./reg-cargo.component.css']
})
export class RegCargoComponent implements OnInit {

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
    this.initForm()
  }



  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],


    });
  }

  operar() {
    if (this.formulario.valid) {

      const objRegistrar: Cargo = {

        nombre: this.formulario.get('nombre')?.value,
        descripcion: this.formulario.get('descripcion')?.value,
        usuarioCreacion: this.loginService.getUser().username,
      };
      console.log(objRegistrar)

      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Obtener el nombre de usuario del servicio de login
        detalle: `El usuario ${this.loginService.getUser().username} registró un nuevo cargo ${this.formulario.get('nombre')?.value} ` 
      };
      this.cargo.registrarCargo(objRegistrar).subscribe(
        response => {
          // Registrar el historial solo después de que se haya registrado el cargo
          this.historialService.registrar(historial).subscribe(
            () => {
              this.mensaje.MostrarMensajeExito("SE REGISTRÓ CARGO");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error); // Manejar error de registrar historial
            }
          );
        },
        error => {
          this.mensaje.MostrarBodyError(error); // Manejar error de registrar cargo
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
