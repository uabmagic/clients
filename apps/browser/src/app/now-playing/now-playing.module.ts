import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NowPlayingRoutingModule } from './now-playing-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NowPlayingComponent } from './now-playing.component';
import { UpNextDialogComponent } from './up-next-dialog/up-next-dialog.component';

@NgModule({
  declarations: [
    NowPlayingComponent,
    UpNextDialogComponent
  ],
  imports: [
    CommonModule,
    NowPlayingRoutingModule,
    SharedModule
  ]
})
export class NowPlayingModule { }
