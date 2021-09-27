import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  LoginBiller,
  LoginResponse,
  RegisterBiller,
  payerProfile,
  RegisterBillerResponse,
  emailSend,
  EmailCode,
  updateProfile,
  updateInvoice,
  payerProfileResponse,
  UpdateProfileResponse,
  updateInvoiceResponse,
  ResetResponse,
  ResetPassword,
  ConfirmationBillerResponse,
  ConfirmBiller,
  SaveInvoice,
  SaveInvoiceResponse,
  FetchInvoice,
  FetchInvoiceResponse,
  sendTestInvoice,
  sendTestInvoiceResponse,
  InvoiceSettingsResponse,
  TermsResponse,
  Terms,
  Bill,
  BillResponse,
  Token,
  Billers,
  myBillersResponse,
  payerAccountsResponse,
  payerAccounts,
  BillingAccount,
  BillingAccountResponse,
  AccountDetailsReq,
  Eslip,
  EslipResponse,
  Excel,
  ExcelResponse,
  getMyUploadedFiles,
  getMyUploadedFilesResponse,
  getUploadedFilesRecords,
  Team,
  getMyTeam,
  updateMyTeam,
  addGroup,
  getGroup,
  EslipAc,
  menus,
  menuGroup,
  menuListGroup,
  EslipAuto,
  EmailReset,
  Reset,
  changePassword,
  updatePayerProfile,
  freezeUser,
  deleteUserGroup,
  resendInvite
} from './login.model';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  emailNotification = new BehaviorSubject<any>(true);
  colorString = '';
  tokenGlobal = '';
  invoiceColor = '';
  emailprofile = '';
  termsGlobal = '';
  userType = '';
  roadGlobal = '';
  globalCompnay = '';
  globalPhonenumber = '';
  globalCounty = '';
  notification = '';

  FirstName = '';
  LastName = '';
  EmailAddress = '';
  CompanyName = '';
  phoneNumber = '';

  theLogo = '';
  brand_color;

  // billQuery
  accountNumber = '';
  billDesc = '';
  billBal = '';
  billDueDate = '';
  otherInfo = '';
  responseCode = '';
  responseMessage = '';

  billerCode = '';
  createdBy = '';

  team_id = '';
  team_email = '';
  team_name = '';
  team_role = '';

  alert_sudo;

  testPercentage = '';
  brandThemePercentage = '';
  brandLogoPercentage = '';
  biller_code = ' ';
  created_at = ' ';
  file_id = ' ';
  file_name = ' ';
  payer_code = ' ';
  pending = ' ';
  total = ' ';
  validated = ' ';
  progress = ' ';
  companyCode = '';
  fileId;
  fileName;

  menuItem;

  // menus
  dashboard;
  myPayers = '';
  myAccount = '';
  invoices = '';
  eslipsGen = '';
  reports = '';
  myTeam = '';

  sendInvoicePercent;
  brandPercentage;
  companyPercentage;
  commissionPercentage;
  selectedTab;

  alertServ = '';

  selectedBiller: any;

  failedAccount: any;
  path: any;
  accountsSelected: any;
  accountName;
  zeroValuesLength;
  oddCentsFound = false;
  oddCentAccount = '';
  oddCentAmount = 0;
  paymentFileAmount = 0;
  accountInEslip;
  msgs = [];
  forexPercentage;
  showBackgroundShadow = false;
  selectedAccounts = [];

  isAuthenticated(): boolean {
    return sessionStorage.getItem('h-token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }

  loginBiller(payload: LoginBiller): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(
      `${environment.baseurl}billerLogin`,
      payload,
      { observe: 'response' }
    );
  }

  payerGetMyPolicies(payload: {}): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.baseurl}payerGetMyPolicies`,
      payload,
      { observe: 'response' });
  }

  simulatedLoginBiller(payload: {}): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(
      `${environment.baseurl}billerLogin`,
      payload,
      { observe: 'response' }
    );
  }
  // register the biller in to the system
  registerBiller(payload: RegisterBiller): Observable<RegisterBillerResponse> {
    return this.http.post<RegisterBillerResponse>(
      `${environment.baseurl}payerSignup`,
      payload
    );
  }
  emailSend(payload: emailSend): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}sendEmailPayer`, payload);
  }

  emailCode(payload: EmailCode): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}auth/code/add`, payload);
  }

  // approve biller
  acceptTobePayer(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.baseurl}acceptTobePayer`, payload);
  }

  /// services that communicate with the dashboard and the invoice component.

  // fetch the payer profile
  payerProfile(payload: payerProfile): Observable<payerProfileResponse> {
    return this.http.post<payerProfileResponse>(
      `${environment.baseurl}getPayerProfile`,
      payload
    );
  }

  // invoice settings of the user
  getInvoiceSettings(
    payload: payerProfile
  ): Observable<InvoiceSettingsResponse> {
    return this.http.post<InvoiceSettingsResponse>(
      `${environment.baseurl}getInvoiceSettings`,
      payload
    );
  }

  // updating the invoice settings
  updateInvoiceSettings(
    payload: updateInvoice
  ): Observable<updateInvoiceResponse> {
    return this.http.post<updateInvoiceResponse>(
      `${environment.baseurl}updateInvoiceSettings`,
      payload
    );
  }
  //  updating the user profile
  updateProfile(payload: updateProfile): Observable<UpdateProfileResponse> {
    return this.http.post<UpdateProfileResponse>(
      `${environment.baseurl}/updateProfile`,
      payload
    );
  }

  // activation of biller
  passwordReset(payload: ResetPassword): Observable<ResetResponse> {
    return this.http.post<ResetResponse>(
      `${environment.baseurl}biller/setPassword`,
      payload
    );
  }

  confirmBiller(
    payload: ConfirmBiller
  ): Observable<ConfirmationBillerResponse> {
    return this.http.post<ConfirmationBillerResponse>(
      `${environment.baseurl}getBillerFirstName`,
      payload
    );
  }

  saveInvoiceLogo(payload: SaveInvoice): Observable<SaveInvoiceResponse> {
    return this.http.post<SaveInvoiceResponse>(
      `${environment.baseurl}saveInvoiceLogo`,
      payload
    );
  }

  fetchInvoiceLogo(payload: FetchInvoice): Observable<FetchInvoiceResponse> {
    return this.http.post<FetchInvoiceResponse>(
      `${environment.baseurl}getInvoiceLogo`,
      payload
    );
  }

  sendTestInvoice(
    payload: sendTestInvoice
  ): Observable<sendTestInvoiceResponse> {
    return this.http.post<sendTestInvoiceResponse>(
      `${environment.baseurl}sendTestInvoice`,
      payload
    );
  }

  updateTerms(payload: Terms): Observable<TermsResponse> {
    return this.http.post<TermsResponse>(
      `${environment.baseurl}updateInvoiceTerms`,
      payload
    );
  }

  billQuery(payload: Bill): Observable<BillResponse> {
    return this.http.post<BillResponse>(
      `${environment.baseurl}fetchBills`,
      payload
    );
  }

  // Active Billers
  // getNoEnabledBillers
  loadActiveBillers(payload: Token): Observable<Billers[]> {
    return this.http.post<Billers[]>(
      `${environment.baseurl}getActiveBillers`,
      payload
    );
  }

  /// getting the list of my billers.
  loadMyBillers(payload: Token): Observable<myBillersResponse[]> {
    return this.http.post<myBillersResponse[]>(
      `${environment.baseurl}getMyBillers`,
      payload
    );
  }

  // getting the list of payer accounts
  loadPayerAccounts(
    payload: payerAccounts
  ): Observable<payerAccountsResponse[]> {
    return this.http
      .post<payerAccountsResponse[]>(
        `${environment.baseurl}getPayerAccounts`,
        payload
      )
      .pipe(
        map(response =>
          response.map((value: any) => {
            let amount_due = parseFloat(value.amount_due);
            const checked = false;

            if (amount_due < 0) {
              amount_due = 0;
            }

            const newField = {
              amount_to_pay: amount_due.toString(),
              checked: false
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

  // create new billing account!
  createBillingAccount(payload): Observable<BillingAccountResponse[]> {
    return this.http.post<BillingAccountResponse[]>(
      `${environment.baseurl}addBillingAccount`,
      payload
    );
  }

  // fetch account details on keyup
  fetchAccountDetails(payload: AccountDetailsReq) {
    return this.http.post(`${environment.baseurl}fetchBills`, payload);
  }

  // get eslip info


  getEslipInfo(payload) {
    return this.http.post(`${environment.baseurl}getEslipInfo`, payload);
  }

  eslipViewPdfReport(payload) {
    return this.http.post(`${environment.baseurl}eslipViewPdfReport`, payload);
  }

  generateEslip(payload: Eslip): Observable<EslipResponse[]> {
    return this.http.post<EslipResponse[]>(
      `${environment.baseurl}generateEslip`,
      payload
    );
  }

  // handling the csv files.

  handleCsv(payload: Excel): Observable<ExcelResponse[]> {
    return this.http.post<ExcelResponse[]>(
      `${environment.baseurl}uploadExcelAccounts`,
      payload
    );
  }

  // fetch uploaded files

  // fetchUploadFiles
  fetchUploadFiles(
    payload: getMyUploadedFiles
  ): Observable<getMyUploadedFilesResponse[]> {
    return this.http.post<getMyUploadedFilesResponse[]>(
      `${environment.baseurl}getMyUploadedFiles`,
      payload
    );
  }

  //

  getUploadedFilesRecords(payload: getUploadedFilesRecords): Observable<any[]> {
    return this.http.post<any[]>(
      `${environment.baseurl}getUploadedFilesRecords`,
      payload
    );
  }
  // get myeslips
  getMyEslips(payload) {
    return this.http.post(`${environment.baseurl}getMyEslips`, payload);
  }

   // get myeslips
   reValidate(payload) {
    return this.http.post(`${environment.baseurl}reValidateAccounts`, payload);
  }

  // fetch reports
  fetchReports(payload) {
    return this.http.post(`${environment.baseurl}getEslipReports`, payload);
  }

  // create new team member
  createNewTeam(payload: Team) {
    return this.http.post(`${environment.baseurl}addCompanyUser`, payload);
  }

  // get team members
  fetchTeamMembers(payload: getMyTeam) {
    return this.http.post(`${environment.baseurl}getMyTeam`, payload);
  }

  // update team members
  updateTeamMembers(payload: updateMyTeam) {
    return this.http.post(`${environment.baseurl}updateMyTeam`, payload);
  }

  uploadFile(payload) {
    return this.http.post(`${environment.baseurl}uploadExcelAccounts`, payload);
  }

  // service for posting the group name
  addGroup(payload: addGroup) {
    return this.http.post(`${environment.baseurl}addGroup`, payload);
  }

  // service for posting the group name
  getMyGroup(payload: getGroup) {
    return this.http.post(`${environment.baseurl}getMyGroups`, payload);
  }

  // get eslip accounr details.
  getEslipAccounts(payload: EslipAc) {
    return this.http.post(`${environment.baseurl}EslipAccounts`, payload);
  }

  // get menus
  getMenus(payload: menus) {
    return this.http.post(`${environment.baseurl}getMenues`, payload);
  }

  // get menus
  addMenuGroup(payload: menuGroup) {
    return this.http.post(`${environment.baseurl}addMenuToGroup`, payload);
  }

  viewBillers(payload) {
    return this.http.post(`${environment.baseurl}listOfBillers`, payload);
  }

  // get menu for groups
  menuGroup(payload: menuListGroup) {
    return this.http.post(`${environment.baseurl}getMenuForGroup`, payload);
  }

  // get menu for groups
  getCompanyUsers(payload: menus) {
    return this.http.post(`${environment.baseurl}getCompanyUsers`, payload);
  }

  // upload payments summary

  uploadPaymentsSummary(payload) {
    return this.http.post(
      `${environment.baseurl}getMyUploadedFilesAutoEslip`,
      payload
    );
  }

  // get payment details
  getPaymentDetails(payload) {
    return this.http.post(
      `${environment.baseurl}getUploadedFilesRecordsAuto`,
      payload
    );
  }

  // generate payment eslip
  generatePaymentEslip(payload) {
    return this.http.post(`${environment.baseurl}generateEslipAuto`, payload);
  }

  viewBillerProfile(payload) {
    return this.http.post(`${environment.baseurl}viewBillerProfile`, payload);
  }

  /// generate e slip frm the payment modal.

  generateEslipAuto(payload: EslipAuto) {
    return this.http.post(`${environment.baseurl}generateEslipAuto`, payload);
  }

  /// User enpoint to  email reset

  emailReset(payload: EmailReset) {
    return this.http.post(
      `${environment.baseurl}sendEmailResetPassword`,
      payload
    );
  }

  // endpoint for resetting password.

  resetPassword(payload: Reset) {
    return this.http.post(`${environment.baseurl}resetPassword`, payload);
  }

  // endpoint for changing the password.

  changePassword(payload: changePassword) {
    return this.http.post(`${environment.baseurl}changePassword`, payload);
  }

  // update my profile endpooint.

  updatePayerProfile(payload) {
    return this.http.post(`${environment.baseurl}updatePayerProfile`, payload);
  }

  /// freezing user

  freezeUser(payload: freezeUser) {
    return this.http.post(`${environment.baseurl}freezeUser`, payload);
  }

  // restoreUser
  restoreUser(payload: freezeUser) {
    return this.http.post(`${environment.baseurl}restoreUser`, payload);
  }

  // delete usergroup

  deleteUserGroup(payload: deleteUserGroup) {
    return this.http.post(`${environment.baseurl}deleteUserGroup`, payload);
  }

  // resending email to team member.

  resendEmail(payload: resendInvite) {
    return this.http.post(`${environment.baseurl}resendInvite`, payload);
  }

  // URL=/v1/getOtpCode

  getOtpCode(payload) {
    return this.http.post(`${environment.baseurl}getOtpCode`, payload);
  }

  verifyOtpCode(payload) {
    return this.http.post(`${environment.baseurl}verifyOtpCode`, payload);
  }

  resetOtpPassword(payload) {
    return this.http.post(`${environment.baseurl}resetOtpPassword`, payload);
  }

  updateNotificationSettings(payload) {
    return this.http.post(
      `${environment.baseurl}updateNotificationSettings`,
      payload
    );
  }
  receiptPdf(payload) {
    return this.http.post(
      `${environment.baseurl}receiptPdf`,
      payload, {
        responseType: 'blob'
      }
    );
  }
}
