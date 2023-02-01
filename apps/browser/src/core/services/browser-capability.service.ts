import { Injectable } from "@angular/core";

import { BrowserPlatformUtilsService } from "./browser-platform-utils.service";
import { AbstractCapabilityService } from "@uabmagic/common/abstractions/capability.service";

@Injectable({ providedIn: 'root' })
export default class BrowserCapabilityService extends AbstractCapabilityService {
  constructor(
    private browserPlatformUtilsService: BrowserPlatformUtilsService
  ) {
    super();
  }

  override canNotify(): boolean {
    return !this.browserPlatformUtilsService.isFirefox();
  }

  override canUseAlarms(): boolean {
    return !this.browserPlatformUtilsService.isFirefox();
  }
}
