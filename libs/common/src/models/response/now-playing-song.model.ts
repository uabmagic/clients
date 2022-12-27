import { Song } from "./song.model";

export class NowPlayingSong extends Song {
  isArtistBlock: boolean = false;
  isUabYourWayShow: boolean = false;
  isWeeklyCountdown: boolean = false;
  requestor: string = '';
  schedule: string = '';
  uabYourWayUser: string = '';
  upNext!: string[];
}
