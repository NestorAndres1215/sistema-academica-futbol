import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historial-evaluacion-admin',
  templateUrl: './historial-evaluacion-admin.component.html',
  styleUrls: ['./historial-evaluacion-admin.component.css']
})
export class HistorialEvaluacionAdminComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  ) { }
  codigo: string
  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
  }

  activeTab1: number = 0;
  evaluacion: any[] = [];
  estudiante: any[] = [];

}
