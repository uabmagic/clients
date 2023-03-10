import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AbstractStorageService } from '@uabmagic/common/abstractions/storage.service';
import { UpNextDialogData } from '@uabmagic/angular/shared/models/dialog-data/up-next-dialog-data.model';
import { NowPlayingSong } from '@uabmagic/common/models/response/now-playing-song.model';
import { UpNextDialogComponent } from './up-next-dialog/up-next-dialog.component';

import { TitleService } from '../core/services/title.service';
import { UABDataService } from '../core/services/data/uab-data.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {
  @HostBinding('@.disabled')
  public animationsDisabled = true;

  elapsedTimeDisplay = '';

  currentSongId: number | undefined = 0;
  nowPlayingSong: NowPlayingSong = new NowPlayingSong();

  currentProgress = 0;
  streamIcon = 'play';
  timeLeft = 15000;

  interval: any = null;
  timeout: any = null;

  constructor(
    private storageService: AbstractStorageService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private uabDataService: UABDataService
  ) { }

  ngOnInit(): void {
    this.refreshSong();
  }

  displayUpNextDialog(): void {
    const upNextSongs: UpNextDialogData = {
      songs: this.nowPlayingSong.upNext
    };

    this.dialog.open(UpNextDialogComponent, {
      data: upNextSongs,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      width: '400px'
    });
  }

  refreshSong(): void {
    clearInterval(this.interval);
    clearTimeout(this.timeout);

    this.uabDataService.getNowPlayingSong()
      .subscribe(async (result: NowPlayingSong) => {
        this.nowPlayingSong = result;

        const title = `${result.attractionAndSong} (${result.themeParkAndLand.toUpperCase()})`;
        this.titleService.setPageTitle(title);

        const timeLeft = result?.playback?.timeLeft ?? 15000;
        this.timeLeft = timeLeft * 1000;

        this.interval = setInterval(() => this.updateTime(), 1000);
        this.timeout = setTimeout(() => this.refreshSong(), this.timeLeft);

        const showNotificationWhenNowPlayingChanges =
          await this.storageService.get<boolean>('showNotificationWhenNowPlayingChanges');

        if (showNotificationWhenNowPlayingChanges
          && this.currentSongId !== result.id) {
          this.currentSongId = result.id;

          chrome.notifications.create(`uab-nowplaying-${Date.now()}`, {
            iconUrl: 'assets/icon_128.png',
            imageUrl: `${result.images.url}`,
            message: `${result.themeParkAndLand}`,
            title: `${result.attractionAndSong}`,
            type: 'image'
          }, (_notificationId) => { });
        }
      });
  }

  updateTime(): void {
    const duration = this.nowPlayingSong.playback.duration || 0;

    this.timeLeft = this.timeLeft < 0 || this.timeLeft - 1000 < 0
      ? 0
      : this.timeLeft - 1000;

    const elapsedTime = duration - this.timeLeft / 1000;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    this.currentProgress = ((elapsedTime / (duration * 1000)) * 1000) * 100;

    this.elapsedTimeDisplay = `${minutes}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}
