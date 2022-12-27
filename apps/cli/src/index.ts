#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import * as CTP from 'console-table-printer';
import figlet from 'figlet';
import { program } from 'commander';

import { Constants } from './lib/constants';
import { UAB } from './lib/uab';

import { Request } from '@uabmagic/common/models/response/request.model';
import { Song } from '@uabmagic/common/models/response/song.model';

export class Main {
  displayRaw: boolean = false;
  uab: UAB;

  // Chalk colors
  error = chalk.hex(Constants.colors.error);
  success = chalk.hex(Constants.colors.success);
  uabblue = chalk.hex(Constants.colors.uabblue);

  constructor() {
    this.uab = new UAB();
  }

  async register() {
    program
      .option("--raw", "Return raw JSON output");

    program.on("option:raw", () => {
      this.displayRaw = true;
    });

    program
      .command('f')
      .alias('favorites')
      .description('Display My Favorites')
      .option('-a, --add <id>', 'Add a song to My Favorites by song ID')
      .option('-d, --delete <id>', 'Delete a song from My Favorites by song ID')
      .action(async (options) => {
        await this.commandWrapper(this.processFavorites(options));
      });

    program
      .command('n')
      .aliases(['nowplaying', 'np'])
      .description("Show the Now Playing song")
      .option('-f, --favorite', 'Add Now Playing to your My Favorites list')
      .action(async (options) => {
        await this.commandWrapper(this.nowPlaying(options));
      });

    program
      .command('p')
      .alias('pending')
      .description('Display My Pending Requests')
      .option('-d, --delete <id>', 'Delete a pending request by request ID')
      .action(async (options) => {
        await this.commandWrapper(this.processPending(options));
      });

    program
      .command('r <songID>')
      .alias('request')
      .description('Request a song by song ID')
      .action(async (songId: number) => {
        await this.commandWrapper(this.request(songId));
      });

    program
      .command('s <query>')
      .alias('search')
      .description('Search UAB for songs')
      .action(async (query: string) => {
        await this.commandWrapper(this.search(query));
      });

    program
      .command('g <songID>')
      .alias('song')
      .description('Get a song by song ID')
      .action(async (songId: number) => {
        await this.commandWrapper(this.getSong(songId));
      });

    program
      .command('z')
      .alias('randomizer')
      .description('Invoke the UAB-O-MATIC to request a random song!')
      .action(async () => {
        await this.commandWrapper(this.randomize());
      });
  }

  async getUABToken(): Promise<string> {
    return await this.uab.getTokenFromUAB();
  }

  newline(lines: number = 1) {
    if (lines > 0) {
      console.log(``);

      this.newline(lines - 1);
    }
  }

  logError(message: string): void {
    console.log(this.error(message));
  }

  logPleaseTryAgain(): void {
    this.logError(`Oops! Please try again.`);
  }

  logSuccess(message: string): void {
    console.log(this.success(message));
  }

  logWarning(message: string): void {
    console.log(chalk.yellow(message));
  }

  throwInvalidArgumentCombination(command: string, comboCommands: string[]) {
    const comboCommandsDisplay = comboCommands.map(c => `'${c}'`).join(', ');

    throw `Sorry, '${command}' can only be used with: ${comboCommandsDisplay}!`;
  }

  async run() {
    try {
      await this.register();
      await this.getUABToken();

      program.parse(process.argv);
    } catch (err) {
      if (err) {
        this.logError(err);

        return;
      }
    }
  }

  displayHeader(): void {
    clear();

    console.log(
      this.uabblue(
        figlet.textSync('UABMagic', { horizontalLayout: 'full' })
      )
    );

    this.newline();
  }

  async commandWrapper(command: Promise<void>): Promise<void> {
    if (!this.displayRaw) {
      this.displayHeader();

      await command;
    }
  }

  async nowPlaying(options: any): Promise<void> {
    const nowPlaying = await this.uab.getNowPlaying();

    if (options.favorite) {
      await this.addFavorite(nowPlaying.id);
    } else {
      if (this.displayRaw) {
        console.log(nowPlaying);
      } else {
        console.log(chalk.white(`Now playing: ${nowPlaying.schedule}`));
        this.newline();

        const favorite = this.uab.favoriteDisplay(nowPlaying.isFavorite);
        const time = `(${nowPlaying.playback.timeElapsedDisplay} / ${nowPlaying.playback.durationDisplay})`;

        console.log(`  ${nowPlaying.themeParkAndLand.toUpperCase()} (Song ID: ${nowPlaying.id}) ${favorite}`);
        console.log(`  ${this.uabblue(nowPlaying.attractionAndSong)} ${time}`);

        if (nowPlaying.requestor !== '') {
          this.newline();
          console.log(`  Requested by ${chalk.yellow(nowPlaying.requestor)}`);
        }

        this.newline(2);

        console.log(`Up next:`);

        nowPlaying.upNext.map((song: string) => {
          console.log(`  - ${song}`);
        });
      }
    }
  }

  async addFavorite(songId: number): Promise<void> {
    const result = await this.uab.addFavorite(songId);

    this.handleFavoriteResult(result, 'added');
  }

  async deleteFavorite(songId: number,): Promise<void> {
    const result = await this.uab.removeFavorite(songId);

    this.handleFavoriteResult(result, 'removed');
  }

  handleFavoriteResult(result: any, verb: string): void {
    if (this.displayRaw) {
      console.log(result);
    } else if (result.success) {
      this.logSuccess(`Successfully ${verb} favorite!`)
    } else {
      this.logPleaseTryAgain();
    }
  }

