import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  oddCentAccount;
  oddCentsFound;
  oddCentAmount;
  zeroValuesLength: number;
  accountInEslip: any;
  selectedTab: any;
  paymentFileAmount: number;
  selectedPayerCode: string;
  selectedBillerCode: string;
  selectedAccounts: any[];
  path: any;
  accountsSelected: any;
  failedAccount: any;
  accountName: any;
  account_no: any;
  file_id: string;
  file_name: string;
  biller_code: any;
  showBackgroundShadow: boolean;

  constructor(private http: HttpClient) {}

  fetchAccounts(payload) {
    return this.http
      .post(`${environment.baseurl}getPayerAccountsFromBankside`, payload)
      .pipe(
        map((response: any) =>
          response.map((value: any) => {
            let amount_due = parseFloat(value.amount_due);

            if (amount_due < 0) {
              amount_due = 0;
            }

            const newField = {
              amount_to_pay: amount_due.toString()
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

  // get expired eslips
  getExpiredEslipbank(payload) {
    return this.http.post(`${environment.baseurl}getExpiredEslipbank`, payload);
  }
  /// getting all the eslips
  getAllEslipsBank(payload) {
    return this.http.post(`${environment.baseurl}getAllEslipsBank`, payload);
  }
  validateAccount(payload) {
    return this.http.post(`${environment.baseurl}fetchBills`, payload);
  }

  saveAccount(payload) {
    return this.http.post(
      `${environment.baseurl}addBillingAccountBank`,
      payload
    );
  }

  fetchUploadedFiles(payload) {
    return this.http.post(
      `${environment.baseurl}getBankUploadedFiles`,
      payload
    );
  }

  generateEslip(payload) {
    return this.http.post(`${environment.baseurl}generateEslipBank`, payload);
  }
// line 83
  fetchAllUsers(payload) {
    return this.http.post(
      `${environment.baseurl}getAllUsersFromBankside`,
      payload
    );
  }

  getAccountReports(payload) {
    return this.http.post(`${environment.baseurl}accountReport`, payload);
  }

  getUploadedFilesRecords(payload) {
    return this.http.post(
      `${environment.baseurl}getUploadedFilesRecords`,
      payload
    );
  }

  getPayersPerBiller(payload) {
    return this.http.post(
      `${environment.baseurl}getAllPayersFromBankside`,
      payload
    );
  }
}
