import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AbstractStorageService } from '@uabmagic/common/abstractions/storage.service';
import { Song } from "@uabmagic/common/models/response/song.model";
import { SongList } from "@uabmagic/common/models/response/song-list.model";
import { UABDataService } from '../core/services/data/uab-data.service';

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
    private storageService: AbstractStorageService,
    private uabDataService: UABDataService
  ) {
    this.form = this.formBuilder.group({
      query: this.query
    });
  }

  async ngOnInit(): Promise<void> {
    const query = await this.storageService.get<string>('query');

    this.query.setValue(query);

    this.search();
  }

  async search(): Promise<void> {
    const query = this.query.value;

    if (!query || query.length < 3) return;

    this.storageService.save('query', query);

    this.uabDataService.search(query).pipe(
      finalize(() => this.isLoading = false)
    )
      .subscribe((result: SongList) => {
        this.songs = result.results;
      });
  }
}
