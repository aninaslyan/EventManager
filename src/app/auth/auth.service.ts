import { Injectable } from '@angular/core';

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
  constructor() { }

  logIn(email: string, password: string) {
  }
}
