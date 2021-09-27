import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import {
  GetBillerProfile,
  InvitePayer,
  GetAllMyPayers,
  UploadPayer,
  changePassword
} from './biller.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillerService {
  brand_color: string;
  eslipnumber = '';
  dateCreated = '';
  ref = '';
  ftnumber = '';
  amountFt = '';
  selectedSetting;
  payerSubject  =  new BehaviorSubject<any>(true);
  serviceLineSubject  =  new BehaviorSubject<any>(true);
  fetchInvoiceUpdateSubject  =  new BehaviorSubject<any>(true);
  uploadedInvoiceSeSubject  =  new BehaviorSubject<any>(true);
  fetchbillerSeSubject  =  new BehaviorSubject<any>(true);
  fetchInvitedSubject  =  new BehaviorSubject<any>(true);
  fetchTeamsSubject  =  new BehaviorSubject<any>(true);
  fetchInvoicesUpdateSubject = new BehaviorSubject<any>(true);
  fetchCommissionsUpdateSubject = new BehaviorSubject<any>(true);
  // fetchInvoicesPercentageSubject  =  new BehaviorSubject<any>(true);
  fetchExceptions = new BehaviorSubject<any>(true);
  selectedInvoiceTab: any;
  columns: any[];
  invoice_columns: any[];
  constructor(private http: HttpClient) {}

  getBillerProfile(payload: GetBillerProfile) {
    return this.http.post(`${environment.baseurl}getPayerProfile`, payload);
  }

  getInvoiceSettings(payload: any) {
    return this.http.post(`${environment.baseurl}getInvoiceSettings`, payload);
  }
  // updateInvoice

  updateInvoice(payload: any) {
    return this.http.post(`${environment.baseurl}updateInvoice`, payload);
  }
  createNewPayer(payload: InvitePayer) {
    return this.http.post(`${environment.baseurl}billerSendEmail`, payload);
  }

  deletePayer(payload) {
    return this.http.post(`${environment.baseurl}deletePayer`, payload);
  }

  getMyPayers(payload: GetAllMyPayers) {
    return this.http.post(`${environment.baseurl}getMyPayers`, payload);
  }
  resendInvitation(payload) {
    return this.http.post(`${environment.baseurl}resendInvitation`, payload);
  }


  viewAPayer(payload) {
    return this.http.post(`${environment.baseurl}payerDetails`, payload);
  }

  invitePayer(payload) {
    return this.http.post(`${environment.baseurl}acceptTobePayer`, payload);
  }

  uploadPayerFile(payload: UploadPayer) {
    return this.http.post(`${environment.baseurl}inviteMultiple`, payload);
  }

  changePassword(payload: changePassword) {
    return this.http.post(`${environment.baseurl}changePassword`, payload);
  }

  getMyEslipsBiller(payload: any) {
    return this.http.post(`${environment.baseurl}getMyEslipsBiller`, payload);
  }

  // get accounts
  getEslipAccounts(payload) {
    return this.http.post(`${environment.baseurl}EslipAccounts`, payload);
  }

  getExceptionLogs(payload) {
    return this.http.post(`${environment.baseurl}getExceptionLogsBiller`, payload);
  }
  payEslip(payload) {
    return this.http.post(`${environment.baseurl}payEslip`, payload);
  }
  approveEslip(payload) {
    return this.http.post(`${environment.baseurl}approveEslip`, payload);
  }

  getReconcileReports(payload) {
    return this.http.post(
      `${environment.baseurl}eslipReconcileReportBiller`,
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

  getEslipInfo(payload) {
    return this.http.post(`${environment.baseurl}getEslipInfo`, payload);
  }

  uploadInvoice(payload) {
    return this.http.post(`${environment.baseurl}uploadInvoice`, payload);
  }

  uploadInvoiceIndividual(payload) {
    return this.http.post(`${environment.baseurl}uploadInvoiceIndividual`, payload);
  }

  getUploadedInvoiceFiles(payload) {
    return this.http.post(`${environment.baseurl}getUploadedInvoiceFiles`, payload);
  }

  getInvoiceFileRecords(payload) {
    return this.http.post(`${environment.baseurl}getInvoiceFileRecords`, payload);
  }
  getInvoices(payload) {
    return this.http.post(`${environment.baseurl}getInvoices`, payload);
  }

  reSendInvoiceEmail(payload) {
    return this.http.post(`${environment.baseurl}reSendInvoiceEmail`, payload);
  }

  invoiceReport(payload) {
    return this.http.post(`${environment.baseurl}invoiceEslipReconcileReportBiller`, payload);
  }

  setCommisions(payload) {
    return this.http.post(`${environment.baseurl}setCommission`, payload);
  }
  // currency settings
  setForex(payload) {
    return this.http.post(`${environment.baseurl}setForex`, payload);
  }

  getForex(payload) {
    return this.http.post(`${environment.baseurl}getForex`, payload);
  }

  getCommission(payload) {
    return this.http.post(`${environment.baseurl}getCommission`, payload);
  }

  getColumns(payload) {
    return this.http.post(`${environment.baseurl}getFileSettings`, payload);
  }
  setColumns(payload) {
    return this.http.post(`${environment.baseurl}setFileSettings`, payload);
  }

  getMyPayerMapping(payload) {
    return this.http.post(`${environment.baseurl}getMyPayerMapping`, payload);
  }

  setMyPayerMapping(payload) {
    return this.http.post(`${environment.baseurl}setMyPayerMapping`, payload);
  }

  billerAddPayer(payload) {
    return this.http.post(`${environment.baseurl}billerAddpayer`, payload);
  }

  addDepartment(payload) {
    return this.http.post(`${environment.baseurl}addDepartment`, payload);
  }

  updateServiceLine(payload) {
    return this.http.post(`${environment.baseurl}updateServiceLine`, payload);
  }

}
