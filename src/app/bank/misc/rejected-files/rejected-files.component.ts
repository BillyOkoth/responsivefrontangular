import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/service/excel-data.service';
import { AccountService } from 'src/app/core/services/accounts/account.service';

@Component({
  selector: 'app-rejected-files',
  templateUrl: './rejected-files.component.html',
  styleUrls: ['./rejected-files.component.css'],
})
export class RejectedFilesComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;
  cols = [];
  rows1 = [];
  clonedRows = {};

  generatedData = [];
  selectedRows = [];
  searchValue = '';
  aa = false;
  columns = [
    { name: 'Number' },
    { name: 'Name' },
    { name: 'Amount Due' },
    { name: 'Due Date' },
    { name: 'Amount To Pay' }
  ];

  loading = false;
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'weight',
    'duedata',
    'amtpay'
  ];
  slipTotal = 0;
  toPayTotal: any = 0;
  billerCode;
  dueDate;
  failedAccounts;
  notFoundAcccounts = [];
  amountFailed = [];
  payments = [];

  listOfData: any[] = [];
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: string | null } = {
    name: null,
    age: null,
    address: null
  };
  sortName: string | null = null;
  sortValue: string | null = null;




  // selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(

    private router: Router,
    private excelData: ExcelDataService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.generatedData = this.payments;
    this.temp = [...this.payments];
    this.rows = this.payments;

    this.getFailedAccounts();

    this.cols = [
      { field: 'accountNo', header: 'Account Number' },
      { field: 'status', header: 'Account Status' },
      { field: 'amount', header: 'Amount' },
      { field: 'amount_status', header: 'Amount Status' }
    ];
  }

  reset() {}
  searchTable() {}

  getFailedAccounts() {
    this.accountService.failedAccount.forEach((value: any) => {
      this.failedAccounts = value.length;



      value.forEach((element: any) => {
        if (element.status == 'NOT FOUND') {
          this.notFoundAcccounts.push(element.status);
        }

        if (element.amount_status === 'FAIL') {
          this.amountFailed.push(element.amount_status);
        }
      });

      this.rows = value;
    });
  }

  uploadFileDialog() {

  }

  downloadCSV() {

    this.loading = true ;
    const rows = [...this.rows];
    this.excelData.buildExcelIvalidAccount('rejected', rows);
    this.loading = false;
  }

  closeView() {
    this.router.navigate(['/admin/pay-on-behalf']);
  }

  onActivate() {}

  toUploadedFile() {
    this.router.navigate(['app/dashboard/uploaded-payment-summary']);
  }

  setIndex(ii) {
    this.aa = ii;
  }
}
