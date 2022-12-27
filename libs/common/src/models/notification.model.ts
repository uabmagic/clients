import { NotificationLevel } from './enum/notification-level.enum';

/**
 * Represents a notification within the application
 *
 * Warning: This classname also collides with Typescript and RxJS classes
 * Make sure you're importing the correct one!
 */
export interface Notification {
  color: string;
  title: string;
  message: string;
  level: NotificationLevel;
  mixedContentMessage?: any[];
}
