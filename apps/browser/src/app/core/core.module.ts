import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from "@angular/core";

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
  providers: []
})
export class CoreModule { }
