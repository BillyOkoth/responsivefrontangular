import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Billers,
  CountBillers,
  Token,
  Delete,
  DeleteResponse,
  ViewAPayer,
  UpgradeToBiller,
  Team,
  GetGroup,
  AddGroup,
  EditUser,
  UploadExcel,
  BillerPayer,
  FileExcel,
  EslipBank,
  EslipInfo,
  BankGroup,
  MenuGroup,
  DeleteGroup,
  UploadAccounts
} from './billers.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
// import { getGroup } from 'projects/BillerFrontEnd/src/app/service/login.model';

@Injectable({
  providedIn: 'root'
})
export class BillersService {

  updateDeletedGroupSubject = new BehaviorSubject<any>(true);
  updateNewGroupSubject = new BehaviorSubject<any>(true);
  updateEditedGroupSubject = new BehaviorSubject<any>(true);
  updateBillerSubject = new BehaviorSubject<any>(true);
  pendingBillerSubject = new BehaviorSubject<any>(true);
  approveeditedBillerSubject = new BehaviorSubject<any>(true);
  approveDeletedBillerSubject = new BehaviorSubject<any>(true);
  fetchGroupSubject = new BehaviorSubject<any>(true);
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  progress = '';
  validated = '';
  total = '';
  created_at = '';
  file_name = '';
  pending = '';
  file_id = '';

  activeBillerLists: any;
  selectedTab = 0;
  pendingBiller = '';
  pendingBillerCode = 0;

  selectedBillerCode;
  selectedPayerCode;

  selectedFileName;
  selectedFileId: string;
  selectedEslipNo;

  activeBillersFn() {
    // set to environment
    return this.http.get(`${environment.baseurl}bill/allTotalActive`);
  }

  // getNoEnabledBillers
  loadActiveBillers(payload: Token): Observable<Billers[]> {
    return this.http.post<Billers[]>(
      `${environment.baseurl}getActiveBillers`,
      payload
    );
  }

  loadInactiveBillers(): Observable<Billers[]> {
    return this.http.get<Billers[]>(
      `${environment.baseurl}getNoEnabledBillers`
    );
  }

  loadInvitedBillers(payload: Token): Observable<Billers[]> {
    return this.http.post<Billers[]>(
      `${environment.baseurl}getInvitedBillers`,
      payload
    );
  }

  loadPendingBillers(payload: Token): Observable<Billers[]> {
    return this.http.post<Billers[]>(
      `${environment.baseurl}getPendingBillers`,
      payload
    );
  }

  allBillersFn(): Observable<CountBillers> {
    return this.http.get<CountBillers>(`${environment.baseurl}countAllBillers`);
  }

  // delete invited billers

  deleteInvitedBillers(payload: Delete): Observable<DeleteResponse> {
    return this.http.post<DeleteResponse>(`${environment.baseurl}`, payload);
  }

  viewABiller(biller_code) {
    const payload = {
      biller_code
    };
    return this.http.post(`${environment.baseurl}viewBillerProfile`, payload);
  }
  viewAPayer(payload: ViewAPayer) {
    return this.http.post(`${environment.baseurl}payerDetails`, payload);
  }

  approveBiller(payload: UpgradeToBiller) {
    return this.http.post(
      `${environment.baseurl}approvePendingBillers`,
      payload
    );
  }

  registerUser(payload: Team) {
    return this.http.post(`${environment.baseurl}createBankUser`, payload);
  }

  // getBankUserGroup

  getBankUserGroup(payload: GetGroup) {
    return this.http.post(`${environment.baseurl}getBankUserGroup`, payload);
  }

  // addEditBankUserGroup

  addBankUserGroup(payload: AddGroup) {
    return this.http.post(`${environment.baseurl}addBankUserGroup`, payload);
  }

  // getBankUsers

  getBankUsers(payload: GetGroup) {
    return this.http.post(`${environment.baseurl}getBankUsers`, payload);
  }

  /// edit BankUsers.

  editBankUsers(payload: EditUser) {
    return this.http.post(`${environment.baseurl}editBankUsers`, payload);
  }

  // get list of payers and billers

  getPayerBiller(payload: GetGroup) {
    return this.http.post(`${environment.baseurl}getUsers`, payload);
  }

  // get uploaded FIles by the  bank.

  getUploadedFileBank(payload: GetGroup) {
    return this.http.post(`${environment.baseurl}getUploadedFileBank`, payload);
  }

  // Query the uploaded files by the bank.

