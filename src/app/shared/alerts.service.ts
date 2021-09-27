import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor() {}

  ALERT_TITLE = 'IE Support';
  ALERT_MESSAGE =
    'You are using Internet Explorer for better performance use Google Chrome or Firefox. Thank you';

  CLOSE_ALERT = new Subject<boolean>();

  alertEvent(action: boolean) {
    this.CLOSE_ALERT.next(action);
  }
}
