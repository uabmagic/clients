import { Injectable } from "@angular/core";

import { LowSync } from "lowdb";
import { LocalStorage } from "lowdb/browser";

import { AbstractStorageService } from "@uabmagic/common/abstractions/storage.service";

@Injectable({ providedIn: 'root' })
export default class DesktopStorageService extends AbstractStorageService {
  store: LowSync;
  storeObject: any = {};

  constructor() {
    super();

    this.store = new LowSync(new LocalStorage('settings'));
  }

  async get<T>(key: string): Promise<T> {
    return new Promise((resolve) => {
      this.store.read();

      if (this.store.data === null) {
        this.store.data = this.storeObject;

        this.store.write();
      }

      if (this.store.data[key] !== null) {
        resolve(this.store.data[key] as T);

        return;
      }

      resolve(null);
    });
  }

  async remove(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.store.read();

      delete this.store.data[key];

      this.store.write();

      resolve();
    });
  }

  async save<T>(key: string, obj: T): Promise<void> {
    return new Promise<void>((resolve) => {
      this.store.read();

      this.store.data[key] = obj;

      this.store.write();

      resolve();
    });
  }
}
