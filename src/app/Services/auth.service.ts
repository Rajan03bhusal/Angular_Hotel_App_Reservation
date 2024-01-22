import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: String = 'https://localhost:7260/api/User/';

  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  Register(userobj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userobj);
  }

  Login(loginobj: any) {
    return this.http.post<any>(`${this.baseUrl}Authenticate`, loginobj);
  }

  StoreToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodedToken() {
    const JwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(JwtHelper.decodeToken(token));
    return JwtHelper.decodeToken(token);
  }

  getUserNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }
}
