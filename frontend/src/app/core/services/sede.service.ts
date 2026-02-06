import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Sede } from '../model/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http: HttpClient) { }

  listarSedeActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/sede/listar/estado/activo`);
  }
  listarSedeDesactivado(): Observable<any> {
    return this.http.get(`${baserUrl}/sede/listar/estado/desactivado`);
  }
  actualizarSede(sede: Sede): Observable<any> {
    return this.http.put<any>(`${baserUrl}/sede/actualizar`, sede);
  }
  registrarSede(sede: Sede): Observable<any> {
    return this.http.post<any>(`${baserUrl}/sede/guardar-sede`, sede);
  }

  desactivarSede(codigo: string): Observable<any> {
    return this.http.delete(`${baserUrl}/sede/desactivar/${codigo}`);
  }
  activarSede(codigo: string): Observable<any> {
    return this.http.delete(`${baserUrl}/sede/activar/${codigo}`);
  }

}
