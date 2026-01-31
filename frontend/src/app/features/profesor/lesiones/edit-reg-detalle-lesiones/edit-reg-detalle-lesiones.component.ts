import { ChangeDetectorRef, Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { EquipoService } from 'src/app/core/services/equipo.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LesionService } from 'src/app/core/services/lesion.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ModuloLesionesComponent } from '../modulo-lesiones/modulo-lesiones.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

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
    this.lesionService.registrarDev(objeto).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.dialog.closeAll();
        this.cdr.detectChanges();
        this.mensaje.MostrarMensajeExito("SE ACTUALIZO DETALLE DE LESION");
      },
      error: (error) => console.error('Error al registrar:', error)
    });
    
  }
  
 cerrar() {
    this.dialogRe.close();
  }
 formulario: UntypedFormGroup;
  constructor(
   
    private estudianteService: EstudianteService, private historialService: HistorialService, private lesionService: LesionService,
    private formBuilder: UntypedFormBuilder,
    private equipodevService: EquipoService,
    private mensaje: MensajeService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRe: MatDialogRef<ModuloLesionesComponent>,
    private dialog: MatDialog
  ) { }
codigo:string
  ngOnInit(): void {
    console.log(this.data.lesionCompleto)
    console.log(this.data.row.lesionado.codigo)
this.codigo=this.data.row.lesionado.codigo
    this.formulario = this.formBuilder.group({
      tipoEvento: ['', Validators.required],
      descripcion: ['', [Validators.required,]],
      responsable: ['', Validators.required],
      observaciones: ['']
    });
  }

}


