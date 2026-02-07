import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../model/sede';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

    constructor(private http: HttpClient) { }
    private baserUrl = environment.baseUrl;

  listarSedeActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/sede/listar/estado/activo`);
  }
  listarSedeDesactivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/sede/listar/estado/desactivado`);
  }
  actualizarSede(sede: Sede): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/sede/actualizar`, sede);
  }
  registrarSede(sede: Sede): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/sede/guardar-sede`, sede);
  }

  desactivarSede(codigo: string): Observable<any> {
    return this.http.delete(`${this.baserUrl}/sede/desactivar/${codigo}`);
  }
  activarSede(codigo: string): Observable<any> {
    return this.http.delete(`${this.baserUrl}/sede/activar/${codigo}`);
  }

}
