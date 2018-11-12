import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/account/login', { email, password })
      .pipe(
        tap(res => this.setSession),
        shareReplay(1));
  }

  public register(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/account/register', { email, password }).pipe(
      tap(res => console.log(res)),
      shareReplay(1));
  }

  private setSession(authResult: any): void {
    localStorage.setItem('id_token', authResult.token);
  }
}
