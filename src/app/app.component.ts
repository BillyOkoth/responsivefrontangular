import { Component } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event
} from '@angular/router';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertsService } from './shared/alerts.service';
import { NzModalService } from 'ng-zorro-antd';
import { AllowedActions } from './shared/actions.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppService } from './core/services/app-service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ebiller-front';
  // We will use this property to show or hide
  // the loading indicator
  showLoadingIndicator = true;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isVisible = false;
  // title = "angular-idle-timeout";

  constructor(
    private router: Router,
    private customAlert: AlertsService,
    private modalService: NzModalService,
    private actionService: AllowedActions,
    private idle: Idle,
    public keepalive: Keepalive,
    private appService: AppService
  ) {
    this.actionService.getActions();
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    const is_ie = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

    if (is_ie) {
      this.customAlert.ALERT_TITLE = 'Browser Alert';
      this.customAlert.ALERT_MESSAGE =
        'You are using Internet Explorer for better performance use Google Chrome or Firefox. Thank you';

      const dialogRef = this.modalService.create({
        nzTitle: 'IE Support',
        nzContent: AlertComponent
      });

      this.customAlert.CLOSE_ALERT.subscribe(() => {
        dialogRef.close();
      });
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

    // idle.setIdle(5);
    idle.setIdle(1200);

    // idle.setTimeout(5);
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
  // login user to backend system
  loginUser() {
    this.router.navigate(['/admin']);
  }
  handleCancel() {

  }
}
