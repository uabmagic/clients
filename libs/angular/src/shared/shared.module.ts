import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { AudioPlayerControlsComponent } from './components/audio-player-controls/audio-player-controls.component';
import { HeaderComponent } from './components/header/header.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { MaterialModule } from '../material/material.module';

const COMPONENTS = [
  AudioPlayerComponent,
  AudioPlayerControlsComponent,
  HeaderComponent,
  SongListComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    HeaderComponent
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  imports: [
    ...MODULES
  ],
  providers: []
})
export class SharedModule { }
