// StepOne
export class StepOne {
  company_name: string;
  email: string;
  biller_phone: number;
  biller_location: string;
  personelFirstname: string;
  personelLastname: string;

  alias: string;
}

export class PostStepTwo {
  id: string;

  sector: string;
}
export class StepTwo {
  id: string;
}
export class StepThree {
  employee_no: string;
  business_description: string;

  id: string;
}

export class StepFour {
  id: string;

  country: string;
  branch: string;
  stb_acc_name: string;
  stb_acc_no: string;
}

export class StepFive {
  billers_month: string;
  id: string;

  service_charge: string;
  biller_type: string;
  prefix: string;
}
// Responses.


export class CountryPayload {
  countryCode: string;
  countryName: string;
}

export class CountryPayloadResponse {
  countryCode: string;
  countryName: string;

}


export class DeleteCountryPayload {
  countryCode: string;
  countryName: string;
}

export class DeleteCountryPayloadResponse {
  countryCode: string;
  countryName: string;

}

export class StepOneResponse {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
  id: number;
  company_name: string;
  biller_location: string;
  email: string;
  biller_phone: number;
  personelFirstname: string;
  personelLastname: string;
  sector: null;
  employee_no: null;
  business_description: null;
  account_yn: null;
  stb_acc_name: null;
  stb_acc_no: null;
  billers_month: null;
}
export class StepTwoResponse {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
  id: string;
  company_name: string;
  biller_location: string;
  email: string;
  biller_phone: number;
  reg_by: string;
  sector: string;
  messageCode: string;
  message: string;
}
export class StepThreeResponse {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  id: number;
  company_name: string;
  biller_location: string;
  email: string;
  biller_phone: number;
  reg_by: string;
  sector: string;
  employee_no: number;
  business_description: string;
  messageCode: string;
  message: string;
}
export class StepFourResponse {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  id: number;
  company_name: string;
  biller_location: string;
  email: string;
  biller_phone: number;
  reg_by: string;
  sector: string;
  employee_no: number;
  business_description: string;

  messageCode: string;
  message: string;
}

// email send response
export class EmailSend {
  email: string;
}

// branch and country model response
export class Country {
  id: string;
  countryCode: string;
  countryName: string;
}

export class Branches {
  countryCode: string;
}
export class BranchesResponse {
  id: string;
  counntryCode: string;
  branchCode: string;
  branchName: string;
}
export class ConfirmBiller {}

export class ConfirmationBillerResponse {
  userid: number;
  emailId: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
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

export interface Account {
  accountNumber: string;
}

export interface BillerModel {
  biller_location: string;
  biller_phone: string;
  company_name: string;
  personelFirstname: string;
  personelLastname: string;
  email: string;
  alias: string;
  sector: string;
  business_description: string;
  employee_no: string;
  stb_acc_name: string;
  stb_acc_no: string;
  branch: string;
  country: string;
  biller_month: string;
  service_charge: string;
  prefix: string;

  website: string;
  customer_care: string;
}
