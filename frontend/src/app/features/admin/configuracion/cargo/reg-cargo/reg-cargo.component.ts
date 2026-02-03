import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CargoComponent } from '../cargo/cargo.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CargoService } from 'src/app/core/services/cargo.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { LoginService } from 'src/app/core/services/login.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Cargo } from 'src/app/core/model/Cargo';
import { Historial } from 'src/app/core/model/historial';

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
    private historialService: HistorialService,
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

    if (!this.formulario.valid) {
      this.mensaje.MostrarMensaje('FORMULARIO VACÍO');
      this.formulario.markAllAsTouched();
      return;
    }


    const objRegistrar: Cargo = {
      nombre: this.formulario.get('nombre')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    };


    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró un nuevo cargo ${this.formulario.get('nombre')?.value} `
    };
    this.cargo.registrarCargo(objRegistrar).subscribe(
      response => {

        this.historialService.registrar(historial).subscribe(
          () => {
            this.mensaje.MostrarMensajeExito("SE REGISTRÓ CARGO");
            this.dialog.closeAll();
            this.cdr.detectChanges();
          },
          error => {
            this.mensaje.MostrarBodyError(error);
          }
        );
      },
      error => {
        this.mensaje.MostrarBodyError(error); // Manejar error de registrar cargo
      }
    );


  }

  cerrar() {
    this.dialogRe.close();
  }

}
