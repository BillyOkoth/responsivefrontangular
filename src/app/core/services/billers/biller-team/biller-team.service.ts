import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillerTeamService {
  constructor(private http: HttpClient) {}

  getBillerTeamMembers(payload) {
    return this.http.post(`${environment.baseurl}getBillersTeam`, payload);
  }

  addTeamMember(payload) {
    return this.http.post(`${environment.baseurl}BankaddCompanyUser`, payload);
  }

  getUserGroups(payload) {
    return this.http.post(`${environment.baseurl}getBillerGroups`, payload);
  }
}
