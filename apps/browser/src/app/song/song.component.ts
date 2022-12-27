import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UABDataService } from '@app/core/services/data/uab-data.service';
import { NotificationService } from "@app/core/services/notification.service";
import { SongRequestRequest } from "@uabmagic/common/models/request/song-request-request.model";
import { Song } from "@uabmagic/common/models/response/song.model";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  isLoading = true;
  song: Song = new Song();
  songId: number = 0;

  constructor(
    private location: Location,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private uabDataService: UABDataService
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.songId = Number(routeId);
  }

  ngOnInit(): void {
    this.loadSong();
  }

  addToFavorites(): void {
    console.log('add to favorites');
  }

  goBack(): void {
    this.location.back();
  }

  loadSong(): void {
    this.uabDataService.getSong(this.songId).pipe(
      finalize(() => this.isLoading = false)
    )
      .subscribe((result: Song) => {
        this.song = result;
      });
  }

  request(): void {
    const songRequestRequest: SongRequestRequest = {
      songId: this.songId
    };

    this.uabDataService.request(songRequestRequest)
      .subscribe((result: any) => {
        if (result.success) {
          this.notificationService.success(result.message);
        } else {
          this.notificationService.error(result.message);
        }
      });
  }
}
