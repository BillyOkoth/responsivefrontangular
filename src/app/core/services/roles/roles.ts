import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RolesService {
    billerAllRoles;
    accountsRole;
    eslipRole;
    myTeamRole;
    reportRole;
    alertRole;
    serviceRole;
    exceptionRole;

    constructor(private http: HttpClient) { }

    approveDeletedUser(payload) {
      return this.http.post(`${environment.baseurl}ApproveDeleteBankUser`, payload);
    }

    approveEditedUser(payload) {
      return this.http.post(`${environment.baseurl}ApproveEditedBankUsers`, payload);
    }
    approveBankGroup(payload) {
      return this.http.post(`${environment.baseurl}ApproveaddBankGroup`, payload);
    }

    deleteBankGroup(payload) {
      return this.http.post(`${environment.baseurl}ApprovedeleteBankGroup`, payload);
    }

    approveNewBiller(payload) {
      return this.http.post(`${environment.baseurl}approveBiller`, payload);
    }
    approveEditingBiller(payload) {
      return this.http.post(`${environment.baseurl}approveEditeBiller`, payload);
    }

    approveEditingGroup(payload) {
      return this.http.post(`${environment.baseurl}approveEditingGroup`, payload);
    }

    ProceedAproval(payload) {
      return this.http.post(`${environment.baseurl}ProceedAproval`, payload);
    }
    proceedApproval(payload) {
      return this.http.post(`${environment.baseurl}ProceedAproval`, payload);
    }
}
