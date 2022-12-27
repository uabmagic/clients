import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements AfterViewInit {
  @ViewChild('stream', { static: false }) public streamRef: ElementRef;

  private audio: HTMLMediaElement | undefined;

  constructor() {
    this.streamRef = new ElementRef({});
  }

  public ngAfterViewInit() {
    this.audio = this.streamRef.nativeElement;

    let that = this;

    chrome.storage.onChanged.addListener(function (changes, _namespace) {
      for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === 'isPlaying') {
          that.toggle(!newValue);
        }
      }
    });
  }

  public toggle(isPlaying: boolean): void {
    if (isPlaying) {
      this.audio?.pause();
    } else {
      this.audio?.load();
      this.audio?.play();
    }
  }
}
