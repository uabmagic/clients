import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import BrowserLocalStorageService from '@app/core/services/browser-local-storage.service';
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
    private browserLocalStorageService: BrowserLocalStorageService,
    private formBuilder: FormBuilder,
    private uabDataService: UABDataService
  ) {
    this.form = this.formBuilder.group({
      query: this.query
    });
  }

  async ngOnInit(): Promise<void> {
    const query = await this.browserLocalStorageService.get<string>('query');

    this.query.setValue(query);

    this.search();
  }

  async search(): Promise<void> {
    const query = this.query.value;

    if (!query || query.length < 3) return;

    this.browserLocalStorageService.save('query', query);

    this.uabDataService.search(query).pipe(
      finalize(() => this.isLoading = false)
    )
      .subscribe((result: SongList) => {
        this.songs = result.results;
      });
  }
}
