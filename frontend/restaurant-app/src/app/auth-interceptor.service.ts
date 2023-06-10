import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {Observable, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              return next.handle(req);
            }),
            catchError((refreshError: HttpErrorResponse) => {
              this.authService.logout();
              this.router.navigateByUrl('/login').catch(() => {});
              return throwError(refreshError);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
