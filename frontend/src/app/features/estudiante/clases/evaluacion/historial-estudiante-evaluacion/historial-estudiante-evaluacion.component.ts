import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { EvaluacionService } from 'src/app/core/services/evaluacion.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';

@Component({
  selector: 'app-historial-estudiante-evaluacion',
  templateUrl: './historial-estudiante-evaluacion.component.html',
  styleUrls: ['./historial-estudiante-evaluacion.component.css']
})
export class HistorialEstudianteEvaluacionComponent implements OnInit {

  evaluacion: any[] = [];
  estudiante: any[] = [];
  equipoSeleccionada: string = '';
  filtrarUsuarios() {
    console.log("Equipo seleccionado:", this.equipoSeleccionada); // Verifica el valor del equipo seleccionado

    if (!this.equipoSeleccionada) {
      // Si no se selecciona un equipo, se muestran todos los usuarios
    
      this.estudiantesFiltrados = [];
      return;
    }

    // Filtrar los estudiantes
    this.estudiantesFiltrados = this.evaluacion.filter(estudiante => {
      console.log("Estudiante:", estudiante); // Muestra cada estudiante
      const coincideConEquipo = estudiante.evaluacion.estudiante.codigo  === this.equipoSeleccionada;
      console.log("Coincide con equipo:", coincideConEquipo); // Muestra si hay coincidencia
      return coincideConEquipo;
    });
  }
  estudiantesFiltrados = [...this.estudiante];

  //equipoSeleccionada: string = '';
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
  activeTab1: number = 0;

  listarEvaluacion() {
    this.evaluacionService.listarDetalleEvaluaciones().subscribe(
      (data) => {
        console.log(data)
      
        this.evaluacion = data.filter(i => i.evaluacion.estudiante.usuario.codigo ==  this.loginService.getUser().ul_codigo && i.estado == false)
        console.log()
        this.estudiante=this.evaluacion.map(i=>i.evaluacion.estudiante)
      },
      (error) => {
        console.error('Error al listar evaluaciones:', error);
      }
    );
  }
  get totalNotaFinal(): number {
    return this.estudiantesFiltrados?.reduce((sum, estudiante) => sum + (estudiante.notaFinal ?? 0), 0) || 0;
}


}
