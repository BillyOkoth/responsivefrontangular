import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  serviceTab: any;

  constructor(private http: HttpClient) { }

  // get the email alerts.
  emailAlerts(payload) {
    return this.http.post(
      `${environment.baseurl}emailAlerts`,
      payload,
    );
  }

  getSystemLogs(payload) {
    return this.http.post(
      `${environment.baseurl}getSystemLogs`,
      payload,
    );
  }

  // delete alerts.
  deleteAlerts(payload) {
    return this.http.post(
      `${environment.baseurl}deleteEmailAlerts`,
      payload,
    );
  }


}
