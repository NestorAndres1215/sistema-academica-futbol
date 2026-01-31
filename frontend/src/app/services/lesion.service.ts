import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { Observable } from 'rxjs';
import { Lesion } from '../model/lesion';

@Injectable({
  providedIn: 'root'
})
export class LesionService {

  constructor(private http: HttpClient) { }

  listarLesionActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/lesiones/listar/activo`);
  }
  
  listarLesionDesActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/lesiones/listar/desactivado`);
  }

  listarLesionDevActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/lesiones/listar/dev/activo`);
  }

  listarLesionDevDesActivado(): Observable<any> {
    return this.http.get(`${baserUrl}/lesiones/listar/dev/desactivado`);
  }

  registrar(lesion: Lesion): Observable<any> {
    return this.http.post<any>(`${baserUrl}/lesiones/registrar`, lesion);
  }

  registrarDev(lesion: any): Observable<any> {
    return this.http.post<any>(`${baserUrl}/lesiones/dev/registrar`, lesion);
  }
}
