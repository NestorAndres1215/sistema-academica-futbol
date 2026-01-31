import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/services/clase.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';

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
