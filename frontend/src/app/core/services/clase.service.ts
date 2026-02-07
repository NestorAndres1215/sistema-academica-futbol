import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clase } from '../model/Clase';
import { ClaseDev } from '../model/clasedev';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listarClaseActivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/clase/listar/activo`);
  }

  listarClaseDesactivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/clase/listar/desactivado`);
  }

  registrar(clase: Clase): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/clase/registrar`, clase);
  }

  actualizar(clase: Clase): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/clase/actualizar`, clase);
  }

  listarClaseDevActivado(): Observable<any> {
    return this.http.get<any>(`${this.baserUrl}/clase/listar/dev/activo`);
  }

  registrarDev(clase: ClaseDev): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/clase/dev/registrar`, clase);
  }

  actualizarDev(clase: ClaseDev): Observable<any> {
    return this.http.put<any>(`${this.baserUrl}/clase/dev/actualizar`, clase);
  }

}
