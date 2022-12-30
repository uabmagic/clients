import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StreamService {
  private status = new BehaviorSubject<boolean>(false);
  status$ = this.status.asObservable();

  toggleStatus() {
    this.status.next(!this.status.value);
  }
}
