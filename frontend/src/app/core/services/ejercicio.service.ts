import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from '../model/Ejercicio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listar(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/ejercicio/listar`);
  }

  actualizar(ejercicio: Ejercicio): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/ejercicio/actualizar`, ejercicio);
  }
  
  registrar(ejercicio: Ejercicio): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/ejercicio/registrar`, ejercicio);
  }
}
