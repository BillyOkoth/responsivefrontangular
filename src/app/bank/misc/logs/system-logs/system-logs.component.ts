import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-system-logs',
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.scss']
})
export class SystemLogsComponent implements OnInit {
  rows = [];
  loading = false;
  searchValue = '';
  aa = false;
  constructor( private alertsService: AlertsService, public role: RolesService) { }

  ngOnInit() {
    this.getAlerts();
  }

  setIndex(ii) {
    this.aa = ii;
  }
  getAlerts() {
    this.loading = true;
    const payload = {};

    this.alertsService.getSystemLogs(payload).subscribe((response: any) => {

      this.loading = false;
      this.rows = response;
      // response.forEach(value => {
      //   this.rows =  value;

      // });

    });
  }


}
