import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService: LoginService, private router: Router) {}
/*
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authReq = req;
  const token = this.loginService.getToken();
  console.log(token)
  if(token != null){
    console.log("ingreso")
    authReq = authReq.clone({
      setHeaders : {Authorization: `Bearer ${token}` }
    })
  }
  return next.handle(authReq);
}*/
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let authReq = req;
  const token = this.loginService.getToken(); // Obtener el token desde el servicio

  if (token != null) {
    authReq = authReq.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next.handle(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Detectar si el token ha expirado (error 401)
      if (
        error.status === 401 &&
        error.error.message === 'El token ha expirado, por favor inicia sesión nuevamente.'
      ) {
        console.log('El token ha expirado. Mostrando alerta y redirigiendo al login...');
    
        this.loginService.logout();

        // Mostrar el mensaje de alerta
        Swal.fire({
          title: 'Sesión expirada',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
        }).then(() => {
          // Redirigir al login cuando el usuario cierre la alerta
          this.router.navigate(['/login']);
        });
      }

      return throwError(error); // Propagar el error si no es un 401
    })
  );
}
}

export const authInterceptorProviders = [
{
  provide : HTTP_INTERCEPTORS,
  useClass : AuthInterceptor,
  multi : true
}
]