import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ROLES } from '../constants/roles';

@Injectable({
  providedIn: 'root'
})
export class EstudianteGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn() && this.loginService.getUserRole() == ROLES.ROLE_ESTUDIANTE) {
      return true;
    }

    this.router.navigate(['ADMINISTRADOR']);

    return false;
  }

}
