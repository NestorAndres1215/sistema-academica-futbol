import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dv-est-perfil',
  templateUrl: './dv-est-perfil.component.html',
  styleUrls: ['./dv-est-perfil.component.css']
})
export class DvEstPerfilComponent implements OnInit {

 public formulario: UntypedFormGroup;
   
   constructor(private formBuilder: UntypedFormBuilder,
     @Inject(MAT_DIALOG_DATA) public data: any,
   ) { }
   
   datos: any
   imagenUrlBase = 'data:image/jpeg;base64,';
   username: string
   email: string;
   telefono: string;
   nombre: string
   apellido: string
   contra: string
   direccion: string
   rol: string

   ngOnInit(): void {
     const dataArray = Object.values(this.data);
     this.datos = dataArray;
   }
 
   mostrarImagen(perfil: any): string {
     return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
   }
 

}
