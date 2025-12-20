import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);

  private _isAuthenticated = signal(false);
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  private _userId = signal(0);
  readonly userId = this._userId.asReadonly();

  login(credentials: { username: string; password: string }): Observable<User> {
    return this.httpClient.post<User>('https://dummyjson.com/auth/login', credentials).pipe(
      tap((res) => {
        this._userId.set(res.id);
        this._isAuthenticated.set(true);
      })
    );
  }
}
