import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent implements OnInit {

datos: any[] = [];
columnas: any[] = [];
tipoUsuario: 'admin' | 'profesor' = 'profesor';
imagenUrlBase = 'data:image/jpeg;base64,';

constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

ngOnInit(): void {
  this.datos = this.data.perfiles || [];
  this.columnas = this.data.columnas || [];
  this.tipoUsuario = this.data.tipoUsuario || 'profesor';
}

getImagen(perfil: any): string {
  return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
}

obtenerValor(obj: any, clave: string): any {
  return clave.split('.').reduce((o, k) => (o ? o[k] : ''), obj);
}

}
