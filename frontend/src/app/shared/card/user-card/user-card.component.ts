import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() columnas: any[] = [];
  @Input() datos: any[] = [];

  @Output() ver = new EventEmitter<any>();

  obtenerValor(fila: any, clave: string): any {
    return clave.split('.').reduce((obj, key) => obj?.[key], fila);
  }
  imagenUrlBase = 'data:image/jpeg;base64,';
  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }

  onVer(fila: any) {
    this.ver.emit(fila);
  }
}
