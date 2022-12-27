import { Component, OnInit } from '@angular/core';
import { UABDataService } from '@app/core/services/data/uab-data.service';
import { SongList } from "@uabmagic/common/models/response/song-list.model";
import { Song } from "@uabmagic/common/models/response/song.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  songs!: Song[];

  constructor(private uabDataService: UABDataService) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.uabDataService.getFavorites()
      .subscribe((result: SongList) => {
        this.songs = result.results;
      });
  }
}
