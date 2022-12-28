import { Component } from '@angular/core';
import BrowserLocalStorageService from '@app/core/services/browser-local-storage.service';

@Component({
  selector: 'app-audio-player-controls',
  templateUrl: './audio-player-controls.component.html',
  styleUrls: ['./audio-player-controls.component.scss']
})
export class AudioPlayerControlsComponent {
  isPlaying = false;

  constructor(
    private browserLocalStorageService: BrowserLocalStorageService
  ) { }

  toggleStream(): void {
    this.isPlaying = !this.isPlaying;

    this.browserLocalStorageService.save('isPlaying', this.isPlaying);
  }
}
