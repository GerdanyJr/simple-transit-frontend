import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getAuthToken();

  if (authToken) {
    const modifiedReq = req.clone({
      setHeaders: { Authorization: authToken }
    });
    return next(modifiedReq);
  }
  return next(req);
}