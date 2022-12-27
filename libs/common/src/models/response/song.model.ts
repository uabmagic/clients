import { Images } from "./images.model";
import { Playback } from "./playback.model";

export class Song {
  constructor() {
    this.images = new Images();
    this.playback = new Playback();
  }

  id: number | undefined;

  attractionAndSong: string = '';
  canRequest: boolean = false;
  comments: number | undefined;
  composer: string = '';
  dateAdded: string = '';
  images: Images;
  isFavorite: boolean = false;
  lastPlayed: string = '';
  lastRequested: string = '';
  playback: Playback;
  plays: number | undefined;
  requests: number | undefined;
  themeParkAndLand: string = '';
  year: number | undefined;
}
