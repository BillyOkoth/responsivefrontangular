import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EslipsService {
  eslip_no: string;
  amount_to_pay: string;
  file_id: string;
  file_name: string;
  path: any;
  accountsSelected: any;
  failedAccount: any;
  pendingCharges: any;
  selectedTab: any;
  serviceTab: any;

  eslipnumber = '';
  dateCreated = '';
  ref = '';
  ftnumber = '';
  amountFt = '';

  fetchRestoreExceptions = new BehaviorSubject<any>(true);
  fetchExceptions = new BehaviorSubject<any>(true);
  fetchPendingCharges = new BehaviorSubject<any>(true);

  constructor(private http: HttpClient) { }

  fetchEslips(payload) {
    return this.http.post(`${environment.baseurl}getAllEslipService`, payload);
  }



  getEslipInfo(payload) {
    return this.http.post(`${environment.baseurl}getEslipInfo`, payload);
  }

  downloadEslip(payload) {
    return this.http.post(`${environment.baseurl}eslipPdfReport`, payload, {
      responseType: 'blob'
    });
  }

  eslipViewPdfReport(payload) {
    return this.http.post(`${environment.baseurl}eslipViewPdfReport`, payload, {
    });
  }




  getEslipAccounts(payload) {
    return this.http.post(`${environment.baseurl}EslipAccounts`, payload);
  }

  getUploadedFilesRecords(payload) {
    return this.http.post(
      `${environment.baseurl}getUploadedFilesRecords`,
      payload
    );
  }

  uploadFile(payload) {
    return this.http.post(
      `${environment.baseurl}uploadExceBankAccounts`,
      payload
    );
  }

  generateEslipAuto(payload) {
    return this.http.post(
      `${environment.baseurl}generateBankEslipAuto`,
      payload
    );
  }

  getEslipReports(payload) {
    return this.http.post(`${environment.baseurl}eslipReport`, payload);
  }
  getExceptions(payload) {
    return this.http.post(`${environment.baseurl}getExceptionOwners`, payload);
  }

  getExceptionLogs(payload) {
    return this.http.post(`${environment.baseurl}getExceptionLogs`, payload);
  }

  restorePayment(payload) {
    return this.http.post(`${environment.baseurl}restorePayment`, payload);
  }

  payEslip(payload) {
    return this.http.post(`${environment.baseurl}payEslip`, payload);
  }
  rejectEslip(payload) {
    return this.http.post(`${environment.baseurl}rejectEslip`, payload);
  }

  approveEslip(payload) {
    return this.http.post(`${environment.baseurl}approveEslip`, payload);
  }

  getReconcileReports(payload) {
    return this.http.post(
      `${environment.baseurl}eslipReconcileReport`,
      payload
    );
  }

  ignoreExceptionLogs(payload) {
    return this.http.post(`${environment.baseurl}ignoreExceptionLogs`, payload);
  }
  validateEslip(payload) {
    return this.http.post(`${environment.baseurl}validateEslip`, payload);
  }
  rejectPayment(payload) {
    return this.http.post(`${environment.baseurl}rejectPayment`, payload);
  }

  receiptPdf(payload) {
    return this.http.post(`${environment.baseurl}receiptPdf`, payload, {
      responseType: 'blob'
    });
  }

  FailedPaidEslips(payload) {
    return this.http.post(`${environment.baseurl}FailedPaidEslips`, payload, {

    });
  }

  PayFailedPaidEslips(payload) {
    return this.http.post(`${environment.baseurl}PayFailedPaidEslips`, payload, {

    });
  }

  getPendingServiceCharge(payload) {
    return this.http.post(`${environment.baseurl}getPendingServiceCharge`, payload);
  }

  getPaidServiceCharge(payload) {
    return this.http.post(`${environment.baseurl}getPaidServiceCharge`, payload);
  }

  getServiceChargeDetails(payload) {
    return this.http.post(`${environment.baseurl}getServiceChargeDetails`, payload);
  }

  updateServiceCharge(payload) {
    return this.http.post(`${environment.baseurl}updateServiceCharge`, payload);
  }


  getBankOldReport(payload) {
    return this.http.post(`${environment.baseurl}getBankOldReport`, payload);
  }


  getMyOldReportDeatils(payload) {
    return this.http.post(`${environment.baseurl}getMyOldReportDeatils`, payload);
  }





}