  uploadAccountsBank(payload: UploadExcel) {
    return this.http.post(
      `${environment.baseurl}uploadAccountsEslipBank`,
      payload
    );
  }

  // get the accounts queryed per biller.

  getAccountsBank(payload: BillerPayer) {
    return this.http.post(`${environment.baseurl}getAccountsBank`, payload);
  }

  // get the files uploaded.

  getUploadedFilesRecords(payload: FileExcel) {
    return this.http.post(
      `${environment.baseurl}getUploadedFilesRecords`,
      payload
    );
  }

  // generate eslips by the bank

  generateEslipBank(payload: EslipBank) {
    return this.http.post(`${environment.baseurl}generateEslipBank`, payload);
  }

    // generate eslips by the bank

    getEditedBankUser(payload) {
      return this.http.post(`${environment.baseurl}getEditedBankUsers`, payload);
    }


  // get eslip info

  getEslipInfo(payload: EslipInfo) {
    return this.http.post(`${environment.baseurl}getEslipInfo`, payload);
  }

  // get bank menus
  getBankMenus(payload: GetGroup): Observable<any[]> {
    return this.http.post<any[]>(`${environment.baseurl}getBankMenues`, payload).pipe(map(response => response.map((value: any) => {
      const rolee = {selected: false, rolee: [{role: 'view', status: false} , { role: 'all', status: false }] };
      return Object.assign(rolee, value);

    })));
  }

  // add bank group
  addBankGroup(payload: BankGroup) {
    return this.http.post(`${environment.baseurl}addBankGroup`, payload);
  }

  // get bank groups
  getBankGroups(payload: GetGroup) {
    return this.http.post(`${environment.baseurl}getBankGroups`, payload);
  }

  // get all eslips bank
  getAllBillerEslipsBank(payload: GetGroup) {
    return this.http.post(
      `${environment.baseurl}getAllBillerEslipsBank`,
      payload
    );
  }

  getEditedBiller(payload) {
    return this.http.post(
      `${environment.baseurl}getEditedBiller`,
      payload
    );
  }

  // get all eslips bank
  addbankMenuToGroup(payload: MenuGroup) {
    return this.http.post(`${environment.baseurl}addbankMenuToGroup`, payload);
  }

  // delete all eslips bank
  deleteBankGroup(payload: DeleteGroup) {
    return this.http.post(`${environment.baseurl}deleteBankGroup`, payload);
  }

  // delete all eslips bank
  getBankMenuForGroup(payload: DeleteGroup) {
    return this.http.post(`${environment.baseurl}getBankMenuForGroup`, payload);
  }

  // upload accounts
  uploadExceBankAccounts(payload: UploadAccounts) {
    return this.http.post(
      `${environment.baseurl}uploadExceBankAccounts`,
      payload
    );
  }

  // getMyUploadedFilesBank

  getMyUploadedFilesBank(payload: GetGroup) {
    return this.http.post(
      `${environment.baseurl}getMyUploadedFilesBank`,
      payload
    );
  }



  getAllUsersFromBankside(payload) {
    return this.http.post(

      `${environment.baseurl}getAllUsersFromBankside`,
      payload
    );
  }

  getBiller(payload) {
    return this.http.post(`${environment.baseurl}getBiller`, payload);
  }

  updateBiller(payload) {
    return this.http.post(`${environment.baseurl}updateBiller`, payload);
  }


  deleteBiller(payload) {
    return this.http.post(

      `${environment.baseurl}deleteBiller`,
      payload
    );
  }

  RejectdeleteBiller(payload) {
    return this.http.post(

      `${environment.baseurl}RejectdeleteBiller`,
      payload
    );
  }
  rejectNewBiller(payload) {
    return this.http.post(

      `${environment.baseurl}rejectNewBiller`,
      payload
    );
  }
  RejectEditedBiller(payload) {
    return this.http.post(

      `${environment.baseurl}RejectEditedBiller`,
      payload
    );
  }
  ApprovedeleteBiller(payload) {
    return this.http.post(

      `${environment.baseurl}ApprovedeleteBiller`,
      payload
    );
  }

  // bank groups

  RejectaddBankGroup(payload) {
    return this.http.post(

      `${environment.baseurl}RejectaddBankGroup`,
      payload
    );
  }
  RejectdeleteBankGroup(payload) {
    return this.http.post(

      `${environment.baseurl}RejectdeleteBankGroup`,
      payload
    );
  }
  rejectEditingGroup(payload) {
    return this.http.post(

      `${environment.baseurl}rejectEditingGroup`,
      payload
    );
  }


}
