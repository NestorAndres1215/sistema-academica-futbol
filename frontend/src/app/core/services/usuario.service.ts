import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../interceptor/helper';

import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  añadirUsuario(user: Usuario) {
    return this.http.post(`${baserUrl}/usuarios/`, user);
  }

  obtenerUsuarioNombre(usuario: String): Observable<any> {
    return this.http.get(`${baserUrl}/usuarios/listar/username/${usuario}`);
  }
  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${baserUrl}/usuarios/actualizar`, usuario);
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/usuarios`);
  }
}
