import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BrowserPlatformUtilsService {
  isFirefox(): boolean {
    return navigator.userAgent.indexOf(" Firefox/") !== -1
      || navigator.userAgent.indexOf(" Gecko/") !== -1;
  }
}
