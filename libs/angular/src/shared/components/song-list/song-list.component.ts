import { Component, Input } from '@angular/core';
import { Song } from "@uabmagic/common/models/response/song.model";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {
  isLoading = false;

  @Input() public songs!: Song[];

  constructor() { }
}
