import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Profesor } from '../model/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/profesor/listar`);
  }
  listarProfesorActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/profesor/listar/estado/activo`);
  }
  listarProfesorDesactivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/profesor/listar/estado/desactivado`);
  }

  guardarProfesor(profesor: Profesor): Observable<any> {
    return this.http.post<any>(`${baserUrl}/profesor/guardar-profesor`, profesor);
  }
  guardarProfesorExcel(profesor: any): Observable<any> {
    return this.http.post<any>(`${baserUrl}/profesor/guardar-excel-profesores`, profesor); 
  }
  actualizarProfesor(profesor: Profesor): Observable<any> {
    return this.http.put<any>(`${baserUrl}/profesor/actualizar-profesor`, profesor);
  }
  desactivarProfesor(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/profesor/desactivar/${codigo}`);
  }
  activarProfesor(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/profesor/activar/${codigo}`);
  }
  listaUsuarioPorCodigo(codigo: string): Observable<any> {
    return this.http.get<any>(`${baserUrl}/profesor/usuario/${codigo}`);
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
    console.log(formValues.edad)
    if (formValues.perfil && formValues.perfil instanceof File) {
      formData.append('perfil', formValues.perfil, formValues.perfil.name);
    } else {
      console.error('El archivo de perfil no es válido');
    }

    return this.http.put(`${baserUrl}/profesor/actualizar/${codigo}`, formData, { responseType: 'text' })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('HTTP error', error);
          return throwError(error);
        })
      );
  }
}