  async processFavorites(options: any): Promise<void> {
    if (options.add) {
      await this.addFavorite(options.add);
    } else if (options.delete) {
      await this.deleteFavorite(options.delete);
    } else {
      const results = await this.uab.getFavorites();

      if (this.displayRaw) {
        console.log(results);
      } else {
        const resultTable = new CTP.Table({
          title: `My Favorites`,
          columns: [
            { name: 'attractionAndSong', title: 'Song title', alignment: 'left' },
            { name: 'id', title: 'Song ID', alignment: 'center' }
          ]
        });

        results.map((result: Song) => {
          resultTable.addRow({
            attractionAndSong: result.attractionAndSong,
            id: result.id
          });
        });

        resultTable.printTable();

        this.newline();
      }
    }
  }

  async processPending(options: any): Promise<void> {
    if (options.delete) {
      const requestId = options.delete;
      const username = this.uab.getUsername();

      const pendingRequests = await this.uab.getPendingRequests();
      const matchingRequest = pendingRequests.results.find(r => r.requestId === requestId.toString());

      if (!matchingRequest) {
        this.logWarning(`Sorry, that request wasn't found. Please try again.`);

        return;
      }

      const requestedSongId = matchingRequest.song.id;

      const result = await this.uab.deletePendingRequest(requestId, requestedSongId, username);

      if (this.displayRaw) {
        console.log(result);
      } else if (result.success) {
        this.logSuccess(`Request successfully cancelled!`);
      } else {
        this.logPleaseTryAgain();
      }
    } else {
      const pendingRequests = await this.uab.getPendingRequests();

      if (this.displayRaw) {
        console.log(pendingRequests);
      } else {
        const resultTable = new CTP.Table({
          title: 'My Pending Requests',
          columns: [
            { name: 'requestId', title: 'Request ID', alignment: 'center' },
            { name: 'id', title: 'Song ID', alignment: 'center' },
            { name: 'attractionAndSong', title: 'Song title', alignment: 'left' }
          ]
        });

        pendingRequests.results.map((request: Request) => {
          resultTable.addRow({
            requestId: request.requestId,
            id: request.song.id,
            attractionAndSong: request.song.attractionAndSong
          });
        });

        resultTable.printTable();

        this.newline();
      }
    }
  }

  async request(requestedSongId: number): Promise<void> {
    const requestResults = await this.uab.request(requestedSongId);

    if (this.displayRaw) {
      console.log(requestResults);
    } else if (requestResults.success) {
      this.logSuccess(requestResults.message);
    } else {
      this.logError(`An error occurred while requesting song: ${requestResults.message}`);
    }

    this.newline();
  }

  async getSong(songId: number): Promise<void> {
    const song = await this.uab.getSong(songId);

    if (this.displayRaw) {
      console.log(song);
    } else {
      const favorite = this.uab.favoriteDisplay(song.isFavorite);

      console.log(`  ${song.themeParkAndLand.toUpperCase()} (Song ID: ${song.id}) ${favorite}`);
      console.log(`  ${this.uabblue(song.attractionAndSong)}`);

      this.newline();

      console.log(`  Comments: ${chalk.yellow(song.comments)}`);

      if (song.composer !== '') {
        console.log(`  Composer: ${chalk.yellow(song.composer)}`);
      }

      if (song.dateAdded !== '') {
        console.log(`  Date added: ${chalk.yellow(song.dateAdded)}`);
      }

      console.log(`  Duration: ${chalk.yellow(song.playback.durationDisplay)}`);

      if (song.lastPlayed !== '') {
        console.log(`  Last played: ${chalk.yellow(song.lastPlayed)}`);
      }

      if (song.lastRequested !== '') {
        console.log(`  Last requested: ${chalk.yellow(song.lastRequested)}`);
      }

      console.log(`  Plays: ${chalk.yellow(song.plays)}`);
      console.log(`  Requests: ${chalk.yellow(song.requests)}`);
    }

    this.newline();
  }

  async search(query: string): Promise<void> {
    const encodedQuery = encodeURIComponent(query);
    const searchResults = await this.uab.search(encodedQuery);

    if (this.displayRaw) {
      console.log(searchResults);
    } else {
      const resultTable = new CTP.Table({
        title: `Search results for "${query}"`,
        columns: [
          { name: 'attractionAndSong', title: 'Song title', alignment: 'left' },
          { name: 'duration', title: 'Duration', alignment: 'center' },
          { name: 'id', title: 'Song ID', alignment: 'center' }
        ]
      });

      searchResults.map((result: any) => {
        resultTable.addRow({
          attractionAndSong: result.attractionAndSong,
          duration: result.playback.durationDisplay,
          id: result.id
        });
      });

      resultTable.printTable();

      this.newline();
    }
  }

  async randomize(): Promise<void> {
    const minSongID = 18000;
    const maxSongID = 26000;

    let haveValidSong = false;

    while (!haveValidSong) {
      const songId = Math.floor(Math.random() * (maxSongID - minSongID + 1) + minSongID);

      try {
        const song = await this.uab.getSong(songId);

        haveValidSong = true;
        console.log(`Requesting ${song.attractionAndSong} from ${song.themeParkAndLand}`);

        await this.request(songId);
      } catch (error) {
        haveValidSong = false;
        console.log('Still working, please wait...');
      }
    }
  }
}

const main = new Main();
main.run();
