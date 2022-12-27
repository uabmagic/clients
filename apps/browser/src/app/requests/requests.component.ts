import { Component, OnInit } from '@angular/core';
import { UABDataService } from '@app/core/services/data/uab-data.service';
import { RequestsResponse } from "@uabmagic/common/models/response/requests-response.model";
import { Song } from "@uabmagic/common/models/response/song.model";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  songs!: Song[];

  constructor(private uabDataService: UABDataService) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.uabDataService.getPendingRequests()
      .subscribe((result: RequestsResponse) => {
        this.songs = result.results.map(r => r.song);
      });
  }
}
