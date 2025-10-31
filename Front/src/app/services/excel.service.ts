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
    const url = `${baserUrl}/exportacion/excel/usuario`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelSede(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/sede`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelCargo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/cargo`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelProfesor(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/profesor`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelEstudiante(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/estudiante`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelEquipo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/equipo`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelClase(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/clase`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelPartidoActivo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/partido/activado`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarExcelPartidoDesactivo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/excel/partido/desactivado`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
}
