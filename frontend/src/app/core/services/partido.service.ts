import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partido } from '../model/partido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
   constructor(private http: HttpClient) { }
   private baserUrl = environment.baseUrl;

  listar(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/partido/listar`);
  }
  listarPartidosActuales(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/partido/listar/activo`);
  }
  listarPartidoPasados(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/partido/listar/desactivado`);
  }
  actualizar(partido: Partido): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/partido/actualizar`, partido);
  }
  registrar(partido: Partido): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/partido/guardar`, partido);
  }
  actualizarFalse(partido: Partido): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/partido/actualizar/desactivado`, partido);
  }
}
