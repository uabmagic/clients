import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: any = {
      'Content-Type': 'application/json'
    };

    return from(this.authService.getAuthorizationValue()).pipe(
      mergeMap((token: string) => {
        if (token) {
          headers['Authorization'] = token;
        }

        request = request.clone({
          setHeaders: headers
        });

        return next.handle(request);
      })
    );
  }
}
