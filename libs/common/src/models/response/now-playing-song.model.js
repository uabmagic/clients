import { Song } from "./song.model";
export class NowPlayingSong extends Song {
    constructor() {
        super(...arguments);
        this.isArtistBlock = false;
        this.isUabYourWayShow = false;
        this.isWeeklyCountdown = false;
        this.requestor = '';
        this.schedule = '';
        this.uabYourWayUser = '';
    }
}
//# sourceMappingURL=now-playing-song.model.js.map