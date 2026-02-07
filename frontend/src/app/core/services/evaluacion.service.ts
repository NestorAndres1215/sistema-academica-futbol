import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {


  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;


  actualizarEvaluaciones(evaluaciones: any[]): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/evaluacion/actualizar/detalle`, evaluaciones);
  }
  actualizar(evaluaciones: any[]): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/evaluacion/actualizar/eva`, evaluaciones);
  }


  desactivarEvaluaciones(clase: string, conteo: string): Observable<any> {
    return this.http.put<{ mensaje: string; cantidadDesactivadas: number; cantidadNuevas: number }>(
      `${this.baserUrl}/evaluacion/desactivar/${clase}/${conteo}`,
      {},
      { responseType: 'json' }
    );
  }
  
  listarEvaluaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baserUrl}/evaluacion/listar`);
  }

  listarDetalleEvaluaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baserUrl}/evaluacion/listar/Detalle`);
  }
  listarPorEquipo(equipo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baserUrl}/equipo/${equipo}`);
  }
}
