import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-historial-evaluacion',
  templateUrl: './historial-evaluacion.component.html',
  styleUrls: ['./historial-evaluacion.component.css']
})
export class HistorialEvaluacionComponent implements OnInit {

 constructor(
  private route: ActivatedRoute, 
  ) { }

  codigo: string
  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
  }
 
  activeTab1: number = 0;
  evaluacion: any[] = [];
  estudiante: any[] = [];

}
