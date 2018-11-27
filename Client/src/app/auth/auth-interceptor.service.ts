import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(newReq);
    }

    return next.handle(req);
  }
}
