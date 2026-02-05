import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';


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
    console.log(this.codigo)
  
  }
 
  activeTab1: number = 0;
  evaluacion: any[] = [];
  estudiante: any[] = [];



  

}
