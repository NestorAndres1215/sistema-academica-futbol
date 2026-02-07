import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Equipo } from '../model/equipo';
import { Asignacion } from '../model/Asignacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listarActivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/equipo/listar/activo`);
  }

  listarDesactivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/equipo/listar/desactivado`);
  }

  actualizar(equipo: Equipo): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/equipo/actualizar`, equipo);
  }

  registrar(equipo: Equipo): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/equipo/registrar`, equipo);
  }

  desactivar(codigo: string): Observable<any> {
    return this.http.delete(`${this.baserUrl}/equipo/desactivar/${codigo}`);
  }

  activar(codigo: string): Observable<any> {
    return this.http.delete(`${this.baserUrl}/equipo/activar/${codigo}`);
  }

  registrarAsignacion(asignacion: any): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/equipo/asignacion/registrar`, asignacion);
  }

  listarAsignacion(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/equipo/listar`);
  }
  listarDev(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/equipo/listar/equipodev/activo`);
  }

  actualizarAsignacion(asignacion: any): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/equipo/asignacion/actualizar`, asignacion);
  }
}
