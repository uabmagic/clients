import { Images } from "./images.model";
import { Playback } from "./playback.model";
export class Song {
    constructor() {
        this.attractionAndSong = '';
        this.canRequest = false;
        this.composer = '';
        this.lastPlayed = '';
        this.themeParkAndLand = '';
        this.images = new Images();
        this.playback = new Playback();
    }
}
//# sourceMappingURL=song.model.js.map