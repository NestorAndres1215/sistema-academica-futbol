import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from '../interceptor/helper';
import { Partido } from '../model/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/partido/listar`);
  }
  listarPartidosActuales(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/partido/listar/activo`);
  }
  listarPartidoPasados(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/partido/listar/desactivado`);
  }
  actualizar(partido: Partido): Observable<any> {
    return this.http.put<any>(`${baserUrl}/partido/actualizar`, partido);
  }
  registrar(partido: Partido): Observable<any> {
    return this.http.post<any>(`${baserUrl}/partido/guardar`, partido);
  }
  actualizarFalse(partido: Partido): Observable<any> {
    return this.http.put<any>(`${baserUrl}/partido/actualizar/desactivado`, partido);
  }
}
