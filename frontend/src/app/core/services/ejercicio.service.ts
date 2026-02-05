import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Ejercicio } from '../model/Ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/ejercicio/listar`);
  }

  actualizar(ejercicio: Ejercicio): Observable<any> {
    return this.http.put<any>(`${baserUrl}/ejercicio/actualizar`, ejercicio);
  }
  
  registrar(ejercicio: Ejercicio): Observable<any> {
    return this.http.post<any>(`${baserUrl}/ejercicio/registrar`, ejercicio);
  }
}
