import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  register(username: string, password: string) {
    return this.http.post(`/register`, { username, password });
  }

  login(username: string, password: string) {
    let role = 'user';
    if(username === 'admin'){
      role = 'admin'
    }
    return this.http.post<{ token: string }>(`/login`, { username, password , "role": role});
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    console.log('logged out')
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
      if(localStorage){
        const token = localStorage.getItem(this.tokenKey);
        return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
  get userRole(): string {
    if(this.isLocalStorageAvailable()){
    const data= this.jwtHelper.decodeToken(localStorage.getItem(this.tokenKey) || '');
    return data && data.role ? data.role :'';
    }
    return '';
  }
  get userName(): string {
    const data= this.jwtHelper.decodeToken(localStorage.getItem(this.tokenKey) || '');
    return data && data.username ? data.username: '';
  }
  get userId(): string {
    const data= this.jwtHelper.decodeToken(localStorage.getItem(this.tokenKey) || '');
    return data && data.userId ?data.userId :"";
  }
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
