import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  private baserUrl = environment.baseUrl;

  generateToken(loginData: any) {
    return this.http.post(`${this.baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${this.baserUrl}/actual-usuario`);
  }

  loginUser(token: any) {

    localStorage.setItem('token', token);
    return true;
  }

  isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getToken() {

    // localStorage.removeItem('token');
    return localStorage.getItem('token');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole() {
    let user = this.getUser();
    return user?.authorities?.[0]?.authority;
  }
}
