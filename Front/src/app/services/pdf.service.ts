import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../interceptor/helper';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }



  descargarPDFUsuario(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/usuario`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFSede(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/sede`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFCargo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/cargo`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFProfesor(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/profesor`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFEstudiante(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/estudiante`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFEquipo(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/equipo`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFClase(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/clase`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  
  descargarPDFPartidoActivado(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/partido/activo`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFPartidoDesactivado(): Observable<Blob> {
    const url = `${baserUrl}/exportacion/pdf/partido/desactivo`; // Reemplaza con la ruta correcta a tu endpoint de PDF
    return this.http.get(url, { responseType: 'blob' });
  }

}
