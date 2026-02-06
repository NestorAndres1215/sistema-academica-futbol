import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Admin } from './../model/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  listaUsuarioPorCodigo(codigo: string): Observable<any> {
    return this.http.get<any>(`${baserUrl}/admin/usuario/${codigo}`);
  }

  listarAdmins(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/admin/listar`);
  }
  desactivarAdmin(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/admin/desactivar/${codigo}`);
  }
  activarAdmin(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/admin/activar/${codigo}`);
  }
  listarAdminActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/admin/listar/estado/activo`);
  }
  listarAdminDesactivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/admin/listar/estado/desactivado`);
  }
  guardarAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(`${baserUrl}/admin/guardar-admin`, admin);  // La URL debe ser cerrada adecuadamente
  }
  actualizarAdmin(admin: Admin): Observable<any> {
    return this.http.put<any>(`${baserUrl}/admin/actualizar-admin`, admin);
  }

  actualizarAdminImg(codigo: string, formValues: any): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('codigoAdmin', formValues.codigoAdmin);
    formData.append('codigoUsuario', formValues.codigoUsuario);
    formData.append('usuario', formValues.usuario);
    formData.append('contra', formValues.contra);
    formData.append('primerNombre', formValues.primerNombre);
    formData.append('segundoNombre', formValues.segundoNombre);
    formData.append('apellidoPaterno', formValues.apellidoPaterno);
    formData.append('apellidoMaterno', formValues.apellidoMaterno);
    formData.append('telefono', formValues.telefono);
    formData.append('email', formValues.email);
    formData.append('dni', formValues.dni);
    formData.append('direccion', formValues.direccion);
    formData.append('nacimiento', formValues.nacimiento);
    formData.append('nacionalidad', formValues.nacionalidad);
    formData.append('edad', formValues.edad);
 
    if (formValues.perfil && formValues.perfil instanceof File) {
      formData.append('perfil', formValues.perfil, formValues.perfil.name);
    } else {
      console.error('El archivo de perfil no es válido');
    }

    return this.http.put(`${baserUrl}/admin/actualizar/${codigo}`, formData, { responseType: 'text' })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('HTTP error', error);
          return throwError(error);
        })
      );
  }

}
