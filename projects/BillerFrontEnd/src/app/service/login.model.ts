// model for  loging in

export class LoginBiller {
  email: string;
  password: string;
}

export class LoginResponse {
  messageCode: string;

  user_type: string;
  biller_type: string;
  loginvalue: string;
  companyCode: string;
}

// model for registration of the biller
export class RegisterBiller {
  company_name: string;
  fname: string;
  lname: string;
  password: string;
  biller_phone: string;
}

export class emailSend {
  email: string;
}

export class RegisterBillerResponse {
  messageCode: string;
}

export class EmailCode {
  email: string;
}
export class payerProfile {}

export class updateInvoice {
  invoice_name: string;
  invoice_color: string;
  terms: string;
}

export class updateInvoiceResponse {
  messageCode: string;
  message: string;
}

export class updateProfile {
  company_name: string;
  biller_phone: string;
  business_description: string;
  biller_location: string;
}

export class UpdateProfileResponse {
  messageCode: string;
  message: string;
}

export class payerProfileResponse {
  biller_location: string;
  biller_month: string;
  biller_phone: string;
  branch: string;
  business_description: string;
  comp_code: number;
  company_name: string;
  country: string;
  email: string;
  employee_no: string;
  id: number;
  is_enabled: null;
  personel_f_name: string;
  personel_l_name: string;
  sector: string;
  stb_acc_name: string;
  stb_acc_no: number;

  user_type: string;
}

// model dealing with the activation page

export class ConfirmBiller {}

export class ConfirmationBillerResponse {
  messageCode: string;
  message: string;

  fname: string;
  email: string;
}

export class ResetPassword {
  password: string;
}

export class ResetResponse {
  emailId: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
}

/// changing password model
export class Model {
  password: string;
  confirmPassword: string;
}

export class ChangePassword {
  password: string;
}

export class ChangePasswordResponse {
  emailId: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
}

// invoice logo image
export class SaveInvoice {
  base64Logo: string;
}
export class SaveInvoiceResponse {
  messageCode: string;
  message: string;
  base64Logo: string;
}

// fetching the invoice logo
export class FetchInvoice {}

export class FetchInvoiceResponse {
  messageCode: string;
  message: string;

  base64Logo: string;
}

export class sendTestInvoice {
  title: string;

  message: string;
}

export class sendTestInvoiceResponse {
  message: string;
  messageCode: string;
  fname: string;
}

export class InvoiceSettingsResponse {
  id: number;
  comp_code: string;
  logo_url: String;
  invoice_color: string;
  invoice_name: string;

  terms: string;
}

export class Terms {
  terms: string;
}
export class TermsResponse {
  messageCode: string;
}

/// model for querying bills.

export class Bill {
  accountRefNo: string;
  billerCode: string;
}

export class BillResponse {
  accountRefNo: string;
  billDescription: string;
  billBalance: string;
  dueDate: string;
  otherInfomation: string;
  responseCode: string;
  responseMessage: string;
  messageCode: string;
  message: string;
}

// model for active billers
export class Token {}

export interface Billers {
  id: number;
  fname: string;
  company_name: string;
  lname: string;
  biller_code: string;
}

// model response for getting my billers

export class myBillersResponse {
  payer_code: string;
  biller_code: string;
  name: string;
  messageCode: string;
}

/// model for getting accounts

export class payerAccounts {
  biller_code: string;
}

export class payerAccountsResponse {
  messageCode: string;

  biller_code: string;
  payer_code: string;
  message: string;
  account_no: string;
  amount_due: string;
}

// billing account model

export class BillingAccount {
  biller_code: string;
  accountInfo: any;
}

// billing account response

export class BillingAccountResponse {
  messageCode: string;
  message: string;
}

export interface Eslip {
  biller_code: string;
  total_amount_due: string;
  total_amount_to_pay: string;
  // due_date:string;
  eslipInfo: any;
  //      eslipInfo: [
  //       SlipInfo
  //  ]
}

export interface SlipInfo {
  account_no: string;
  amount_due: string;
  amount_to_pay: string;
}

export class EslipResponse {
  messageCode: string;

  eslip_no: string;
  message: string;
}

// fetch accounts
export class AccountDetailsReq {
  accountRefNo: string;
  billerCode: string;
}

// save to accounts

export class SaveAccount {
  account_name: string;
  amount_due: string;
  due_date: string;
  account_no: string;
  alias: string;
}

// csv records
export class CSVRecord {
  account: string;
}

// Excel Upload

export interface Excel {
  file_name: string;

  biller_code: string;
  base64Excel: any;
  typeOfupload: string;
}

export interface ExcelResponse {
  message: string;
  messageCode: string;
}

export interface getMyUploadedFiles {
  biller_code: string;
}

export interface getMyUploadedFilesResponse {
  messageCode: string;
  message: string;
  biller_code: string;
  created_at: string;
  file_id: string;
  file_name: string;
  payer_code: string;
  pending: string;
  total: string;
  validated: string;
  progress: string;
}

export interface getUploadedFilesRecords {
  file_id: string;
}

export interface Team {
  employeeCode: string;
  group_id: string;
  national_id: string;
  personel_l_name: string;
  personel_f_name: string;
  email: string;
  phone: string;
  name: string;
}

export interface getMyTeam {}

export interface updateMyTeam {
  group_id: string;
  personel_l_name: string;
  personel_f_name: string;
  email: string;
  id: string;
}

export interface addGroup {
  name: string;
}

export interface getGroup {}

export interface EslipAc {
  eslip_no: string;
}

export interface menus {}

export interface EslipAuto {
  path: string;
  biller_code: string;
  account_to_add: string;
  oddcent: string;
}

export interface EmailReset {
  email: string;
}

export interface menuGroup {
  groupId: string;
  groupName: string;
  menuItems: any;
  companyCode: string;
  users: any;
}

export interface menuListGroup {
  companyCode: string;
}

export interface Reset {
  password: string;
}

export interface changePassword {
  currentPassword: string;
  newPassword: string;
}

export interface updatePayerProfile {
  personel_f_name: string;
  personel_l_name: string;
  email: string;
  company_name: string;
  biller_phone: string;
}

export interface freezeUser {
  email: string;
}

export interface deleteUserGroup {
  id: string;
}

export interface resendInvite {
  email: string;
}
