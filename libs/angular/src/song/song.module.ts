import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { SongComponent } from './song.component';
import { SharedModule } from '@uabmagic/angular/shared/shared.module';

@NgModule({
  declarations: [
    SongComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SongRoutingModule
  ]
})
export class SongModule { }
