import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from '../model/historial';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  
   constructor(private http: HttpClient) { }
   private baserUrl = environment.baseUrl;

  registrar(historial: Historial): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/historial/guardar-historial`, historial);
  }
  listar(codigo: string): Observable<any> {
    return this.http.get(`${this.baserUrl}/historial/usuario/${codigo}`);
  }
}
