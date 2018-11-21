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

    // Always add cors origin
    let cloned = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', environment.accessControlOrigin)
    });

    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      cloned = cloned.clone({
        headers: cloned.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(cloned);
    }

    return next.handle(cloned);
  }
}
