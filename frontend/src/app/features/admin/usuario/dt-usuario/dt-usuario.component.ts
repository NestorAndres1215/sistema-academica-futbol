import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dt-usuario',
  templateUrl: './dt-usuario.component.html',
  styleUrls: ['./dt-usuario.component.css']
})
export class DtUsuarioComponent implements OnInit {

  formulario: UntypedFormGroup;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    const dataArray = Object.values(this.data);
    this.datos = dataArray;
  }

  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }

}