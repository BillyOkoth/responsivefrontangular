import { Injectable } from '@angular/core';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import { UpgradeToBiller } from 'src/app/core/services/billers/billers.model';
import { HttpClient } from '@angular/common/http';
import { DashboardStats } from './biller.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillerService {
  upgradeToBiller = true;
  flagToBiller = '0';

  policyMappingSubject = new BehaviorSubject<any>(true);
  payerPolicyUpdateSubject = new BehaviorSubject<any>(true);
  fetchInvoiceUpdateSubject = new BehaviorSubject<any>(true);
  disputeInvoiceSubject = new BehaviorSubject<any>(true);
  fetchInvoicePercentageSubject = new BehaviorSubject<any>(true);
  selectedTab: any;
  invoiceRows = [];
  services;
  oddCentsFound = false;
  oddCentAccount = '';
  oddCentAmount = 0;
  zeroValuesLength;
  accountInEslip;
  payer_insurance_columns: any[];

  constructor(private http: HttpClient) {}

  changeToBiller(payload: UpgradeToBiller) {
    return this.http.post(`${environment.baseurl}flagPayerToBiller`, payload);
  }

  fetchDashboardStats(payload: DashboardStats) {
    return this.http.post(`${environment.baseurl}getDashBoardData`, payload);
  }

  viewPayerDetails(payload) {
    return this.http.post(`${environment.baseurl}payerDetails`, payload);
  }

  getInvoicesPayer(payload) {
    return this.http
      .post(`${environment.baseurl}getInvoicesPayer`, payload)
      .pipe(
        map((response: any) =>
          response.map((value: any) => {
            let amount = parseFloat(value.amount);
            const checked = false;

            if (amount < 0) {
              amount = 0;
            }

            const newField = {
              checked: false,
            };

            if (value.due_date === 'null') {
              value.due_date = Date.now().toString();
              value.due_date = 'NA';
            }

            return Object.assign(newField, value);
          })
        )
      );
  }

  disputeInvoice(payload) {
    return this.http.post(`${environment.baseurl}disputeInvoice`, payload);
  }

  generateEslip(payload) {
    return this.http.post(
      `${environment.baseurl}generateInvoiceeslip`,
      payload
    );
  }
  getMyInvoiceEslips(payload) {
    return this.http.post(`${environment.baseurl}getMyInvoiceEslips`, payload);
  }

  getInvoiceEslipBills(payload) {
    return this.http.post(
      `${environment.baseurl}getInvoiceEslipBills`,
      payload
    );
  }
  getInvoiceEslipInfo(payload) {
    return this.http.post(`${environment.baseurl}getInvoiceEslipInfo`, payload);
  }

  InvoiceEslipAccounts(payload) {
    return this.http.post(
      `${environment.baseurl}InvoiceEslipAccounts`,
      payload
    );
  }

  InvoiceEslipPdfReport(payload) {
    return this.http.post(
      `${environment.baseurl}InvoiceEslipPdfReport`,
      payload,
      { responseType: 'blob' }
    );
  }

  payerSetPolicyMapping(payload) {
    return this.http.post(
      `${environment.baseurl}payerSetPolicyMapping`,
      payload
    );
  }

  getBillerDepartments(payload) {
    return this.http.post(
      `${environment.baseurl}getBillerDepartments`,
      payload
    );
  }

  payerGetPolicyMapping(payload) {
    return this.http.post(
      `${environment.baseurl}payerGetPolicyMapping`,
      payload
    );
  }

  payerUploadCheckOffPolicy(payload) {
    return this.http.post(
      `${environment.baseurl}payerUploadCheckOffPolicy`,
      payload
    );
  }
  payerProceedPolicy(payload) {
    return this.http.post(
      `${environment.baseurl}payerProceedPolicy`,
      payload
    );
  }

  payerGetMyPolicies(payload) {
    return this.http.post(
      `${environment.baseurl}payerGetMyPolicies`,
      payload
    );
  }

  getPolicyFileData(payload) {
    return this.http.post(
      `${environment.baseurl}getPolicyFileData`,
      payload
    );
  }

  payerUploadUmbrellaPolicy(payload) {
    return this.http.post(
      `${environment.baseurl}payerUploadUmbrellaPolicy`,
      payload
    );
  }

  generateEslipPolicy(payload) {
    return this.http.post(
      `${environment.baseurl}generateEslipPolicy`,
      payload
    );
  }

  payerGetBillerCheckoffPolicy(payload) {
    return this.http.post(
      `${environment.baseurl}payerGetBillerCheckoffPolicy`,
      payload
    );
  }




}
