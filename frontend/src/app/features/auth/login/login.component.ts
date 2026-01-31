import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuth } from 'src/app/core/model/login';
import { MENSAJES } from 'src/app/core/constants/messages';
import { ROLES } from 'src/app/core/constants/roles';
import { LoginService } from 'src/app/core/services/login.service';

import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(
    private loginService: LoginService,
    private swal: SwalService,
    private fb: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.initForm()
  }


  formulario!: FormGroup;
  hidePassword = true;
  verContraActual = false;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  initForm() {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  operar() {

    if (this.formulario.invalid) {
      this.swal.advertencia(MENSAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    const login: LoginAuth = {
      username: this.formulario.get('username')?.value,
      password: this.formulario.get('password')?.value,
    };

    this.loginService.generateToken(login).subscribe({
      next: (data: any) => {

        localStorage.setItem('authToken', data.token);
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe({
          next: (user) => {
            this.loginService.setUser(user);

            const userRole = this.loginService.getUserRole();

            switch (userRole) {
              case ROLES.ROLE_ADMINISTRADOR:
                this.router.navigate(['administrador']);
                this.loginService.loginStatusSubjec.next(true);
                break;

              case ROLES.ROLE_ESTUDIANTE:
                this.router.navigate(['estudiante']);
                this.loginService.loginStatusSubjec.next(true);
                break;

              case ROLES.ROLE_PROFESOR:
                this.router.navigate(['profesor']);
                this.loginService.loginStatusSubjec.next(true);
                break;

              default:
                this.loginService.logout();
                break;
            }
          },

          error: (error) => {
            this.swal.error(MENSAJES.ERROR_TITULO, error.error.message);
            this.router.navigate(['login']);
          }
        });
      },

      error: (error) => {
        this.swal.error(MENSAJES.ERROR_TITULO, error.error.message);
      }
    });

  }

}
