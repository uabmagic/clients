import { Injectable } from "@angular/core";
import BrowserLocalStorageService from "./browser-local-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  passwordKey = 'password';
  sidKey = 'sid';
  userIdKey = 'userId';
  usernameKey = 'username';

  constructor(
    private browserLocalStorageService: BrowserLocalStorageService
  ) { }

  public getPassword(): Promise<string> {
    return this.browserLocalStorageService.get<string>(this.passwordKey);
  }

  public setPassword(password: string): Promise<void> {
    return this.browserLocalStorageService.save(this.passwordKey, password);
  }

  public getUsername(): Promise<string> {
    return this.browserLocalStorageService.get<string>(this.usernameKey);
  }

  public setUsername(username: string): Promise<void> {
    return this.browserLocalStorageService.save(this.usernameKey, username);
  }

  public getSid(): Promise<string> {
    return this.browserLocalStorageService.get<string>(this.sidKey);
  }

  public setSid(sid: string): Promise<void> {
    return this.browserLocalStorageService.save(this.sidKey, sid);
  }

  public getUserId(): Promise<number> {
    return this.browserLocalStorageService.get<number>(this.userIdKey);
  }

  public setUserId(userId: number): Promise<void> {
    return this.browserLocalStorageService.save(this.userIdKey, userId);
  }

  public async getAuthorizationValue(): Promise<string> {
    const sid = await this.getSid();
    const userId = await this.getUserId();

    return (!sid || !userId)
      ? ''
      : `${userId}:${sid}`;
  }

  public async getIsLoggedIn(): Promise<boolean> {
    const password = await this.getPassword();
    const username = await this.getUsername();

    return password && password !== '' && username && username !== '';
  }

  public async logout(): Promise<void> {
    await this.browserLocalStorageService.remove(this.passwordKey);
    await this.browserLocalStorageService.remove(this.sidKey);
    await this.browserLocalStorageService.remove(this.userIdKey);
    await this.browserLocalStorageService.remove(this.usernameKey);
  }
}
