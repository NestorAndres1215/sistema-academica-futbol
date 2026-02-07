import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesion } from '../model/lesion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LesionService {

  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  listarLesionActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/lesiones/listar/activo`);
  }

  listarLesionDesActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/lesiones/listar/desactivado`);
  }

  listarLesionDevActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/lesiones/listar/dev/activo`);
  }

  listarLesionDevDesActivado(): Observable<any> {
    return this.http.get(`${this.baserUrl}/lesiones/listar/dev/desactivado`);
  }

  registrar(lesion: Lesion): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/lesiones/registrar`, lesion);
  }

  registrarDev(lesion: any): Observable<any> {
    return this.http.post<any>(`${this.baserUrl}/lesiones/dev/registrar`, lesion);
  }
}
