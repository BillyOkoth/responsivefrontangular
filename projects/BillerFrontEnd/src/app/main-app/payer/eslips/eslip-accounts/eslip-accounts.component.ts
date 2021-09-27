import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'projects/BillerFrontEnd/src/app/service/login.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import {
  getUploadedFilesRecords,
  EslipAc
} from 'projects/BillerFrontEnd/src/app/service/login.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eslip-accounts',
  templateUrl: './eslip-accounts.component.html',
  styleUrls: ['./eslip-accounts.component.css']
})
export class EslipAccountsComponent implements OnInit {
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  searchValue = '';

  loading = false;
  generatedData = [];
  localData = [];

  Accountno;
  AccountName;
  AccountBalance;
  Validation;
  DateCreated;
  billerInsuranceFlag;

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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.billerInsuranceFlag =  sessionStorage.getItem('biller_code');
    this.fileId = this.loginService.file_id;
    this.fileName = this.loginService.file_name;

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
    this.location.back();
  }

  getUploadedFilesRecords(): void {
    const payload: getUploadedFilesRecords = {
      file_id: this.loginService.file_id
    };
    this.loading = true;
    this.loginService.getUploadedFilesRecords(payload).subscribe(
      response => {
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
      },
      (err: any) => {}
    );
  }

  /// get the eslip accounts

  getEslipAccounts(slipNo: string): void {
    const payload: EslipAc = {
      eslip_no: slipNo
    };

    this.loading = true;
    this.loginService.getEslipAccounts(payload).subscribe(
      (response: any) => {
        this.AccountsCount = response.length;
        this.loading = false;

        this.rows = response;
      },
      (err: any) => {
        this.toastr.error('There is no server connetion!');
      }
    );
  }
  onActivate(event) {}

  /// download csv
  downloadCSV() {
    this.loading = true;

    const rows = [...this.rows];

    this.excelDownload.buildExcelEslipAccounts('Eslips Accounts', rows);

    this.loading = false;
  }

  onSelect({ selected }) {}
}
