import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MantEquipoComponent } from '../mant-equipo/mant-equipo.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/services/general.service';
import { HistorialService } from 'src/app/services/historial.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { SedeService } from 'src/app/services/sede.service';
import { LoginService } from 'src/app/services/login.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Historial } from 'src/app/model/historial';
import { Equipo } from 'src/app/model/equipo';

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
           usuario: this.loginService.getUser().username, // Usuario que realiza la acción
           detalle: `El usuario ${this.loginService.getUser().username} actualizó al equipo ${objEquipo.nombre}`,
         };
         this.historialService.registrar(historial).subscribe(
           () => {
             // Si el historial se registra correctamente, proceder con la actualización del estudiante
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
             // Si hubo un error al registrar el historial, mostrar un mensaje de error
             this.mensaje.MostrarBodyError("Error al registrar el historial: " + error);
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
  sedes: any[] = []; // Lista de sedes
  generos: any[] = []; // Lista de sedes
  categorias: any[] = []; // Lista de sedes
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
      (error) => {
        console.error('Error al listar las sedes', error);
      }
    );
  }

}
