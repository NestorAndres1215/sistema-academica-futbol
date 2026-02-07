import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Horario } from '../model/horario';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listarHorarioActivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/horario/listar/estado/activo`);
  }
  listarHorarioDesactivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/horario/listar/estado/desactivo`);
  }
  actualizar(horario: Horario): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/horario/actualizar`, horario);
  }
  registrar(horario: Horario): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/horario/guardar`, horario);
  }
  listarFeriados(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/feriados`);
  }
}
