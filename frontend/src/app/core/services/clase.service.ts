import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Clase } from '../model/Clase';
import { ClaseDev } from '../model/clasedev';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http: HttpClient) { }

  listarClaseActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/clase/listar/activo`);
  }
  
  listarClaseDesactivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/clase/listar/desactivado`);
  }

  registrar(clase: Clase): Observable<any> {
    return this.http.post<any>(`${baserUrl}/clase/registrar`, clase);  
  }

  actualizar(clase: Clase): Observable<any> {
    return this.http.put<any>(`${baserUrl}/clase/actualizar`, clase);  
  }

  listarClaseDevActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/clase/listar/dev/activo`);
  }

  registrarDev(clase: ClaseDev): Observable<any> {
    return this.http.post<any>(`${baserUrl}/clase/dev/registrar`, clase); 
  }

  actualizarDev(clase: ClaseDev): Observable<any> {
    return this.http.put<any>(`${baserUrl}/clase/dev/actualizar`, clase); 
  }

}
