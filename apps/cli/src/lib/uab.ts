import axios from 'axios';
import chalk from 'chalk';
import * as CLI from 'clui';
import Configstore from 'configstore';
import { Inquirer } from "./inquirer";

import { LoginRequest } from '@uabmagic/common/models/request/login-request.model';
import { LoginResponse } from '@uabmagic/common/models/response/login-response.model';
import { NowPlayingSong } from '@uabmagic/common/models/response/now-playing-song.model';
import { RequestsResponse } from '@uabmagic/common/models/response/requests-response.model';
import { SongList } from '@uabmagic/common/models/response/song-list.model';
import { SongRequestRequest } from "@uabmagic/common/models/request/song-request-request.model";
import { Song } from '@uabmagic/common/models/response/song.model';

export class UAB {
  passwordKey = 'password';
  sidKey = 'sid';
  userIdKey = 'userId';
  usernameKey = 'username';

  baseUrl = `https://uabmagic-api.vercel.app/api`
  // baseUrl = `http://localhost:3000/api`

  conf: Configstore;
  Spinner = CLI.Spinner;

  constructor() {
    this.conf = new Configstore('uabcli');
  }

  getStoredToken() {
    return this.conf.get(this.sidKey);
  }

  getStoredUserId() {
    return this.conf.get(this.userIdKey);
  }

  getUsername(): string {
    return this.conf.get(this.usernameKey);
  }

  async getTokenFromUAB(): Promise<string> {
    let showSpinner = false;

    let username = this.conf.get(this.usernameKey);
    let password = this.conf.get(this.passwordKey);

    if (!username && !password) {
      showSpinner = true;

      const credentials = await Inquirer.askUABCredentials();

      username = credentials.username;
      this.conf.set(this.usernameKey, credentials.username);

      password = credentials.password;
      this.conf.set(this.passwordKey, credentials.password);
    }

    const status = new this.Spinner(`Authenticating...`);

    if (showSpinner) {
      status.start();
    }

    const url = `${this.baseUrl}/auth/login`;

    const loginRequest: LoginRequest = {
      password,
      username
    };

    try {
      const { data, status } = await axios.post<LoginResponse>(url, loginRequest);

      if (status === 200) {
        this.conf.set(this.sidKey, data.sid);
        this.conf.set(this.userIdKey, data.userId);

        return data.sid;
      }

      return '';
    } catch (err) {
      return `Error logging in: ${err}`;
    } finally {
      if (showSpinner) {
        status.stop();
      }
    }
  }

  async search(query: string): Promise<Song[]> {
    const status = new this.Spinner(`Searching...`);
    status.start();

    const url = `${this.baseUrl}/search/${query}`;

    try {
      const { data, status } = await axios.get<SongList>(url);

      return (status === 200) ? data.results : [];
    } finally {
      status.stop();
    }
  }

  async request(songId: number) {
    const status = new this.Spinner(`Requesting...`);
    status.start();

    const url = `${this.baseUrl}/request`;

    const songRequestRequest: SongRequestRequest = {
      songId
    };

    const headers = this.buildHeaders();

    try {
      const { data, status } = await axios.post<any>(url, songRequestRequest, { headers });

      return (status === 200) ? data : [];
    } finally {
      status.stop();
    }
  }

  async getFavorites(): Promise<Song[]> {
    const status = new this.Spinner(`Loading...`);
    status.start();

    const url = `${this.baseUrl}/favorites`;
    const headers = this.buildHeaders();

    try {
      const { data, status } = await axios.get<SongList>(url, { headers });

      return (status === 200) ? data.results : [];
    } finally {
      status.stop();
    }
  }

  async addFavorite(songId: number): Promise<any> {
    const status = new this.Spinner(`Adding favorite...`);
    status.start();

    const url = `${this.baseUrl}/favorites`;
    const headers = this.buildHeaders();

    try {
      const { data, status } = await axios.post<any>(url, { songId }, { headers });

      return (status === 200) ? data : [];
    } finally {
      status.stop();
    }
  }

  async removeFavorite(songId: number): Promise<any> {
    const status = new this.Spinner(`Removing favorite...`);
    status.start();

    const url = `${this.baseUrl}/favorites`;
    const headers = this.buildHeaders();

    try {
      const { data, status } = await axios.delete<any>(url, {
        data: { songId },
        headers
      });

      return (status === 200) ? data : [];
    } finally {
      status.stop();
    }
  }

  async getNowPlaying(): Promise<NowPlayingSong | null> {
    const status = new this.Spinner(`Loading...`);
    status.start();

    const headers = this.buildHeaders();
    const url = `${this.baseUrl}/songs/now-playing`;

    try {
      const { data, status } = await axios.get<NowPlayingSong>(url, { headers });

      return (status == 200) ? data : null;
    } finally {
      status.stop();
    }
  }

  async getPendingRequests(): Promise<RequestsResponse> {
    const status = new this.Spinner(`Loading...`);
    status.start();

    const url = `${this.baseUrl}/pending-requests`;
    const headers = this.buildHeaders();

    try {
      const { data, status } = await axios.get<RequestsResponse>(url, { headers });

      return (status == 200) ? data : null;
    } finally {
      status.stop();
    }
  }

  async deletePendingRequest(requestId: number, songId: number, username: string): Promise<any> {
    const status = new this.Spinner(`Loading...`);
    status.start();

    const url = `${this.baseUrl}/pending-requests`;
    const headers = this.buildHeaders();

    const deleteRequest = {
      requestId,
      songId,
      username
    };

    try {
      const { data, status } = await axios.delete<any>(url, {
        data: deleteRequest,
        headers
      });

      return (status == 200) ? data : null;
    } finally {
      status.stop();
    }
  }

  async getSong(songId: number): Promise<Song | null> {
    const status = new this.Spinner(`Loading...`);
    status.start();

    const headers = this.buildHeaders();
    const url = `${this.baseUrl}/songs/${songId}`;

    try {
      const { data, status } = await axios.get<Song>(url, { headers });

      return (status == 200) ? data : null;
    } finally {
      status.stop();
    }
  }

  favoriteDisplay(isFavorite: boolean): string {
    return isFavorite ? `${chalk.red('♥')}` : '';
  }

  private buildHeaders(): any {
    const userId = this.conf.get(this.userIdKey);
    const sid = this.conf.get(this.sidKey);

    return {
      'Authorization': `${userId}:${sid}`
    };
  }
}
