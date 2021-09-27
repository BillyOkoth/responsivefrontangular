import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  allRights;
  alertRights;

  constructor(public alertsevice: AlertsService, public role: RolesService) { }

  ngOnInit() {
    this.findRights();
  }

  handleChange(e) {

    this.alertsevice.serviceTab = e;
    this.findRights();
  }

  findRights() {
    this.allRights = JSON.parse(sessionStorage.getItem('menuRights'));
    this.allRights.forEach(element => {
      if (element.menuName == 'Alerts and Logs') {
        this.alertRights = element.roles;
      }
    });

    if (this.alertRights.length > 0) {
      this.alertRights.forEach(value => {
        if (value.role == 'all') {
          this.role.alertRole = value.status;
        }
      });
    } else {
      this.role.alertRole = true;
    }


  }

}
