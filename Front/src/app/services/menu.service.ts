import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../interceptor/helper';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }


  listarmenuPrimero() {
    return this.http.get(`${baserUrl}/menu/menuPrimero`);
  }
  listarmenuSegundo(menu: any) {
    return this.http.get(`${baserUrl}/menu/menuSegundo`);
  }
  listarPorRol(rolCodigo1: string, rolCodigo2: string) {
    return this.http.get(`${baserUrl}/menu/${rolCodigo1}/${rolCodigo2}`);
  }


}
