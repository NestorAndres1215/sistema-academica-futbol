import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


@Input() totalItems = 0;
  @Input() pageSize = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 15, 25, 100];

  @Output() page = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent): void {
    this.page.emit(event); // 🔥 AQUÍ estaba el problema
  }
}
