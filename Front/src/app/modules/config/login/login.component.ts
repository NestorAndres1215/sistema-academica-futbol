import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": '',
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private mensaje: MensajeService) { }

  ngOnInit(): void {

  }

  registrar() {



  }
  hidePassword = true;
  verContraActual = false;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  formSubmit() {
    // Validar si el nombre de usuario está vacío o nulo
    if (this.loginData.username.trim() === '' || this.loginData.username.trim() === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'El nombre de usuario es requerido.',
      });
      return;
    }

    if (this.loginData.username.trim().length < 3) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre de usuario inválido',
        text: 'El nombre de usuario debe tener al menos 3 caracteres.',
      });
      return;
    }

    // Validar si la contraseña está vacía o nula
    if (this.loginData.password.trim() === '' || this.loginData.password.trim() === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'La contraseña es requerida.',
      });
      return;
    }

    // Validar si la longitud de la contraseña es adecuada
    if (this.loginData.password.trim().length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }


    // Llamar al servicio para generar el token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data.token);

        // Guardar el token en el localStorage
        localStorage.setItem('authToken', data.token);
        this.loginService.loginUser(data.token);

        // Obtener el usuario actual
        this.loginService.getCurrentUser().subscribe(
          (user) => {
            this.loginService.setUser(user);

            // Redirigir según el rol del usuario
            const userRole = this.loginService.getUserRole();
            switch (userRole) {
              case 'ADMINISTRADOR':
                this.router.navigate(['administrador']);
                this.loginService.loginStatusSubjec.next(true);
                Swal.fire({
                  icon: 'success',
                  title: '¡Bienvenido!',
                  text: 'Bienvenido, Administrador.',
                  timer: 2000,
                  timerProgressBar: true,
                });
                break;

              case 'ESTUDIANTE':
                this.router.navigate(['estudiante']);
                this.loginService.loginStatusSubjec.next(true);
                Swal.fire({
                  icon: 'success',
                  title: '¡Bienvenido!',
                  text: 'Bienvenido, Estudiante.',
                  timer: 2000,
                  timerProgressBar: true,
                });
                break;

              case 'PROFESOR':
                this.router.navigate(['profesor']);
                this.loginService.loginStatusSubjec.next(true);
                Swal.fire({
                  icon: 'success',
                  title: '¡Bienvenido!',
                  text: 'Bienvenido, Profesor.',
                  timer: 2000,
                  timerProgressBar: true,
                });
                break;

              default:
                // Cerrar sesión si el rol no es válido
                this.loginService.logout();
                Swal.fire({
                  icon: 'error',
                  title: 'Acceso denegado',
                  text: 'Rol no reconocido. Cierre de sesión.',
                  confirmButtonText: 'Aceptar'
                });
                
            }
          },
          (error) => {
            // Manejar error en la obtención del usuario
            this.mensaje.MostrarMensaje(error);
            console.error('Error en la obtención de usuario:', error);
            this.router.navigate(['login']);
          }
        );
      },
      (error) => {
        // Manejar error en la generación del token
        this.mensaje.MostrarBodyError(error);
        console.error('Error en la autenticación:', error);
      }
    );
  }

}
