import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

    constructor(private http: HttpClient) { }
    private baserUrl = environment.baseUrl;

  descargarPDFUsuario(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/usuario`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFSede(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/sede`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFCargo(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/cargo`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFProfesor(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/profesor`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFEstudiante(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/estudiante`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFEquipo(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/equipo`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFClase(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/clase`;
    return this.http.get(url, { responseType: 'blob' });
  }

  descargarPDFPartidoActivado(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/partido/activo`;
    return this.http.get(url, { responseType: 'blob' });
  }
  descargarPDFPartidoDesactivado(): Observable<Blob> {
    const url = `${this.baserUrl}/exportacion/pdf/partido/desactivo`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
