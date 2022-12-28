import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '@app/core/services/auth.service';
import BrowserLocalStorageService from '@app/core/services/browser-local-storage.service';
import { UABDataService } from '@app/core/services/data/uab-data.service';
import { AppConstants } from '@app/shared/app-constants';
import { LoginRequest } from '@uabmagic/common/models/request/login-request.model';
import { LoginResponse } from '@uabmagic/common/models/response/login-response.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  hidePassword = true;
  isLoggedIn = false;

  form: FormGroup;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  refreshTokenAlarmName = 'refreshToken';

  constructor(
    private authService: AuthService,
    private browserLocalStorageService: BrowserLocalStorageService,
    private builder: FormBuilder,
    private uabDataService: UABDataService
  ) {
    this.form = this.builder.group({
      username: this.username,
      password: this.password
    });
  }

  async ngOnInit(): Promise<void> {
    await this.checkAuthStatus();
  }

  async checkAuthStatus(): Promise<void> {
    this.isLoggedIn = await this.authService.getIsLoggedIn();
  }

  async login(): Promise<void> {
    const username = this.username.value || '';
    const password = this.password.value || '';

    await this.authService.setUsername(username);
    await this.authService.setPassword(password);

    await this.refreshCredentials();
  }

  async logout(): Promise<void> {
    await this.authService.logout();

    await this.checkAuthStatus();
  }

  async refreshCredentials(): Promise<void> {
    chrome.alarms.clearAll();

    if (!chrome.alarms.onAlarm.hasListeners()) {
      chrome.alarms.onAlarm.addListener(async (alarm) => {
        await this.refreshTokenAlarmListener(alarm)
      });
    }

    this.createTokenRefreshAlarm();

    const password = await this.authService.getPassword();
    const username = await this.authService.getUsername();

    const loginRequest: LoginRequest = {
      password,
      username
    };

    this.uabDataService.login(loginRequest)
      .subscribe(async (loginResponse: LoginResponse) => {
        await this.checkAuthStatus();

        await this.authService.setSid(loginResponse.sid);
        await this.authService.setUserId(loginResponse.userId);

        this.username.setValue(null);
        this.password.setValue(null);
      });
  }

  createTokenRefreshAlarm() {
    chrome.alarms.clear(this.refreshTokenAlarmName);

    chrome.alarms.create(this.refreshTokenAlarmName, {
      delayInMinutes: AppConstants.tokenRefreshTime,
      periodInMinutes: AppConstants.tokenRefreshTime
    });
  }

  async refreshTokenAlarmListener(alarm: chrome.alarms.Alarm) {
    if (alarm.name === this.refreshTokenAlarmName) {
      await this.refreshCredentials();
    }
  }

  slideToggleChanged(matSlideToggleChange: MatSlideToggleChange): void {
    this.browserLocalStorageService.save(matSlideToggleChange.source.id, matSlideToggleChange.checked);
  }
}
