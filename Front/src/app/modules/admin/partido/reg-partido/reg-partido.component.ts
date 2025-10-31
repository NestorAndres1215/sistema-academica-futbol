import { Time } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Historial } from 'src/app/model/historial';
import { Partido } from 'src/app/model/partido';
import { EquipoService } from 'src/app/services/equipo.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PartidoService } from 'src/app/services/partido.service';
import { LsPartidoComponent } from '../ls-partido/ls-partido.component';

@Component({
  selector: 'app-reg-partido',
  templateUrl: './reg-partido.component.html',
  styleUrls: ['./reg-partido.component.css']
})
export class RegPartidoComponent implements OnInit {
  time: string = ''; // Define la variable con un valor inicial
  operar() {
    console.log(this.formulario.value)

if (this.formulario.valid) {
      const objPartido:   Partido = {
        codigo: this.codigoPartido,
        equipoRival: this.formulario.get('equipoRival')?.value,
        fecha: this.formulario.get('fecha')?.value,
        hora: this.formulario.get('hora')?.value,
        lugar: this.formulario.get('lugar')?.value,
        tipoPartido: this.formulario.get('tipo')?.value,
        equipo: this.formulario.get('equipo')?.value,
      };
      console.log(objPartido)

      const historial: Historial = {
        usuario: this.loginService.getUser().username, // Usuario que realiza la acción
        detalle: `El usuario ${this.loginService.getUser().username} registro al partido ${objPartido.codigo} .`,
      };

      // Registrar el historial
      this.partidoService.registrar(objPartido).subscribe(
        () => {
          // Si el historial se registra correctamente, proceder con la actualización del estudiante
          this.historialService.registrar(historial).subscribe(
            response => {
              this.mensaje.MostrarMensajeExito("SE REGISTRO ");
              this.dialog.closeAll();
              this.cdr.detectChanges();
            },
            error => {

              this.mensaje.MostrarMensajeError(error);
            }
          );
        },
        error => {
          // Si hubo un error al registrar el historial, mostrar un mensaje de error
          console.error(error.error)
          this.mensaje.MostrarMensajeError(error.error);
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



  constructor(
    private partidoService:PartidoService,
    private mensaje:MensajeService,
    private formBuilder: UntypedFormBuilder,
    private loginService:LoginService,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private historialService: HistorialService,
    private dialogRe: MatDialogRef<LsPartidoComponent>,

    private equipoService: EquipoService
  ) { }


  public formulario: UntypedFormGroup;
  equipoLocal: string
  equipoRival: string
  fecha: Date
  hora: Time
  lugar: string
  tipoPartido: string
codigoPartido:string
  ngOnInit(): void {

    this.listaEquipo()
    this.initForm()
  }
  equipo: any
  listaEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      console.log(data)
      this.equipo = data

    })
  }

  initForm(): void {
    const fechaUtc = new Date(this.fecha);
    const fechaLocal = new Date(fechaUtc.getTime() + fechaUtc.getTimezoneOffset() * 60000);
    this.formulario = this.formBuilder.group({
      equipo: [ this.equipo, Validators.required],
      equipoRival: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugar: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }
}
