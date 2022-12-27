import { Observable, Subject } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

import { NotificationLevel } from '@uabmagic/common/models/enum/notification-level.enum';
import { Notification } from '@uabmagic/common/models/notification.model';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {

  private messages: Subject<Notification> = new Subject<Notification>();

  messagesStream: Observable<Notification> = this.messages.asObservable();

  constructor() { }

  ngOnDestroy(): void {
    // makes sure we don't have any lingering subscriptions on the service after teardown
    this.messages.unsubscribe();
  }

  debug(...messageContents: any[]) {
    if (!environment.production) {
      this.messages.next(
        { mixedContentMessage: messageContents, level: NotificationLevel.DEBUG } as Notification
      );
    } else {
      // don't do anything with our debug message.
    }
  }

  info(message: string) {
    this.publish('', message, NotificationLevel.INFO);
  }

  success(message: string) {
    this.publish('success-snackbar', message, NotificationLevel.SUCCESS);
  }

  error(message: string) {
    this.publish('error-snackbar', message, NotificationLevel.ERROR);
  }

  private publish(color: string, message: string, level: NotificationLevel) {
    this.messages.next({ color, message, level } as Notification);
  }
}
