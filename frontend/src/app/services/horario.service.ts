import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Horario } from '../model/horario';
@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  constructor(private http: HttpClient) { }

  listarHorarioActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/horario/listar/estado/activo`);
  }
  listarHorarioDesactivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/horario/listar/estado/desactivo`);
  }
  actualizar(horario: Horario): Observable<any> {
    return this.http.put<any>(`${baserUrl}/horario/actualizar`, horario);
  }
  registrar(horario: Horario): Observable<any> {
    return this.http.post<any>(`${baserUrl}/horario/guardar`, horario);
  }
  listarFeriados(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/feriados`);
  }
}
