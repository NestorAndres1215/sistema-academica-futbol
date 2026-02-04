import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.css']
})
export class FilterSelectComponent  {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() value: any;
@Input() showTodos: boolean = true; 
  @Output() valueChange = new EventEmitter<any>();

  onChange(value: any) {
    this.valueChange.emit(value);
  }
}
