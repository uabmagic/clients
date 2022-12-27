import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: any = {
      'Content-Type': 'application/json'
    };

    const authorizationValue = this.authService.authorizationValue;

    if (authorizationValue) {
      headers['Authorization'] = authorizationValue;
    }

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }
}
