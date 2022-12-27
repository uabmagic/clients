import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  passwordKey = 'password';
  sidKey = 'sid';
  userIdKey = 'userId';
  usernameKey = 'username';

  get password(): string {
    return localStorage.getItem(this.passwordKey) || '';
  }

  public setPassword(password: string): void {
    localStorage.setItem(this.passwordKey, password);
  }

  get username(): string {
    return localStorage.getItem(this.usernameKey) || '';
  }

  public setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  get sid(): string {
    return localStorage.getItem(this.sidKey) || '';
  }

  public setSid(sid: string): void {
    localStorage.setItem(this.sidKey, sid);
  }

  get userId(): number {
    return Number(localStorage.getItem(this.userIdKey)) || 0;
  }

  public setUserId(userId: number): void {
    localStorage.setItem(this.userIdKey, userId.toString());
  }

  get authorizationValue(): string | null {
    return (!this.userId || !this.sid)
      ? null
      : `${this.userId}:${this.sid}`;
  }

  get isLoggedIn(): boolean {
    return this.username !== '' && this.password !== '';
  }

  public logout(): void {
    localStorage.removeItem(this.passwordKey);
    localStorage.removeItem(this.sidKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.usernameKey);
  }
}
