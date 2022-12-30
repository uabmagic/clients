import { Injectable } from "@angular/core";
import { AbstractCapabilityService } from "@uabmagic/common/abstractions/capability.service";

@Injectable({ providedIn: 'root' })
export default class DesktopCapabilityService extends AbstractCapabilityService {
  override canNotify(): boolean {
    return false;
  }

  override canUseAlarms(): boolean {
    return false;
  }
}
