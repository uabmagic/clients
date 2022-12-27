import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UABDataService } from '@app/core/services/data/uab-data.service';
import { SongList } from "@uabmagic/common/models/response/song-list.model";
import { Song } from "@uabmagic/common/models/response/song.model";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  query = new FormControl('');

  isLoading = true;

  songs!: Song[];

  constructor(
    private formBuilder: FormBuilder,
    private uabDataService: UABDataService
  ) {
    this.form = this.formBuilder.group({
      query: this.query
    });
  }

  ngOnInit(): void {
    chrome.storage.local.get(["query"], ({ query }) => {
      if (!query) return;

      this.query.setValue(query);

      this.search();
    });
  }

  search(): void {
    const query = this.query.value;

    if (!query || query.length < 3) return;

    chrome.storage.local.set({ query });

    this.uabDataService.search(query).pipe(
      finalize(() => this.isLoading = false)
    )
      .subscribe((result: SongList) => {
        this.songs = result.results;
      });
  }
}
