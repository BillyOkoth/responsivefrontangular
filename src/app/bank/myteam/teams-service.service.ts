import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {


  fetchDeletedUserSubject = new BehaviorSubject<any>(true);
  fetchEditedUserSubject = new BehaviorSubject<any>(true);
  fetchInvitedTeamSubject = new BehaviorSubject<any>(true);
  fetchTeamSubject = new BehaviorSubject<any>(true);
  fetchActiveTeamSubject = new BehaviorSubject<any>(true);
  fetchInActiveTeamsSubject = new BehaviorSubject<any>(true);
  serviceTab: any;
  userGroup: any;

  constructor(private http: HttpClient) { }

  updateUser(payload) {
    return this.http.post(`${environment.baseurl}editBankUsers`, payload);
  }

  freezeUser(payload) {
    return this.http.post(`${environment.baseurl}freezeBankUser`, payload);
  }

  restoreUser(payload) {
    return this.http.post(`${environment.baseurl}restoreBankUser`, payload);
  }

  approveBankUser(payload) {
    return this.http.post(`${environment.baseurl}approveBankUser`, payload);
  }

  deleteBankUser(payload) {
    return this.http.post(`${environment.baseurl}deleteBankUser`, payload);
  }
  rejectBankUser(payload) {
    return this.http.post(`${environment.baseurl}rejectBankUser`, payload);
  }

  rejectCreatedBankUser(payload) {
    return this.http.post(`${environment.baseurl}rejectCreatedBankUser`, payload);
  }

  RejectdeleteBankUser(payload) {
    return this.http.post(`${environment.baseurl}RejectdeleteBankUser`, payload);
  }

  RejectEditedBankUsers(payload) {
    return this.http.post(`${environment.baseurl}RejectEditedBankUsers`, payload);
  }
}
