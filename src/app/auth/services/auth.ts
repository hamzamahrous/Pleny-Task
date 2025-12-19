import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpClient = inject(HttpClient);
  private _isAuthenticated = signal(false);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  authenticateUser(): void {
    this._isAuthenticated.set(true);
  }

  login(credentials: { username: string; password: string }) {
    return this.httpClient.post('https://dummyjson.com/auth/login', credentials);
  }
}
