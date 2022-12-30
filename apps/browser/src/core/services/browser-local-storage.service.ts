import { Injectable } from "@angular/core";
import { AbstractStorageService } from "@uabmagic/common/abstractions/storage.service";

@Injectable({ providedIn: 'root' })
export default class BrowserLocalStorageService extends AbstractStorageService {
  async get<T>(key: string): Promise<T> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (obj: any) => {
        if (obj != null && obj[key] != null) {
          resolve(obj[key] as T);

          return;
        }

        resolve(null);
      });
    });
  }

  async remove(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      chrome.storage.local.remove(key, () => {
        resolve();
      });
    });
  }

  async save<T>(key: string, obj: T): Promise<void> {
    const keyedObj = { [key]: obj };

    return new Promise<void>((resolve) => {
      chrome.storage.local.set(keyedObj, () => {
        resolve();
      });
    });
  }
}
