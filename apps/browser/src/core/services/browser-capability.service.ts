import { Injectable } from "@angular/core";
import { AbstractCapabilityService } from "@uabmagic/common/abstractions/capability.service";

@Injectable({ providedIn: 'root' })
export default class BrowserCapabilityService extends AbstractCapabilityService {
  override canNotify(): boolean {
    return true;
  }

  override canUseAlarms(): boolean {
    return true;
  }
}
