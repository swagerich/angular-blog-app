import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  switchMap,
  throwError,
} from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { AuthService, TokenRefresh } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService = inject(AuthService);
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    let token = this.authService.getToken();

    if (token != null) {
      authReq = this.addToken(req, token!);
    }
    return next.handle(authReq).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          let refresh = this.authService.getRefreshToken();
          if (refresh != null) {
            return this.authService.refreshToken(refresh!).pipe(
              switchMap((resp: TokenRefresh) => {
                this.authService.setToken(resp.accessToken);
               let authReq = this.addToken(req, resp.accessToken);
               console.log('refresh TOKEN',authReq);
                return next.handle(authReq);
              }),
              catchError((error: any) => {
                this.authService.logout();
                return throwError(() => error);
              })
            );
          } else {
            this.authService.logout();
          }
        }
        return throwError(() => e);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
