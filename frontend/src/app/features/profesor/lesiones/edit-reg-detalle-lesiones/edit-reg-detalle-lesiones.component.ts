import { ChangeDetectorRef, Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LesionService } from 'src/app/core/services/lesion.service';

import { ModuloLesionesComponent } from '../modulo-lesiones/modulo-lesiones.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Historial } from 'src/app/core/model/historial';
import { HistorialService } from 'src/app/core/services/historial.service';
import { firstValueFrom } from 'rxjs';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-edit-reg-detalle-lesiones',
  templateUrl: './edit-reg-detalle-lesiones.component.html',
  styleUrls: ['./edit-reg-detalle-lesiones.component.css']
})
export class EditRegDetalleLesionesComponent implements OnInit {
  operar() {
    const objeto = {
      lesiones: this.codigo,
      tipoEvento: this.formulario.value.tipoEvento || '',
      descripcion: this.formulario.value.descripcion || '',
      responsable: this.formulario.value.responsable || '',
      observaciones: this.formulario.value.observaciones || ''
    };

    console.log(objeto);
    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizo un nuevo lesion ${this.formulario.get('nombre')?.value} `
    };

    this.lesionService.registrarDev(objeto).subscribe({
      next: async () => {
        await firstValueFrom(this.historialService.registrar(historial));
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        this.dialog.closeAll();
        this.cdr.detectChanges();

      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    });

  }

  cerrar() {
    this.dialogRe.close();
  }
  formulario: UntypedFormGroup;

  constructor(
    private lesionService: LesionService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private historialService: HistorialService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRe: MatDialogRef<ModuloLesionesComponent>,
    private dialog: MatDialog
  ) { }

  codigo: string
  ngOnInit(): void {
    console.log(this.data.lesionCompleto)
    console.log(this.data.row.lesionado.codigo)
    this.codigo = this.data.row.lesionado.codigo
    this.formulario = this.formBuilder.group({
      tipoEvento: ['', Validators.required],
      descripcion: ['', [Validators.required,]],
      responsable: ['', Validators.required],
      observaciones: ['']
    });
  }

}


