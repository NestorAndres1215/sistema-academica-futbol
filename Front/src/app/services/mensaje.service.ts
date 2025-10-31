import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private mensajeCambio = new Subject<string>();

  constructor(private snackBar: MatSnackBar,
  ) { }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }
  MostrarMensajeExito(message: string, duration: number = 2000) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      timer: duration,
      timerProgressBar: true,
      showConfirmButton: false, // Ocultar botón "OK"
    });
  }
  MostrarMensajeError(message: string, duration: number = 2000) {
    Swal.fire({
      icon: 'error',
      title: '❌ Error',
      text: message,
      timer: duration,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true, // Muestra el mensaje como una notificación flotante
      position: 'top-end', // Lo coloca en la esquina superior derecha
      customClass: {
        popup: 'swal2-popup-error' // Puedes personalizar estilos en CSS
      }
    });
  }
  
  
  
  MostrarMensaje(message: string, duration: number = 2000) {
    Swal.fire({
      icon: 'info',
      title: 'Aviso',
      text: message,
      timer: duration,
      timerProgressBar: true,
    });
  }
  MostrarError(message: Object, duration: number = 2000) {
    console.log(message);
    let errorMessage = typeof message === 'string' ? message : JSON.stringify(message);
  
    // Extraer mensaje de error si está dentro de un objeto con clave "error"
    errorMessage = errorMessage.replace(/.*?{\s*"error"\s*:\s*"([^"]*)"\s*}.*/, '$1');
  
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      timer: duration,
      timerProgressBar: true,
    });
  }
  MostrarBodyError(message: any, duration: number = 2000) {
    console.log(message);
    console.log(typeof message);
    let errorMessage: string;
  
    if (typeof message === 'string') {
      errorMessage = message;
    } else if (typeof message === 'object' && message !== null) {
      if (message.error && typeof message.error === 'object' && message.error.mensaje) {
        errorMessage = message.error.mensaje;
      } else if (message.error) {
        console.log(message.error);
        errorMessage = JSON.stringify(message.error);
      } else if (message.message) {
        errorMessage = message.message;
      } else {
        errorMessage = JSON.stringify(message);
      }
    } else {
      errorMessage = 'Ocurrió un error desconocido';
    }
  
    console.log(errorMessage);
    errorMessage = JSON.stringify(message.error).replace(/\"/g, '');
  
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      timer: duration,
      timerProgressBar: true,
    });
  }
}
