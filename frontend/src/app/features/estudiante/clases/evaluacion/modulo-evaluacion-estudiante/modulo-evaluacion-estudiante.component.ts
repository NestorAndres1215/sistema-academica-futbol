import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modulo-evaluacion-estudiante',
  templateUrl: './modulo-evaluacion-estudiante.component.html',
  styleUrls: ['./modulo-evaluacion-estudiante.component.css']
})
export class ModuloEvaluacionEstudianteComponent implements OnInit {

  constructor(private route: ActivatedRoute
  ) { }
  codigo: string
  ngOnInit(): void {


  }


  activeTab1: number = 0;
  evaluacion: any[] = [];
  estudiante: any[] = [];




}
