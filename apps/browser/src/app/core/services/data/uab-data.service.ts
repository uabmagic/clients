import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { LoginRequest } from "@uabmagic/common/models/request/login-request.model";
import { LoginResponse } from "@uabmagic/common/models/response/login-response.model";
import { NowPlayingSong } from "@uabmagic/common/models/response/now-playing-song.model";
import { RequestsResponse } from "@uabmagic/common/models/response/requests-response.model";
import { Song } from "@uabmagic/common/models/response/song.model";
import { SongList } from "@uabmagic/common/models/response/song-list.model";
import { SongRequestRequest } from "@uabmagic/common/models/request/song-request-request.model";

@Injectable({
  providedIn: 'root'
})
export class UABDataService {
  baseUrl = `https://uabmagic-api.vercel.app/api`;

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<SongList> {
    return this.http.get<SongList>(
      `${this.baseUrl}/favorites`
    );
  }

  getNowPlayingSong(): Observable<NowPlayingSong> {
    return this.http.get<NowPlayingSong>(
      `${this.baseUrl}/songs/now-playing`
    );
  }

  getPendingRequests(): Observable<RequestsResponse> {
    return this.http.get<RequestsResponse>(
      `${this.baseUrl}/pending-requests`
    );
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(
      `${this.baseUrl}/songs/${id}`
    );
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`,
      loginRequest
    );
  }

  request(songRequestRequest: SongRequestRequest): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/request`,
      { songId: songRequestRequest.songId }
    );
  }

  search(query: string): Observable<SongList> {
    return this.http.get<SongList>(
      `${this.baseUrl}/search/${query}`
    );
  }
}
