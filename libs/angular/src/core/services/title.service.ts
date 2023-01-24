import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(private title: Title) { }

  setPageTitle(title: string): void {
    this.title.setTitle(title);
  }
}
