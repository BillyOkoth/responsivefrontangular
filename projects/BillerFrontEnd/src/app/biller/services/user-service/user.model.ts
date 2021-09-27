export class CompanyUsers {}

export class GetGroup {}

export class FreezeUser {
  email: string;
}

export class UpdateTeam {
  group_id: string;
  personel_l_name: string;
  personel_f_name: string;
  email: string;
  id: string;
}

export class TeamMember {
  employeeCode: string;
  group_id: string;
  national_id: string;
  personel_l_name: string;
  personel_f_name: string;
  email: string;
  phone: string;
}

export class GetMyGroups {}

export class AddGroup {
  name: string;
}

export interface Menus {}

export interface MenuGroup {
  groupId: string;
  groupName: string;
  menuItems: any;
  companyCode: string;
  users: any;
}

export interface DeleteUserGroup {
  id: string;
}

export interface updatePayerProfile {
  personel_f_name: string;
  personel_l_name: string;
  email: string;
  company_name: string;
}
export interface resendInvite {
  email: string;
}
export interface menuListGroup {
  companyCode: string;
}
