import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { StreamService } from '@uabmagic/angular/core/services/stream.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements AfterViewInit {
  @Output() isStreamingChange = new EventEmitter<boolean>();

  @ViewChild('stream', { static: false }) public streamRef: ElementRef;

  private audio: HTMLMediaElement | undefined;

  constructor(
    private streamService: StreamService
  ) {
    this.streamRef = new ElementRef({});

    this.streamService.status$.subscribe((status: boolean) => {
      this.toggle(status);
    });
  }

  public ngAfterViewInit() {
    this.audio = this.streamRef.nativeElement;
  }

  public toggle(shouldPlay: boolean): void {
    if (shouldPlay) {
      this.audio?.load();
      this.audio?.play();
    } else {
      this.audio?.pause();
    }
  }
}
