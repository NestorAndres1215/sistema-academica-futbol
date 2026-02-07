import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;
  
  añadirUsuario(user: Usuario) {
    return this.http.post(`${this.baserUrl}/usuarios/`, user);
  }

  obtenerUsuarioNombre(usuario: String): Observable<any> {
    return this.http.get(`${this.baserUrl}/usuarios/listar/username/${usuario}`);
  }
  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.baserUrl}/usuarios/actualizar`, usuario);
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baserUrl}/usuarios`);
  }
}
