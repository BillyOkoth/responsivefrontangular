import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { EslipsService } from 'src/app/core/services/eslips/eslips.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { RolesService } from 'src/app/core/services/roles/roles';

@Component({
  selector: 'app-eslip-accounts',
  templateUrl: './eslip-accounts.component.html',
  styleUrls: ['./eslip-accounts.component.css']
})
export class EslipAccountsComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;

  loading = false;
  generatedData = [];
  localData = [];

  Accountno;
  AccountName;
  AccountBalance;
  Validation;
  DateCreated;

  AccountsCount;
  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];

  fileId = '';
  fileName = '';
  EslipNo = '';

  slipNumber = sessionStorage.getItem('slip_nos');

  cols: { field: string; header: string }[];
  aa = false;
  searchValue = '';

  constructor(

    private toastr: ToastrService,
    private router: Router,
    private eslipService: EslipsService,
    private excelDownload: ExcelDataService,
    public role: RolesService
  ) {}

  ngOnInit() {
    this.fileId = this.eslipService.file_id;
    this.fileName = this.eslipService.file_name;

    this.EslipNo = this.slipNumber;
    this.getEslipAccounts(this.slipNumber);
    this.cols = [
      { field: 'account_name', header: 'Account Name' },
      { field: 'account_no', header: 'Account No' },
      { field: 'amount_to_pay', header: 'Amount To Pay' },
      { field: 'amount_due', header: 'Amount Due' },
      { field: 'status', header: 'Status' },
      { field: 'due_date', header: 'Due Date' }
    ];
  }

  /**
   * @description:: close this window
   */
  closeView() {
    this.router.navigate(['admin/pay-on-behalf']);
  }

  getUploadedFilesRecords(): void {
    const payload = {
      file_id: this.eslipService.file_id
    };
    this.loading = true;
    this.eslipService
      .getUploadedFilesRecords(payload)
      .subscribe((response: any) => {
        this.loading = false;

        this.localData = response;
        this.generatedData = response;
        this.temp = [...response];
        this.rows = response;

        response.forEach((value: any) => {
          this.Accountno = value.account_no;
          this.AccountName = value.account_name;
          this.AccountBalance = value.account_balance;
          this.Validation = value.status;
          this.DateCreated = value.created_at;
        });
      });

    (err: any) => {
      this.toastr.error('There is no server connection!');
    };
  }

  /// get the eslip accounts

  getEslipAccounts(slipNo: string): void {
    const payload = {
      eslip_no: slipNo
    };

    this.loading = true;
    this.eslipService.getEslipAccounts(payload).subscribe((response: any) => {
      this.AccountsCount = response.length;
      this.loading = false;

      this.rows = response;
    }),
    (err: any) => {
      this.toastr.error('There is no server connection!');
    };
  }
  onActivate(event) {}

  onSelect({ selected }) {}


  downloadCSV() {
    this.loading = true;

    const rows = [...this.rows];

    this.excelDownload.buildExcelEslipAccounts('Eslips Accounts', rows);

    this.loading = false;
  }


  setIndex(ii) {
    this.aa = ii;
  }
}
