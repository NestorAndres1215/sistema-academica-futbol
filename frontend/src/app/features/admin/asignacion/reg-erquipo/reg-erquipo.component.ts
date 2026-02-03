import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MantEquipoComponent } from '../mant-equipo/mant-equipo.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/core/services/general.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { SedeService } from 'src/app/core/services/sede.service';
import { LoginService } from 'src/app/core/services/login.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Equipo } from 'src/app/core/model/equipo';
import { Historial } from 'src/app/core/model/historial';


@Component({
  selector: 'app-reg-erquipo',
  templateUrl: './reg-erquipo.component.html',
  styleUrls: ['./reg-erquipo.component.css']
})
export class RegERquipoComponent implements OnInit {
  cerrar() {
    this.dialogRe.close();
  }

  operar() {
    if (this.formulario.valid) {
      const objEquipo: Equipo = {

        nombre: this.formulario.get('nombre')?.value,
        sede: this.formulario.get('sede')?.value,
        categoria: this.formulario.get('categoria')?.value,
        genero: this.formulario.get('genero')?.value,
        usuarioRegistro: this.loginService.getUser().username,
      }
      const historial: Historial = {
        usuario: this.loginService.getUser().username,
        detalle: `El usuario ${this.loginService.getUser().username} actualizó al equipo ${objEquipo.nombre}`,
      };
      this.historialService.registrar(historial).subscribe(
        () => {

          this.equipoService.registrar(objEquipo).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE REGISTRO EQUIPO");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {
              this.mensaje.MostrarBodyError(error);
            }
          );
        },
        error => {
          this.mensaje.MostrarBodyError("Error al registrar el historial: " + error.message);
        }
      );
    } else {
      this.mensaje.MostrarMensajeError("FORMULARIO VACIO")
    }
  }


  public formulario: UntypedFormGroup;
  constructor(
    private mensaje: MensajeService,
    private sedeService: SedeService,
    private historialService: HistorialService,
    private equipoService: EquipoService,
    private generales: GeneralService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private loginService: LoginService,
    private dialogRe: MatDialogRef<MantEquipoComponent>,
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.listarSede()
    this.listaGenero()
    this.listaPosicion()
    this.initForm()
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      genero: ['', Validators.required],
      sede: ['', Validators.required],
    });
  }
  sedes: any[] = []; 
  generos: any[] = []; 
  categorias: any[] = []; 

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.generos = data;

    })
  }

  async listaPosicion() {
    this.generales.listarGeneralDevActivado("0004").subscribe((data) => {
      console.log(data)
      this.categorias = data;

    })
  }

  listarSede(): void {
    this.sedeService.listarSedeActivado().subscribe(
      (data) => {
        this.sedes = data;
      },
    );
  }

}
