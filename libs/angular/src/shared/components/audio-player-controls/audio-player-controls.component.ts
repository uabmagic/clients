import { Component } from '@angular/core';
import { StreamService } from '@uabmagic/angular/core/services/stream.service';

@Component({
  selector: 'app-audio-player-controls',
  templateUrl: './audio-player-controls.component.html',
  styleUrls: ['./audio-player-controls.component.scss']
})
export class AudioPlayerControlsComponent {
  isPlaying = false;

  constructor(
    private streamService: StreamService
  ) {
    this.streamService.status$.subscribe((status: boolean) => {
      this.isPlaying = status;
    });
  }

  toggleStream(): void {
    this.streamService.toggleStatus();
  }
}
