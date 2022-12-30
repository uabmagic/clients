import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { Notification } from '@uabmagic/common/models/notification.model';
import { NotificationLevel } from '@uabmagic/common/models/enum/notification-level.enum';
import { NotificationService } from '@uabmagic/angular/core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject('WINDOW') private window: any,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.notificationService.messagesStream
      .pipe(
        catchError(() => of({
          title: 'Notification Error',
          message: 'There was an unknown error with the notifications system',
          level: NotificationLevel.DEBUG
        } as Notification)),
        takeUntil(this.destroy$)
      )
      .subscribe((notification: Notification) => this.handleIncomingNotification(notification));
  }

  async ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleIncomingNotification(notification: Notification): void {
    const options = notification.color === '' ? {} : {
      panelClass: [notification.color]
    };

    this.snackBar.open(notification.message, undefined, options);

    if (notification.level === NotificationLevel.DEBUG) {
      if (notification.mixedContentMessage) {
        this.window.console.log(...notification.mixedContentMessage);
      } else {
        this.window.console.log(notification.message);
      }
    }
  }
}
