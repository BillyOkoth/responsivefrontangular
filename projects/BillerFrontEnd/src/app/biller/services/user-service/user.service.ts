import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import { CompanyUsers, GetGroup, FreezeUser, UpdateTeam, TeamMember, AddGroup, Menus, MenuGroup, DeleteUserGroup, updatePayerProfile, resendInvite, menuListGroup } from './user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  brandColor = '';
  colorString = '';
  brandImage: any;
  FirstName = ' ';
  LastName = ' ';
  EmailAddress = ' ';
  CompanyName = ' ';

  private firstName = new BehaviorSubject<any>(true);
  cast = this.firstName.asObservable();

  fetchTeamsSubject = new BehaviorSubject<any>(true);


  constructor(private http: HttpClient) { }


  updateFirstName(newName) {

    this.firstName.next(newName);

  }

  getCompanyUsers(payload: CompanyUsers) {
    return this.http.post(`${environment.baseurl}getCompanyUsers`, payload);
  }

  getMyGroup(payload: GetGroup) {
    return this.http.post(`${environment.baseurl}getMyGroups`, payload);
  }

  freezeUser(payload: FreezeUser) {
    return this.http.post(`${environment.baseurl}freezeUser`, payload);
  }

  restoreUser(payload: FreezeUser) {
    return this.http.post(`${environment.baseurl}restoreUser`, payload);
  }

  updateTeamMembers(payload: UpdateTeam) {
    return this.http.post(`${environment.baseurl}updateMyTeam`, payload);
  }

  createNewTeam(payload: TeamMember) {
    return this.http.post(`${environment.baseurl}addCompanyUser`, payload);
  }

  addGroup(payload: AddGroup) {
    return this.http.post(`${environment.baseurl}addGroup`, payload);
  }

  getMenus(payload: Menus) {
    return this.http.post(`${environment.baseurl}getMenues`, payload);
  }

  addMenuGroup(payload: MenuGroup) {
    return this.http.post(`${environment.baseurl}addMenuToGroup`, payload);
  }

  deleteUserGroup(payload: DeleteUserGroup) {
    return this.http.post(`${environment.baseurl}deleteUserGroup`, payload);
  }

  resendEmail(payload: resendInvite) {
    return this.http.post(`${environment.baseurl}resendInvite`, payload);
  }

  menuGroup(payload: menuListGroup) {
    return this.http.post(`${environment.baseurl}getMenuForGroup`, payload);
  }

  updatePayerProfile(payload: updatePayerProfile) {
    return this.http.post(`${environment.baseurl}updatePayerProfile`, payload);
  }

  RejectaddBankGroup(payload) {
    return this.http.post(`${environment.baseurl}RejectaddBankGroup`, payload);
  }

  RejectdeleteBankGroup(payload) {
    return this.http.post(`${environment.baseurl}RejectdeleteBankGroup`, payload);
  }

  getTeamPayer(payload) {
    return this.http.post(`${environment.baseurl}billerGetTeamToPayerList`, payload);
  }
}
