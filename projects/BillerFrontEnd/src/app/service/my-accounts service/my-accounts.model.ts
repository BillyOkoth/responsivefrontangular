export class UpdateAlias {
  account_no: string;
  alias: string;
}

export class DeleteAccount {
  biller_code: string;
  account_no: string;
}

export class DeleteMultiple {
  biller_code: string;

  accounts: any;
}

export class DownloadEslip {
  eslip_no: string;
}
