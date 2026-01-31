import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { General } from '../model/General';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  constructor(private http: HttpClient) { }

  listarGeneralActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/general/tablaGenerales/listar/activo`);
  }
  listarGeneralDesactivado(): Observable<any> {
    return this.http.get(`${baserUrl}/general/tablaGenerales/listar/desactivado`);
  }
  registrarGeneral(general: General): Observable<any> {
    return this.http.post<any>(`${baserUrl}/general/tablaGenerales/guardar`, general);
  }
  actualizarGeneral(general: General): Observable<any> {
    return this.http.put<any>(`${baserUrl}/general/tablaGenerales/actualizar`, general);
  }
  listarGeneralDevActivado(codigo:string): Observable<any> {
    return this.http.get(`${baserUrl}/general/gendev/listar/activo/${codigo}`);
  }
  listarGeneralDevDesactivado(): Observable<any> {
    return this.http.get(`${baserUrl}/general/gendev/listar/desactivado`);
  }
 registrarGeneralDev(general: General): Observable<any> {
    return this.http.post<any>(`${baserUrl}/general/genDev/guardar`, general);
  }
  actualizarGeneralDev(general: General): Observable<any> {
    return this.http.put<any>(`${baserUrl}/general/genDev/actualizar`, general);
  }

  desactivarGeneral(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/general/desactivarGeneral/${codigo}`);
  }
  activarGeneral(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/general/activarGeneral/${codigo}`);
  }
  desactivarGeneralGen(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/general/desactivarGeneralDev/${codigo}`);
  }
  activarGeneralGen(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/general/activarGeneralDev/${codigo}`);
  }
}
