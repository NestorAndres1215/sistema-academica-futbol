import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActualizarContraComponent } from '../actualizar-contra/actualizar-contra.component';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Usuario } from 'src/app/model/User';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-contra',
  templateUrl: './edit-contra.component.html',
  styleUrls: ['./edit-contra.component.css']
})
export class EditContraComponent implements OnInit {
  operar() {
    if (this.formulario.valid) {
  
      const { usuario, contraActual, nuevaContra, confirmarContra } = this.formulario.value;

    
      if (nuevaContra === this.contra) {
        this.mensaje.MostrarMensaje('La nueva contraseña no puede ser igual a la actual. Debe ser diferente.');
        return;
      }
    
      if (nuevaContra !== confirmarContra) {
        this.mensaje.MostrarMensaje('Las contraseñas no coinciden. Verifica y vuelve a intentarlo.');
        return;
      }
      console.log(usuario)
      const obj: Usuario = {
        ul_Codigo: this.codigo,
        username: this.usuario,
        password: confirmarContra
      };
      this.usuarioService.actualizarUsuario(obj).subscribe(
        response => {
        this.mensaje.MostrarMensaje("ACTUALIZO CONTRASEÑA")
        this.dialog.closeAll();
        this.cdr.detectChanges();
        },
        error => {
       this.mensaje.MostrarBodyError(error)
        }
      );
      

      console.log(obj)
   
    } else {
      console.error('Por favor, completa todos los campos correctamente.');
    }
  }
  cerrar() {
    this.dialogRe.close();
  }
  verContraActual = false;
  verNuevaContra = false;
  verConfirmarContra = false;

  constructor(private mensaje: MensajeService,
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private usuarioService:UserService,
    private dialog: MatDialog,
    private historialService: HistorialService,
    private dialogRe: MatDialogRef<ActualizarContraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  codigo: string
  usuario: string
  contra: string
  public formulario: UntypedFormGroup;
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
