import { Song } from "./song.model";

export class Request {
  requestId: string = '';
  song!: Song;
}
