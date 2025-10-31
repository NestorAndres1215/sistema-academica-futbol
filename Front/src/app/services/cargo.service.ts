import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Cargo } from '../model/Cargo';


@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  listarCargoActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/cargo/listar/cargo/activo`);
  }
  listarCargoDesactivado(): Observable<any> {
    return this.http.get(`${baserUrl}/cargo/listar/cargo/desactivado`);
  }
  actualizarCargo(cargo: Cargo): Observable<any> {
    return this.http.put<any>(`${baserUrl}/cargo/actualizar-cargo`, cargo);
  }
  registrarCargo(cargo: Cargo): Observable<any> {
    return this.http.post<any>(`${baserUrl}/cargo/guardar-cargo`, cargo);
  }

  desactivarCargo(codigo: string): Observable<any> {
    return this.http.delete(`${baserUrl}/cargo/desactivar/${codigo}`);
  }
  activarCargo(codigo: string): Observable<any> {
    return this.http.delete(`${baserUrl}/cargo/activar/${codigo}`);
  }
}
