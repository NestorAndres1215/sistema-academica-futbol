import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/core/services/general.service';
import { LoginService } from 'src/app/core/services/login.service';
import { LtDevComponent } from '../lt-dev/lt-dev.component';

import { HistorialService } from 'src/app/core/services/historial.service';
import { General } from 'src/app/core/model/General';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-reg-tb-general',
  templateUrl: './reg-tb-general.component.html',
  styleUrls: ['./reg-tb-general.component.css']
})
export class RegTbGeneralComponent implements OnInit {

  lista: any
  constructor(
    private dialogRe: MatDialogRef<LtDevComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private loginService: LoginService,
    private historialService: HistorialService,
    private generalService: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder,) { }
  formulario: UntypedFormGroup;

  ngOnInit(): void {
    this.codigo = this.data.codigo
    this.initForm()

  }
  codigo: string
  clave: string
  descripcion: string

  initForm() {
    this.formulario = this.formBuilder.group({
      clave: ["", Validators.required],
      descripcion: ["", Validators.required],
    });
  }

  operar() {
    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const objRegistrar: General = {
      clave: this.formulario.get('clave')?.value,
      descripcion1: this.formulario.get('descripcion')?.value,
      usuarioCreacion: this.loginService.getUser().username,
    };
    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró una nueva entrada en la tabla General con código ${this.codigo}.`
    };
    this.generalService.registrarGeneral(objRegistrar).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.dialog.closeAll();
        this.cdr.markForCheck(); 
      },
      error: error => {
       this.alertService.error(TITULO_MESAJES.ERROR_TITULO,error.error.message);
      }
    });


  }

  cerrar() {
    this.dialogRe.close();
  }


}
