import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }

  descargarExcelAdmin(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/usuario`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelSede(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/sede`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelCargo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/cargo`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelProfesor(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/profesor`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelEstudiante(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/estudiante`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelEquipo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/equipo`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelClase(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/clase`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelPartidoActivo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/partido/activado`; 
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelPartidoDesactivo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/partido/desactivado`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
