import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '@app/core/services/auth.service';
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
    private builder: FormBuilder,
    private uabDataService: UABDataService
  ) {
    this.form = this.builder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  login(): void {
    const username = this.username.value || '';
    const password = this.password.value || '';

    this.authService.setUsername(username);
    this.authService.setPassword(password);

    this.refreshCredentials();
  }

  logout(): void {
    this.authService.logout();

    this.checkAuthStatus();
  }

  refreshCredentials(): void {
    chrome.alarms.clearAll();

    if (!chrome.alarms.onAlarm.hasListeners()) {
      chrome.alarms.onAlarm.addListener((alarm) => { this.refreshTokenAlarmListener(alarm) });
    }

    this.createTokenRefreshAlarm();

    const loginRequest: LoginRequest = {
      password: this.authService.password,
      username: this.authService.username
    };

    this.uabDataService.login(loginRequest)
      .subscribe((loginResponse: LoginResponse) => {
        this.checkAuthStatus();

        this.authService.setSid(loginResponse.sid);
        this.authService.setUserId(loginResponse.userId);

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

  refreshTokenAlarmListener(alarm: chrome.alarms.Alarm) {
    if (alarm.name === this.refreshTokenAlarmName) {
      this.refreshCredentials();
    }
  }

  slideToggleChanged(matSlideToggleChange: MatSlideToggleChange): void {
    localStorage.setItem(matSlideToggleChange.source.id, String(matSlideToggleChange.checked));
  }
}
