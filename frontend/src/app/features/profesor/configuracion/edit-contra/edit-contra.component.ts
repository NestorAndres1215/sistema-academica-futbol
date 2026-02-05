import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActualizarContraComponent } from '../actualizar-contra/actualizar-contra.component';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/model/User';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { firstValueFrom } from 'rxjs';
import { HistorialService } from 'src/app/core/services/historial.service';
import { Historial } from 'src/app/core/model/historial';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-edit-contra',
  templateUrl: './edit-contra.component.html',
  styleUrls: ['./edit-contra.component.css']
})
export class EditContraComponent implements OnInit {
  operar() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const { nuevaContra, confirmarContra } = this.formulario.value;

    if (nuevaContra === this.contra) {
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.CONTRASENA_IGUAL);
      return;
    }

    if (nuevaContra !== confirmarContra) {
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.CONTRASENAS_NO_COINCIDEN);
      return;
    }

    const obj: Usuario = {
      ul_Codigo: this.codigo,
      username: this.usuario,
      password: confirmarContra
    };

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} actualizo la contraseña`
    };
    this.usuarioService.actualizarUsuario(obj).subscribe(
      async () => {
        this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
        await firstValueFrom(this.historialService.registrar(historial));
        this.dialog.closeAll();
        this.cdr.detectChanges();
      },
      error => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    );





  }
  cerrar() {
    this.dialogRe.close();
  }

  verContraActual = false;
  verNuevaContra = false;
  verConfirmarContra = false;

  constructor(
    private loginService: LoginService,
    private historialService: HistorialService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private usuarioService: UserService,
    private dialog: MatDialog,
    private dialogRe: MatDialogRef<ActualizarContraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  codigo: string
  usuario: string
  contra: string
  formulario: UntypedFormGroup;

  ngOnInit(): void {
    console.log(this.data.row)
    console.log(this.data.row.username)
    console.log(this.data.row.codigo)
    console.log(this.data.row.password)
    this.codigo = this.data.row.codigo;
    this.usuario = this.data.row.username;
    this.contra = this.data.row.password;
    this.initForm()
  }

  initForm() {
    this.formulario = this.fb.group({
      usuario: [{ value: this.usuario, disabled: true }, [Validators.required]],
      contraActual: [{ value: this.contra, disabled: true }, [Validators.required]],
      nuevaContra: ['', [Validators.required]],
      confirmarContra: ['', [Validators.required]]
    });
  }


}
