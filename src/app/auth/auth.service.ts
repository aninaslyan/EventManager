import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

import { environment } from '../../environments/environment';

export interface IAuthResponseData {
  token: string;
  user: IUserData;
}

export interface IUserData {
  id: number;
  name: string;
  srName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error.message;

    switch (errorMessage) {
      case 'Invalid password':
        errorMessage = 'The password is incorrect';
        break;
      case 'User not found':
        errorMessage = 'There is no user with this email';
        break;
      default:
        errorMessage = 'An unknown error occurred';
    }

    return throwError(errorMessage);
  }

  private static handleAuthentication(token: string) {
    Cookies.set('token', token);
  }

  logIn(email: string, password: string) {
    return this.http.post<IAuthResponseData>(`${environment.apiUrl}/login`, {
      email,
      password
    })
      .pipe(
          catchError(AuthService.handleError),
          tap(resData => {
            AuthService.handleAuthentication(resData.token);
          })
      );
  }

  autoLogIn() {
    if (Cookies.get('token')) {
      this.router.navigate(['/events-grid']);
    }
  }

  logOut() {
    Cookies.remove('token');
    this.router.navigate(['/login']);
  }
}
