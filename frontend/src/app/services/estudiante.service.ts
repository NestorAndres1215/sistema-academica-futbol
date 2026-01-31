import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import baserUrl from '../interceptor/helper';
import { Estudiante } from '../model/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor(private http: HttpClient) { }


  listarEstudianteActivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/estudiante/listar/estado/activo`);
  }
  listarEstudianteDesactivado(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/estudiante/listar/estado/desactivado`);
  }

  guardarEstudiante(profesor: Estudiante): Observable<any> {
    return this.http.post<any>(`${baserUrl}/estudiante/guardar-estudiante`, profesor);  // La URL debe ser cerrada adecuadamente
  }
  actualizarEstudiante(profesor: Estudiante): Observable<any> {
    return this.http.put<any>(`${baserUrl}/estudiante/actualizar-estudiante`, profesor);
  }
  desactivarEstudiante(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/estudiante/desactivar/${codigo}`);
  }
  activarEstudiante(codigo: string): Observable<any> {

    return this.http.delete(`${baserUrl}/estudiante/activar/${codigo}`);
  }
  listar(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/estudiante/listar`);
  }
  guardarProfesorExcel(estudiante: any): Observable<any> {
    return this.http.post<any>(`${baserUrl}/estudiante/guardar-excel-estudiante`, estudiante);  // Nombre del parámetro es 'profesor'
  }

  listaUsuarioPorCodigo(codigo: string): Observable<any> {
    return this.http.get<any>(`${baserUrl}/estudiante/usuario/${codigo}`);
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

    return this.http.put(`${baserUrl}/estudiante/actualizar/${codigo}`, formData, { responseType: 'text' })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('HTTP error', error);
          return throwError(error);
        })
      );
  }


}
