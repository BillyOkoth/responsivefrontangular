import { Injectable } from '@angular/core';
import { Login, LoginResponse } from './login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return sessionStorage.getItem('h-token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }

  loginnUser(payload: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.baseurl}bankLogin`,
      payload
    );
  }





}
