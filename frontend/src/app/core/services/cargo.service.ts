import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../model/Cargo';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listarCargoActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/cargo/listar/cargo/activo`);
  }

  listarCargoDesactivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/cargo/listar/cargo/desactivado`);
  }

  actualizarCargo(cargo: Cargo): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/cargo/actualizar-cargo`, cargo);
  }

  registrarCargo(cargo: Cargo): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/cargo/guardar-cargo`, cargo);
  }

  desactivarCargo(codigo: string): Observable<any> {
    return this.http.delete(`${this.baserUrl}/cargo/desactivar/${codigo}`);
  }

  activarCargo(codigo: string): Observable<any> {
    return this.http.delete(`${this.baserUrl}/cargo/activar/${codigo}`);
  }
}
