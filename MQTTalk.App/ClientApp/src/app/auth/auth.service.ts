import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<object> {
    return this.http.post('http://localhost:53457/api/account/login', { email, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay(1)
      );
  }

  public register(email: string, password: string): Observable<object> {
    return this.http.post('http://localhost:53457/api/account/register', { email, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay(1)
      );
  }

  private setSession(authResult: any): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    // return moment().isBefore(this.getExpiration());
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
