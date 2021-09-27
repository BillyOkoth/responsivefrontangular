export interface Billers {
  id: number;
  fname: string;
  company_name: string;
  lname: string;
}

export interface CountBillers {
  Active: string;
  Invited: string;
  Pending: string;
}

export class Token { }

export interface Delete {
  biller_code: string;
}

export interface DeleteResponse {
  fnmae: string;
  messageCode: string;
  message: string;
}

export class ViewAPayer {
  payerNo: string;
}

export class UpgradeToBiller {
  companyCode: any;
}

export class Team {
  surname: string;
  group_id: string;
  otherName: string;
  username: string;
  email: string;
  phone: string;
}

export interface GetGroup { }

export interface AddGroup {
  groupName: string;
}

export interface EditUser {
  otherName: string;
  phone: string;
  email: string;
  userGroup: string;
  username: string;
  surname: string;
  group_id: string;
}

export interface UploadExcel {
  base64Excel: string;
  payer_code: string;
  biller_code: string;
  typeOfupload: string;
  file_name: string;
}

export interface BillerPayer {
  biller_code: string;
  payer_code: string;
}

export interface FileExcel {
  file_id: string;
}

export interface EslipBank {
  payer_code: string;
  biller_code: string;
  file_id: string;
}

export interface EslipInfo {
  eslip_no: string;
}

export interface BankGroup {
  name: string;
}

export interface MenuGroup {
  groupId: string;
  groupName: string;
  menuItems: any;
}
export interface DeleteGroup {
  group_id: string;
}
export interface UploadAccounts {
  biller_code: string;
  payer_code: string;
  base64Excel: string;
  typeOfupload: string;
}
