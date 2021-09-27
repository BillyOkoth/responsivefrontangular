export class GetBillerProfile {}

export class InvitePayer {
  email: string;
}

export class GetAllMyPayers {}

export class UploadPayer {
  base64Excel: string;
  billing_id: string;
}
export interface changePassword {
  currentPassword: string;
  newPassword: string;
}
