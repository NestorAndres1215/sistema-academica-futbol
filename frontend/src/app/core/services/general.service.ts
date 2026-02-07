import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { General } from '../model/General';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listarGeneralActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/general/tablaGenerales/listar/activo`);
  }
  listarGeneralDesactivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/general/tablaGenerales/listar/desactivado`);
  }
  registrarGeneral(general: General): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/general/tablaGenerales/guardar`, general);
  }
  actualizarGeneral(general: General): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/general/tablaGenerales/actualizar`, general);
  }
  listarGeneralDevActivado(codigo:string): Observable<any> {
    return this.http.get(`${this.baserUrl}/general/gendev/listar/activo/${codigo}`);
  }
  listarGeneralDevDesactivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/general/gendev/listar/desactivado`);
  }
 registrarGeneralDev(general: General): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/general/genDev/guardar`, general);
  }
  actualizarGeneralDev(general: General): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/general/genDev/actualizar`, general);
  }

  desactivarGeneral(codigo: string): Observable<any> {

    return this.http.delete(`${this.baserUrl}/general/desactivarGeneral/${codigo}`);
  }
  activarGeneral(codigo: string): Observable<any> {

    return this.http.delete(`${this.baserUrl}/general/activarGeneral/${codigo}`);
  }
  desactivarGeneralGen(codigo: string): Observable<any> {

    return this.http.delete(`${this.baserUrl}/general/desactivarGeneralDev/${codigo}`);
  }
  activarGeneralGen(codigo: string): Observable<any> {

    return this.http.delete(`${this.baserUrl}/general/activarGeneralDev/${codigo}`);
  }
}
