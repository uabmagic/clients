import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-player-controls',
  templateUrl: './audio-player-controls.component.html',
  styleUrls: ['./audio-player-controls.component.scss']
})
export class AudioPlayerControlsComponent {
  isPlaying = false;

  constructor() { }

  toggleStream(): void {
    this.isPlaying = !this.isPlaying;

    chrome.storage.local.set({ isPlaying: this.isPlaying });
  }
}
