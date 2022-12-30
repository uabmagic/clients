import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";

import { AppRoutingModule } from '@app/app-routing.module';

import { AbstractCapabilityService } from '@uabmagic/common/abstractions/capability.service';
import { AbstractStorageService } from '@uabmagic/common/abstractions/storage.service';
import BrowserCapabilityService from './services/browser-capability.service';
import BrowserLocalStorageService from './services/browser-local-storage.service';

@NgModule({
  declarations: [
  ],
  exports: [
    BrowserAnimationsModule,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: AbstractCapabilityService,
      useClass: BrowserCapabilityService
    },
    {
      provide: AbstractStorageService,
      useClass: BrowserLocalStorageService
    }
  ]
})
export class CoreModule { }
