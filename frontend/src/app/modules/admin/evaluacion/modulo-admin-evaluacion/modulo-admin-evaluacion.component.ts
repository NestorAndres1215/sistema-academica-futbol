import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Historial } from 'src/app/model/historial';
import { ClaseService } from 'src/app/services/clase.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-modulo-admin-evaluacion',
  templateUrl: './modulo-admin-evaluacion.component.html',
  styleUrls: ['./modulo-admin-evaluacion.component.css']
})
export class ModuloAdminEvaluacionComponent implements OnInit {


  guardarDatos() {
    const arrayT = this.evaluacion.map(i => ({ equipo: i.equipo, conteo: i.conteo || 0 }));

    const resultado = arrayT.reduce((acc, curr) => {
      const existente = acc.find(item => item.equipo === curr.equipo);
      if (existente) {
        existente.conteo = curr.conteo;
      } else {
        acc.push({ equipo: curr.equipo, conteo: curr.conteo });
      }
      return acc;
    }, []);

    // Extraer arrays separados
    const equipos = resultado.map(item => item.equipo).join(",");
    console.log(equipos);

    const conteos = resultado.map(item => item.conteo).join(",");
    console.log(conteos);


    console.log("Equipos:", equipos);
    console.log("Conteos:", conteos);

    this.evaluacionService.desactivarEvaluaciones(equipos, conteos).subscribe(
      (response) => {
        this.mensajeService.MostrarMensajeExito("SE GUARDARON LAS EVALUACIONES");
        console.log("Evaluaciones desactivadas con éxito:", response);
        this.listarEvaluacion(); // Debe estar dentro del éxito para ejecutarse después de guardar
      },
      (error) => {
        console.error("Error al desactivar evaluaciones:", error);
      }
    );

  }
  editar(arg0: any) {
    throw new Error('Method not implemented.');
  }


 

  modoEdicion: boolean = false;
  constructor(private route: ActivatedRoute, private historialService: HistorialService, private mensajeService: MensajeService,
    private loginService: LoginService,
    private evaluacionService: EvaluacionService,
    private claseService: ClaseService,
    private router: Router) { }
  codigo: string
  ngOnInit(): void {
    this.codigo = this.route.snapshot.params['codigo']
    console.log(this.codigo)
    this.listarEvaluacion();
  }
  evaluacion: any[] = [];
  valoresPosibles: number[] = Array.from({ length: 11 }, (_, i) => i); // [0, 1, 2, ..., 10]

  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe(
      (data) => {
     console.log(data)
        this.evaluacion = data.filter(i => i.equipo == this.codigo && i.estado == true)
      },
      (error) => {
        console.error('Error al listar evaluaciones:', error);
      }
    );
  }

}
