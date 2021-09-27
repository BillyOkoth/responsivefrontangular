import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { getUploadedFilesRecords } from 'projects/BillerFrontEnd/src/app/service/login.model';

import { BillersService } from 'src/app/core/services/billers/billers.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';
import { ExcelDataService } from 'src/app/core/services/excel/excel-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaded-file-details',
  templateUrl: './uploaded-file-details.component.html',
  styleUrls: ['./uploaded-file-details.component.css']
})
export class UploadedFileDetailsComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  cols = [];

  loadingIndicator = true;

  loading = false;
  generatedData = [];
  localData = [];

  Accountno;
  AccountName;
  AccountBalance;
  Validation;
  DateCreated;

  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'status',
    'weight',
    'actions'
  ];

  fileId = '';
  fileName = '';
  searchValue = '';
  aa = false;

  constructor(
    private router: Router,
    private excelDownload: ExcelDataService,
    private billerService: BillersService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fileId = this.accountService.file_id;
    this.fileName = this.accountService.file_name;

    this.cols = [
      { field: 'account_no', header: 'Account Number' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'account_balance', header: 'Account Balance' },
      { field: 'status', header: 'Validation' },
      { field: 'created_at', header: 'Created Date' }
    ];

    this.getUploadedFilesRecords();
  }

  /**
   * @description:: close this window
   */
  closeView() {
    this.router.navigate(['admin/uploaded-file-summary']);
  }

  getUploadedFilesRecords(): void {
    const payload: getUploadedFilesRecords = {
      file_id: this.billerService.file_id
    };
    this.loading = true;
    this.accountService
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
      }),
      (err: any) => {
        this.toastr.error('There is no server connnection!');
      };
  }

  onActivate(event) {}

  /// download csv
  downloadCSV() {
    const rows = [...this.rows];
    this.excelDownload.buildExcelIviewDetails('DetailedAccounts', rows);
  }

  onSelect({ selected }) {}

  setIndex(ii) {
    this.aa = ii;
  }
}
