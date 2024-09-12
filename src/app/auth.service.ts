import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginKey = 'Login';

  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const data = localStorage.getItem(this.loginKey);
      return data !== null;
    }
    return false;
  }
  
  setLogin(data: string): void {
    localStorage.setItem(this.loginKey, data);
  }

  clearLogin(): void {
    localStorage.removeItem(this.loginKey);
  }
}
