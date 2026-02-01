import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent  {

  @Input() titulo: string = '';

  // 🔥 Un solo objeto de configuración
  @Input() botonesConfig: {
    editar?: boolean;
    volver?: boolean;
  } = {};

  @Output() editar = new EventEmitter<void>();
  @Output() volver = new EventEmitter<void>();


}
