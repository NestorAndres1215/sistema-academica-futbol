import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

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
