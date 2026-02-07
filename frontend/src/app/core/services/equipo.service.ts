import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Equipo } from '../model/equipo';
import { Asignacion } from '../model/Asignacion';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  listarActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/equipo/listar/activo`);
  }
  listarDesactivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/equipo/listar/desactivado`);
  }
  actualizar(equipo: Equipo): Observable<any> {
    return this.http.put<any>(`${baserUrl}/equipo/actualizar`, equipo);
  }
  registrar(equipo: Equipo): Observable<any> {
    return this.http.post<any>(`${baserUrl}/equipo/registrar`, equipo);
  }
  desactivar(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/equipo/desactivar/${codigo}`);
  }
  activar(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/equipo/activar/${codigo}`);
  }

  registrarAsignacion(asignacion: any): Observable<any> {
    return this.http.post<any>(`${baserUrl}/equipo/asignacion/registrar`, asignacion);
  }
  listarAsignacion(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/equipo/listar`);
  }
  listarDev(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/equipo/listar/equipodev/activo`);
  }

  actualizarAsignacion(asignacion: any): Observable<any> {
    return this.http.put<any>(`${baserUrl}/equipo/asignacion/actualizar`, asignacion);
  }
}
