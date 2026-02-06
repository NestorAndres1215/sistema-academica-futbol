import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-partidos-card',
  templateUrl: './partidos-card.component.html',
  styleUrls: ['./partidos-card.component.css']
})
export class PartidosCardComponent {

  @Input() equipoSeleccionada: string | null = null;
  @Input() estudiantesFiltrados: any[] = [];

}
