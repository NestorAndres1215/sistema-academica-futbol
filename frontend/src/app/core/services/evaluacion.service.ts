import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from '../interceptor/helper';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {


  constructor(private http: HttpClient) { }


  actualizarEvaluaciones(evaluaciones: any[]): Observable<any> {
    return this.http.put<any>(`${baserUrl}/evaluacion/actualizar/detalle`, evaluaciones);
  }
  actualizar(evaluaciones: any[]): Observable<any> {
    return this.http.put<any>(`${baserUrl}/evaluacion/actualizar/eva`, evaluaciones);
  }


  desactivarEvaluaciones(clase: string, conteo: string): Observable<any> {
    return this.http.put<{ mensaje: string; cantidadDesactivadas: number; cantidadNuevas: number }>(
      `${baserUrl}/evaluacion/desactivar/${clase}/${conteo}`,
      {},
      { responseType: 'json' }
    );
  }
  
  listarEvaluaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/evaluacion/listar`);
  }

  listarDetalleEvaluaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/evaluacion/listar/Detalle`);
  }
  listarPorEquipo(equipo: string): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/equipo/${equipo}`);
  }
}
