import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  Event
} from '@angular/router';
import { AlertsService } from 'src/app/shared/alerts.service';
import { AlertComponent } from './shared/alert/alert.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BillerFrontEnd';

  showLoadingIndicator = true;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isVisible = false;

  constructor(
    private router: Router,
    private customAlert: AlertsService,
    private modalService: NzModalService,
    private idle: Idle,
    private appService: AppService
  ) {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    const is_ie = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

    if (is_ie) {
      this.customAlert.ALERT_TITLE = 'Browser Alert';
      this.customAlert.ALERT_MESSAGE =
        'You are using Internet Explorer for better performance use Google Chrome or Firefox. Thank you';

      this.modalService.create({
        nzTitle: 'IE Support',
        nzContent: AlertComponent,
        nzClosable: true
      });

      this.customAlert.CLOSE_ALERT.subscribe(() => {});
    }
    // Subscribe to the router events observable
    this.router.events.subscribe((routerEvent: Event) => {
      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        this.showLoadingIndicator = false;
      }
    });

    idle.setIdle(1200);

    idle.setTimeout(60);

    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'You\'ve been logged out due to inactivity';
      this.timedOut = true;

      this.router.navigate(['/']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';

      this.isVisible = true;
    });

    idle.onTimeoutWarning.subscribe(countdown => {
      this.idleState = 'You will logged out in ' + countdown + ' seconds!';
    });


    // this.reset();

    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();
      }
    });
  }

  reset() {
    this.idle.watch();
    // xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.isVisible = false;
  }

  stay() {
    this.isVisible = false;
    this.reset();
  }

  logout() {
    this.isVisible = false;
    this.appService.setUserLoggedIn(false);
    this.router.navigate(['/']);
  }
  handleCancel() {

  }
}
