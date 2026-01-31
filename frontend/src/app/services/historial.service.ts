import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Historial } from '../model/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {


  constructor(private http: HttpClient) { }

  registrar(historial: Historial): Observable<any> {
    return this.http.post<any>(`${baserUrl}/historial/guardar-historial`, historial);
  }
  listar(codigo: string): Observable<any> {
    return this.http.get(`${baserUrl}/historial/usuario/${codigo}`);
  }
}
