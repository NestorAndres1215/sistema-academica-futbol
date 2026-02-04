import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor() { }

  @Input() value = '';
  @Input() placeholder = 'Buscar';
  @Input() hint = 'Ingrese al menos 3 caracteres';

  @Output() valueChange = new EventEmitter<string>();

  onChange(valor: string) {
    this.valueChange.emit(valor);
  }

}
