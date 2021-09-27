import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AccountReports, EslipReport } from './reports.model';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  account_no: string;
  eslip_no: string;
  selectedTab = 0;
  constructor(private http: HttpClient) {}

  getAccountReports(payload: AccountReports) {
    return this.http.post(`${environment.baseurl}accountReport`, payload);
  }

  getEslipReports(payload: EslipReport) {
    return this.http.post(`${environment.baseurl}eslipReport`, payload);
  }

  fetchAllUsers(payload) {
    return this.http.post(
      `${environment.baseurl}getAllUsersFromBankside`,
      payload
    );
  }

  getReconcileReports(payload) {
    return this.http.post(
      `${environment.baseurl}eslipReconcileReportPayer`,
      payload
    );
  }

  getMyOldReport(payload) {
    return this.http.post(
      `${environment.baseurl}getMyOldReport`,
      payload
    );
  }

  getMyOldReportDeatils(payload) {
    return this.http.post(
      `${environment.baseurl}getMyOldReportDeatils`,
      payload
    );
  }


}
