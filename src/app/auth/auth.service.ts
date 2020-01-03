import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

import { environment } from '../../environments/environment';
import { User } from './user.model';

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
  user = new BehaviorSubject<User>(null);

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

  private handleAuthentication(name: string, surname: string, token: string, isAdmin: boolean) {
    const user = new User(token, name, surname, isAdmin);
    this.user.next(user);
    Cookies.set('token', token);
    this.router.navigate(['/events-grid']);
  }

  getUserDataFromToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(- 2))
            .join('')
    );

    try {
      return JSON.parse(jsonPayload);
    } catch (e) {
      // this.logOut(); if no guard was used
      return null;
    }
  }

  isTokenValid(token: string) {
    const tokenRegExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/g;
    if (tokenRegExp.test(token)) {
      const user: User = this.makeUserFromToken(token);
      // todo user.name, user.srName is not proper to check (can be another type of data to get back)
      return !!user && !!user.name && !!user.srName;
    }
    return false;
  }

  makeUserFromToken(token: string) {
    let loadedUser: IUserData;
    loadedUser = this.getUserDataFromToken(token);

    if (loadedUser) {
      return new User(token, loadedUser.name, loadedUser.srName, loadedUser.isAdmin);
    } else {
      return null;
    }
  }

  logIn(email: string, password: string) {
    return this.http.post<IAuthResponseData>(`${environment.apiUrl}/login`, {
      email,
      password
    })
      .pipe(
          catchError(AuthService.handleError),
          tap(resData => {
            this.handleAuthentication(resData.user.name, resData.user.srName, resData.token, resData.user.isAdmin);
          })
      );
  }

  autoLogIn() {
    let user: User;
    const token = Cookies.get('token');

    if (this.isAuthenticated()) {
      user = this.makeUserFromToken(token);
      this.user.next(user);
    }
  }

  isAuthenticated() {
    // todo read token from this.user after all, duplication with autoLogin functionality
    const token = Cookies.get('token');
    return !!token && this.isTokenValid(token);
  }

  isAdmin() {
    let isAdmin = false;

    this.user.subscribe(user => {
      if (user) {
        isAdmin = user.isAdmin;
      }
    });
    return isAdmin;
  }

  logOut() {
    this.user.next(null);
    Cookies.remove('token');
    this.router.navigate(['/login']);
  }
}
