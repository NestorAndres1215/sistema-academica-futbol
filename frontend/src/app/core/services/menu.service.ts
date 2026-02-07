import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

    constructor(private http: HttpClient) { }
    private baserUrl = environment.baseUrl;


  listarmenuPrimero() {
    return this.http.get(`${this.baserUrl}/menu/menuPrimero`);
  }
  
  listarmenuSegundo(menu: any) {
    return this.http.get(`${this.baserUrl}/menu/menuSegundo`);
  }

  listarPorRol(rolCodigo1: string, rolCodigo2: string) {
    return this.http.get(`${this.baserUrl}/menu/${rolCodigo1}/${rolCodigo2}`);
  }


}
