import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getUserToken()}`
        }
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
