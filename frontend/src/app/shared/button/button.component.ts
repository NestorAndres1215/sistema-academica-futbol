import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  ngOnInit(): void {
   
  }

 @Input() label: string = '';
  @Input() color: string = 'primary'; // primary, secondary, success, danger, warning...
  @Input() size: string = 'md'; // sm | md | lg
  @Input() icon: string = ''; // ej: 'fas fa-save'
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() block: boolean = false; // full width
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled && !this.loading) {
      this.onClick.emit();
    }
  }

}
