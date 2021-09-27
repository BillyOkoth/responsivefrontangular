import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  constructor(public alertService: AlertsService) {}

  ngOnInit() {}

  closeAlert() {
    this.alertService.alertEvent(true);
  }
}
