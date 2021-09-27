import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {
  UpdateAlias,
  DeleteAccount,
  DeleteMultiple,
  DownloadEslip,
} from './my-accounts.model';

@Injectable({
  providedIn: 'root',
})
export class MyAccountsService {

  private firstName =  new BehaviorSubject<any>(true);
               cast =  this.firstName.asObservable();

  fetchEslipSubject = new BehaviorSubject<any>(true);
  fetchUpdateProfile = new BehaviorSubject<any>(true);
  fetchAccountsSubject = new BehaviorSubject<any>(true);
  fetchTeamsSubject  =  new BehaviorSubject<any>(true);

  selectedAccounts = [];

  constructor(private http: HttpClient) {}

  updateFirstName(newName) {

    this.firstName.next(newName);

  }

  updateAccountAlias(payload: UpdateAlias) {
    return this.http.post(`${environment.baseurl}updateAccountAlias`, payload);
  }

  deleteAccount(payload: DeleteAccount) {
    return this.http.post(`${environment.baseurl}payerDeleteAccount`, payload);
  }

  deleteMultipleAccounts(payload: DeleteMultiple) {
    return this.http.post(`${environment.baseurl}deleteMultiple`, payload);
  }

  downloadEslip(payload: DownloadEslip) {
    return this.http.post(`${environment.baseurl}eslipPdfReport`, payload, {responseType: 'blob'});
  }
}
