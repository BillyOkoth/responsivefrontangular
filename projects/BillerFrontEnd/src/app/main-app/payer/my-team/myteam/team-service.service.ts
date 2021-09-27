import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { AccountReports, EslipReport } from './reports.model';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import { AccountReports, EslipReport } from '../../../../service/reports-service/reports.model';

@Injectable({
  providedIn: 'root',
})
export class TeamServiceService {
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
}
